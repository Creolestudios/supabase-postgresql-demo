import InputMessage from './_components/InputMessage';
import InitUser from '@/lib/store/user/InitUser';
import SupabaseServer from '@/lib/supabase/SupabaseServer';
import React from 'react';
import ChatHeader from './_components/ChatHeader';
import MainChats from './_components/MainChat';
import { redirect } from 'next/navigation';

const Chats = async () => {
  const supabase = await SupabaseServer();
  const { data: authData } = await supabase.auth.getSession();
  if (!authData) {
    redirect('/auth/user');
  }

  return (
    <>
      <div className='md:max-w-3xl mx-auto md:py-6 p-3 h-[calc(100vh-100px)]'>
        <div className='h-full border border-green-300 flex flex-col rounded-md relative'>
          <ChatHeader />
          <MainChats />
          <InputMessage />
        </div>
      </div>
      <InitUser user={authData.session?.user} />
    </>
  );
};

export default Chats;
