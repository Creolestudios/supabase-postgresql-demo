import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

export type IMessage = {
  created_at: string;
  id: number;
  is_edit: boolean;
  user_id: string;
  message: string;
};

interface MessageState {
  messages: IMessage[];
  messageId: number[];
  addMessage: (message: IMessage) => void;
  // setMessageId: (id: number) => void;
  actionMessage: IMessage | undefined;
  setActionMessage: (message: IMessage | undefined) => void;
  removeMessage: (id: number) => void;
  editMessage: (message: IMessage | undefined) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  messageId: [],
  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
      messageId: [...state.messageId, newMessage.id],
    })),
  // setMessageId: (id: number) =>
  //   set((state) => ({
  //     messageId: [...state.messageId, id],
  //   })),
  actionMessage: undefined,
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  removeMessage: (id) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== id),
      };
    }),
  editMessage: (updatedMessage) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => {
          if (message.id === updatedMessage?.id) {
            message.message = updatedMessage.message;
            message.is_edit = updatedMessage.is_edit;
          }
          return message;
        }),
      };
    }),
}));
