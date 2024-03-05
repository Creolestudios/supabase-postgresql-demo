'use client';
import { IMessage, useMessage } from '@/lib/store/messages';
import React, { useEffect, useRef } from 'react';
import ChatMenus from './ChatActionMenus';
import { useUser } from '@/lib/store/user';
import SupabaseClient from '@/lib/supabase/SupbaseClient';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ChatList = () => {
  const router = useRouter();
  const divChatScrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { messages, addMessage, messageId, editMessage, removeMessage } =
    useMessage((state) => state);
  const user = useUser((state) => state.user);
  const supabase = SupabaseClient();

  useEffect(() => {
    const channel = supabase
      .channel('chat-room')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          if (!messageId.includes(payload.new.id)) {
            // const { error, data } = await supabase
            //   .from('users')
            //   .select('*')
            //   .eq('id', payload.new.user_id)
            //   .single();
            // if (error) {
            //   toast.error(error.message);
            // } else {
            //   const newMessage = {
            //     ...payload.new,
            //     users: data,
            //   };
            addMessage(payload.new as IMessage);
            // }
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => {
          removeMessage(payload.old.id);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'messages' },
        (payload) => {
          editMessage(payload.new as IMessage);
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const scrollContainer = divChatScrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleBottomScroll = () => {
    const scrollArrow = divChatScrollRef.current;
    if (scrollArrow) {
      scrollArrow.scrollTop = scrollArrow.scrollHeight;
    }
  };

  return (
    <div
      className='flex-1 flex flex-col px-5 py-7 h-full overflow-y-auto'
      ref={divChatScrollRef}
    >
      <div className='flex-1'></div>
      <div className='space-y-6'>
        {messages.length > 0 ? (
          messages.map((value: any, index: number) => (
            <div className='flex gap-3' key={index}>
              <div>
                <Image
                  src={value?.user_details?.metadata?.avatar_url}
                  alt={value.user_details?.metadata?.user_name}
                  className='rounded-full'
                  width={35}
                  height={35}
                />
              </div>
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    <h1 className='font-bold'>
                      {value?.user_details?.metadata?.user_name}
                    </h1>
                    <h3 className='text-sm text-gray-400'>
                      {new Date(value.created_at).toDateString()}
                    </h3>
                    {value.is_edit && (
                      <h3 className='text-sm text-gray-400'>edited</h3>
                    )}
                  </div>
                  {value.user_id === user?.id && <ChatMenus message={value} />}
                </div>
                <p>{value.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className='absolute top-[50%] left-[45%]'>Start Chat</div>
        )}
      </div>
      <div className='absolute bottom-20 w-full'>
        <div
          className='w-10 h-10 flex justify-center items-center mx-auto bg-[#FF4433] rounded-full cursor-pointer -translate-x-6'
          onClick={handleBottomScroll}
        >
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};

export default ChatList;
