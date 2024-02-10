import { init } from 'next/dist/compiled/@vercel/og/satori';
import { atom } from 'recoil';

type AuthModalState = {
  isOpen: boolean;
  type: 'login' | 'register' | 'forgotPassword';
};

const initialAuthModalState: AuthModalState = {
  isOpen: false,
  type: 'login'
};

export const authModalState = atom<AuthModalState>({
  key: 'authModalState',
  default: initialAuthModalState
});