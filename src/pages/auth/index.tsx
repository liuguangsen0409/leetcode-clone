import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/Modals/AuthModal';

type AuthPageProps = {};

const index:React.FC<AuthPageProps> = () => {
  return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
  <div className='max-w-7xl mx-auto'>
    <Navbar />
    <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
      <Image src='/hero.png' alt='Hero img' width={700} height={700} />
    </div>
    <AuthModal />
  </div>
</div>
}
export default index;