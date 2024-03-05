'use client';
import React from 'react';
import SupabaseClient from '@/lib/supabase/SupbaseClient';
import { toast } from 'sonner';
import { useUser } from '@/lib/store/user';
import { IMessage, useMessage } from '@/lib/store/messages';
import { Input } from '@/components/ui/input';

const InputMessage = () => {
  const supabase = SupabaseClient();
  const user = useUser((state) => state.user);
  const addMessage: any = useMessage((state) => state.addMessage);

  const sendMessage = async (e: any) => {
    if (e.key === 'Enter') {
      const message = e.target.value;
      if (message.trim()) {
        const newMessage = {
          message,
          user_id: user?.id,
          is_edit: false,
          created_at: new Date().toISOString(),
        };

        addMessage(newMessage as IMessage);
        const { error } = await supabase
          .from('messages')
          .insert({ message, user_id: user?.id });

        if (error) {
          toast.error(error.message);
        }
      } else {
        toast.error('Message cant be empty', { style: { background: 'red' } });
      }
      e.target.value = '';
    }
  };

  return (
    <div className='p-5'>
      <Input placeholder='send message' onKeyDown={sendMessage} />
    </div>
  );
};

export default InputMessage;
