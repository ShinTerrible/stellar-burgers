import { TUser } from '@utils-types';

export type TUserState = {
  isAuthChecked: boolean;
  data: TUser;
  error: null | string | undefined;
  isLoading: boolean;
};
