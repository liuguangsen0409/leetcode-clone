import React, { useState, useEffect } from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { auth, firestore } from '@/firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';

type SignupProps = {};

const Signup:React.FC<SignupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState)

  const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
    setAuthModalState((prev) => ({ ...prev, type }))
  }

  const [inputs, setInputs] = useState({ email: '', displayName: '', password: '' })

  const router = useRouter()

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.displayName || !inputs.password) {
    return toast.error('Please fill all fields', { position: 'top-center', autoClose: 3000, theme: 'dark' });
    }

    try {
      toast.loading('Creating your account', { position: 'top-center', toastId: 'loadingToast' })
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser) return;

      const userData = {
        uId: newUser.user.uid,
        email: newUser.user.email,
        displayName: newUser.user.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: []
      }
      await setDoc(doc(firestore, 'users', newUser.user.uid), userData)
      router.push('/')
    } catch (err: any) {
      toast.error(err.message, { position: 'top-center', autoClose: 3000, theme: 'dark' });
    } finally {
      toast.dismiss('loadingToast')
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000, theme: 'dark' });
    }
  }, [error])

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={ handleRegister }>
      <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
          Email
        </label>
        <input onChange={ handleChangeInput } type="email" name="email" id="email" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder='name@company.com' />
      </div>
      <div>
        <label htmlFor="displayName" className="text-sm font-medium block mb-2 text-gray-300">
          Display Name
        </label>
        <input onChange={ handleChangeInput } type="displayName" name="displayName" id="displayName" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="John Doe" />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
          Password
        </label>
        <input onChange={ handleChangeInput } type="password" name="password" id="password" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="*******" />
      </div>
      <button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
        { loading ? 'Registering...' : 'Register' }
      </button>
      <div className="text-sm font-medium text-gray-300">
        Already have an account? {" "}
        <a href="#" className="text-blue-700 hover:underline" onClick={ () => handleClick('login') }>
          Log In
        </a>
      </div>
    </form>
  )
}
export default Signup;