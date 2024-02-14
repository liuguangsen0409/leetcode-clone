import React, { useState, useEffect } from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { auth } from '@/firebase/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type LoginProps = {};

const Login:React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState)

  
  const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
    setAuthModalState((prev) => ({ ...prev, type }))
  }
  
  const [inputs, setInputs] = useState({ email: '', password: '' })

  const router = useRouter()
  
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);  

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputs.email || !inputs.password) {
      return toast.error('Please fill all fields', { position: 'top-center', autoClose: 3000, theme: 'dark' });
    }

    try {
      const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password)
      if (!newUser) return;
      router.push('/')
    } catch (err: any) {
      toast.error(err.message, { position: 'top-center', autoClose: 3000, theme: 'dark' });
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000, theme: 'dark' });
    }
  }, [error])

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={ handleLogin }>
    <h3 className="text-xl font-medium text-white">Sign in to LeetClone</h3>
    <div>
      <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
        Your Email
      </label>
      <input onChange={ handleChangeInput } type="email" name="email" id="email" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder='name@company.com' />
    </div>
    <div>
      <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
        Your Password
      </label>
      <input onChange={ handleChangeInput } type="password" name="password" id="password" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="*******" />
    </div>
    <button className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
      { loading ? 'Loading...' : 'Log In' }
    </button>
    <button className="flex w-full justify-end" onClick={ () => handleClick('forgotPassword') }>
      <a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right">
        Forgot Password?
      </a>
    </button>
    <button className="text-sm font-medium text-gray-300" onClick={ () => handleClick('register') }>
      Not Registered? {" "}
      <a href="#" className="text-blue-700 hover:underline">
        Create account
      </a>
    </button>
  </form>
  )
}
export default Login;