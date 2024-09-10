import { Preloader } from '@ui';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIsAuthChecked, getLoading } from '../../slices/user/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isUserAuth = useSelector(getIsAuthChecked);

  if (onlyUnAuth && isUserAuth) return <Navigate replace to='/profile' />;

  if (!onlyUnAuth && !isUserAuth) return <Navigate replace to='/login' />;

  return children;
};
