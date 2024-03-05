'use client';
import { useUser } from '@/lib/store/user';
import SupabaseClient from '@/lib/supabase/SupbaseClient';
import React, { useEffect, useState } from 'react';

const OnlineUsers = () => {
  const user = useUser((state) => state.user);
  const supabase = SupabaseClient();
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    const channel = supabase.channel('room1');
    channel
      .on('presence', { event: 'sync' }, () => {
        const user_id = [];
        for (const id in channel.presenceState()) {
          //@ts-ignore
          //@ts-ignore
          user_id.push(channel.presenceState()[id][0].user_id);
        }
        setOnlineUsers([...new Set(user_id)].length);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
  }, [user]);
  return (
    <div className='flex items-center gap-2'>
      <div className='h-3 w-3 bg-green-600 rounded-lg'></div>
      <h3>{onlineUsers}</h3>
    </div>
  );
};

export default OnlineUsers;
