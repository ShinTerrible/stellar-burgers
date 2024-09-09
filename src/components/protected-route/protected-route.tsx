import { Preloader } from '@ui';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state) => state.user.data);
  const isUserAuth = useSelector((state) => state.user.isAuthChecked);

  if (user && isUserAuth) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
};
