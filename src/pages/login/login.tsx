import { FC, useState, FormEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../slices/user/userSlice';

export const Login: FC = () => {
  // -----------------------------------------------------------
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const value = {
    email: email,
    password: password
  };

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(value));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
