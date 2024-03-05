import React, { useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { IMessage, useMessage } from '@/lib/store/messages';
import SupabaseClient from '@/lib/supabase/SupbaseClient';
import { toast } from 'sonner';
import { DialogComponent } from '@/components/DialogComponent';
import EditMessage from './EditMessage';

const ChatActionMenus = ({ message }: { message: IMessage }) => {
  const { setActionMessage, actionMessage, removeMessage, editMessage } =
    useMessage((state) => state);
  const [chat, setChat] = useState<any>(null);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const openRemoveDialog = () => {
    document.getElementById('trigger-remove')?.click();
    setActionMessage(chat);
  };

  const openEditDialog = () => {
    document.getElementById('trigger-edit')?.click();
    setActionMessage(chat);
  };

  const handleRemove = async () => {
    const supabase = SupabaseClient();
    if (actionMessage) {
      removeMessage(actionMessage?.id);
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', actionMessage.id);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Message remove');
        document.getElementById('trigger-remove')?.click();
      }
      document.getElementById('trigger-remove')?.click();
    }
    document.getElementById('trigger-remove')?.click();
  };

  const handleEditMessage = async () => {
    const supabase = SupabaseClient();
    const inputMessage = inputRef.current.value.trim();
    if (inputMessage && actionMessage) {
      editMessage({
        ...actionMessage,
        message: inputMessage,
        is_edit: true,
      });
      const { error } = await supabase
        .from('messages')
        .update({ message: inputMessage, is_edit: true })
        .eq('id', actionMessage.id);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Message edit successfully');
        document.getElementById('trigger-edit')?.click();
      }
    } else {
      document.getElementById('trigger-edit')?.click();
    }
  };

  return (
    <div>
      <DropdownMenu
        onOpenChange={() => {
          setChat(message);
        }}
      >
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className='hover:cursor-pointer' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={openEditDialog}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openRemoveDialog}>Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogComponent
        inputId={'trigger-edit'}
        dialogTitle='Edit message'
        dialogDescription=''
        actionText='Save'
        handleSuccess={handleEditMessage}
      >
        <EditMessage
          defaultValue={actionMessage && actionMessage.message}
          inputRef={inputRef}
        />
      </DialogComponent>
      <DialogComponent
        inputId='trigger-remove'
        handleSuccess={handleRemove}
        dialogTitle='Are you sure want to remove?'
        actionText='Remove'
        dialogDescription='This action cannot be undone. This will permanently remove your message from our servers'
      />
    </div>
  );
};

export default ChatActionMenus;
