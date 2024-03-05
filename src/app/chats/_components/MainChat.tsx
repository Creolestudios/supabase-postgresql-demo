import React, { Suspense } from 'react';
import ChatList from './ChatList';
import SupabaseServer from '@/lib/supabase/SupabaseServer';
import InitMessages from '@/lib/store/messages/InitMessages';

const MainChats = async () => {
  const supabase = await SupabaseServer();
  async function getMessages() {
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*');
    return messages;
  }

  async function getAllUserDetails() {
    const { data: userDetails, error } = await supabase
      .from('user_details')
      .select('*');
    return userDetails;
  }

  async function getMessagesWithUserDetails() {
    const messages = await getMessages();
    const allUserDetails = await getAllUserDetails();

    const messagesWithDetails = messages?.map((message) => {
      const userDetails = allUserDetails?.find(
        (user) => user.id === message.user_id
      );
      return {
        ...message,
        user_details: userDetails,
      };
    });

    return messagesWithDetails;
  }
  const messagesWithDetails = await getMessagesWithUserDetails();

  return (
    <Suspense fallback={'loading...'}>
      <ChatList />
      <InitMessages messages={messagesWithDetails || []} />
    </Suspense>
  );
};

export default MainChats;
