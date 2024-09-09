import { TUser } from '@utils-types';

export type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null | unknown;
  error: null | string | undefined;
};
