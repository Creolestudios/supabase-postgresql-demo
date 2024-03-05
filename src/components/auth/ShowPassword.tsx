import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

const ShowPassword = ({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: (params: boolean) => void;
}) => {
  return (
    <button
      type='button'
      onClick={() => setShowPassword(!showPassword)}
      className='absolute right-2 top-1/2 transform -translate-y-1/2'
    >
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  );
};

export default ShowPassword;
