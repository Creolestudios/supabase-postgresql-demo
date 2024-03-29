'use client';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useRef } from 'react';
import { IMessage, useMessage } from './index';

export default function InitMessages({
  messages,
}: {
  messages: IMessage[] | [];
}) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages });
    }
    initState.current = true;
  }, []);

  return <></>;
}
