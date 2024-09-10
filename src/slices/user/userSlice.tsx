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
  data: {
    email: '',
    name: ''
  },
  error: null,
  isLoading: true
};

//thunks
export const getUserFromApi = createAsyncThunk('user/getUser', getUserApi);

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUserFromApi()).finally(() => {
      dispatch(userAction.authChecked());
    });
  } else {
    dispatch(userAction.authChecked());
  }
};

export const registerUser = createAsyncThunk(
  'user/RegisterUser',
  registerUserApi
);

export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userAction.userLogout());
    });
  }
);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

//slice
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
    getError: (state) => state.error,
    getLoading: (state) => state.isLoading
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
        state.data = payload.user;
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
export const { getUser, getIsAuthChecked, getError, getLoading } =
  userSlice.selectors;

export default userSlice.reducer;

// const userReducer = userSlice.reducer;

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { TUser } from '../../utils/types';
// import {
//   registerUserApi,
//   loginUserApi,
//   updateUserApi,
//   logoutApi,
//   getUserApi
// } from '../../utils/burger-api';

// // Тип для начального состояния пользователя
// type TUserState = {
//   isAuthChecked: boolean;
//   user: TUser;
//   error: string | null;
// };

// //  Начальное состояние на слой пользователя
// export const initialState: TUserState = {
//   isAuthChecked: false,
//   user: {
//     email: '',
//     name: ''
//   },
//   error: ''
// };

// // Экшены на слой пользователя
// export const registerUser = createAsyncThunk('user/register', registerUserApi);
// export const loginUser = createAsyncThunk('user/login', loginUserApi);
// export const updateUser = createAsyncThunk('user/update', updateUserApi);
// export const getApiUser = createAsyncThunk('user/request', getUserApi);
// export const logoutUser = createAsyncThunk('user/logout', logoutApi);

// // Слой пользователя
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   selectors: {
//     checkUserAuth: (state) => state.isAuthChecked,
//     getUserError: (state) => state.error,
//     getUser: (state) => state.user,
//     getUserName: (state) => state.user.name
//   },
//   extraReducers: (builder) => {
//     // Обработка регистрации пользователя
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.error = null;
//       })

//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isAuthChecked = true;
//         state.error = null;
//         state.user = action.payload.user;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.error = action.error?.message || null;
//       });

//     // Получение информации о пользователе
//     builder
//       .addCase(getApiUser.fulfilled, (state, action) => {
//         state.isAuthChecked = true;
//         state.user = action.payload.user;
//         state.error = null;
//       })
//       .addCase(getApiUser.rejected, (state, action) => {
//         state.isAuthChecked = false;
//         state.error = action.error?.message || null;
//       });

//     //   Логирование пользователя в приложении
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.isAuthChecked = false;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isAuthChecked = true;
//         state.error = null;
//         state.user = action.payload.user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isAuthChecked = false;
//         state.error = action.error.message!;
//       });

//     //   Выход пользователя из приложения
//     builder.addCase(logoutUser.fulfilled, (state) => (state = initialState));

//     // Обновление информации о пользователе
//     builder
//       .addCase(updateUser.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.isAuthChecked = true;
//         state.user = action.payload.user;
//         state.error = null;
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.isAuthChecked = false;
//         state.error = action.error.message!;
//       });
//   }
// });
// export const { getUserError, getUser, getUserName, checkUserAuth } =
//   userSlice.selectors;

// const userReducer = userSlice.reducer;
// export default userReducer; я вот так написал
