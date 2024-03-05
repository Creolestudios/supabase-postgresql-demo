'use client';
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { githubLogin, googleLogin } from '@/services/auth/SocialLogin';

const SocialLogin = () => {
  return (
    <div>
      <Button variant='outline' className='w-full mb-3' onClick={googleLogin}>
        <Image
          src='/assets/images/google.png'
          width={25}
          height={25}
          alt='google'
          className='mr-5'
        />
        Continue with Google
      </Button>
      <Button variant='secondary' className='w-full mb-2' onClick={githubLogin}>
        <Image
          src='/assets/images/github.png'
          width={25}
          height={25}
          alt='google'
          className='mr-5'
        />
        Continue with Github
      </Button>
    </div>
  );
};

export default SocialLogin;
