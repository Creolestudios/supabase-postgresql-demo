import React from 'react';
import OnlineUsers from './OnlineUsers';

const ChatHeader = () => {
  return (
    <div className='h-20'>
      <div className='p-5 border-b border-b-green-200 h-full'>
        <div>
          <h1 className='font-bold text-[20px] pb-[2px]'>Sup Next Chat</h1>
          <OnlineUsers />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
