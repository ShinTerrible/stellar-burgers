import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUserState } from './type';
import {
  getUserApi,
  registerUserApi,
  loginUserApi,
  logoutApi,
  TRegisterData,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { AppDispatch } from '../../services/store';

//state
const initialState: TUserState = {
  isAuthChecked: false, //была ли совершена проверка наличия авторизации пользователя по токену
  data: null,
  error: null,
  isLoading: true
};

//Thunks
export const getUserFromApi = createAsyncThunk('user/getUser', getUserApi);

export const registerUser = createAsyncThunk(
  'user/RegisterUser',
  registerUserApi
);

export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi().then(() => {
      dispatch(userAction.userLogout());
    });
  }
);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

//Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = initialState.data;
    }
  },
  selectors: {
    getUser: (state: TUserState) => state.data,
    getIsAuthChecked: (state: TUserState) => state.isAuthChecked,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      });

    //register
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
    // logout
    builder.addCase(logoutUser.fulfilled, (state) => (state = initialState));
    //update
    builder
      .addCase(updateUser.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        // state.data = payload.user;
      });

    //get user
    builder
      .addCase(getUserFromApi.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUserFromApi.fulfilled, (state, { payload }) => {
        state.error = null;
        state.data = payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(getUserFromApi.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message;
      });
  }
});

export const userAction = {
  ...userSlice.actions,
  loginUser,
  logoutUser,
  updateUser
};
export const { getUser, getIsAuthChecked, getError } = userSlice.selectors;

export default userSlice.reducer;
