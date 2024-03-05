import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { MutableRefObject } from 'react';
interface IProps {
  inputRef: MutableRefObject<HTMLInputElement>;
  defaultValue?: string;
}

const EditMessage = ({ inputRef, defaultValue }: IProps) => {
  return (
    <>
      {' '}
      <Label htmlFor='name' className='text-right'>
        Message
      </Label>
      {defaultValue && (
        <Input
          id='edit-message'
          defaultValue={defaultValue}
          className='col-span-3'
          ref={inputRef}
        />
      )}
    </>
  );
};

export default EditMessage;
