import { TabsComponent } from '@/components/TabsComponent';
import { SignupForm } from '@/components/auth/SignupForm';
import { LoginForm } from '@/components/auth/LoginForm';
import React from 'react';

const AuthUser = () => {
  const tabHeadList = [
    { label: 'Login', value: 'login' },
    { label: 'Sign Up', value: 'signup' },
  ];

  const tabContentList = [
    {
      value: 'login',
      component: <LoginForm />,
    },
    {
      value: 'signup',
      component: <SignupForm />,
    },
  ];

  return (
    <div className='h-[calc(100vh-100px)] flex items-center justify-center'>
      <div className='bg-gray-900 rounded-md backdrop-blur-sm shadow-md w-100 p-10 mt-[-200px]'>
        <TabsComponent
          tabHeadList={tabHeadList}
          tabContentList={tabContentList}
        />
      </div>
    </div>
  );
};

export default AuthUser;
