import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIsAuthChecked,
  getUser,
  updateUser
} from '../../slices/user/userSlice';

export const Profile: FC = () => {
  
  const user = useSelector(getUser);
  const isAuth = useSelector(getIsAuthChecked);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      email: user?.email || '',
      name: user?.name || ''
    }));
  }, []);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  // отправка данных на сервер при их изменении
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormChanged && isAuth) dispatch(updateUser(formValue));
  };

  const handleCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}  
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
