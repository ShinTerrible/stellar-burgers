import { TUser } from '@utils-types';

export type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  error: null | string | undefined;
  isLoading: boolean;
};
