import { useState } from 'react';
const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, handleTogglePassword };
};

export default useTogglePassword;