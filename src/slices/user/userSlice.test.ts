import { expect, test, jest } from '@jest/globals';
import { mockLogin, mockUser } from '../../utils/mockData';
import { TUserState } from './type';
import {
  getUserFromApi,
  loginUser,
  logoutUser,
  registerUser,
  userReducer
} from './userSlice';

jest.mock('@api');

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  error: null,
  isLoading: true
};

describe('tests for user slice login', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  //тест работы запроcа login
  test('should set isLoading to true when loginUser.pending is dispatched', () => {
    const expectedState = {
      ...initialState,
      error: null,
      isLoading: true
    };

    const actualState = userReducer(
      {
        ...initialState,
        error: null,
        isLoading: true
      },
      loginUser.pending('', mockLogin)
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isLoading to false and isAuthChecked to true data with user when loginUser.fulfilled is dispatched', () => {
    const expectedState = {
      ...initialState,
      data: mockUser,
      isAuthChecked: true,
      isLoading: false
    };

    const actualState = userReducer(
      {
        ...initialState,
        data: null,
        isAuthChecked: false,
        isLoading: true
      },
      loginUser.fulfilled(
        {
          success: true,
          refreshToken: 'testToken',
          accessToken: 'testAccessToken',
          user: mockUser
        },
        '',
        mockLogin
      )
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isAuthChecked to false and error to error.massage when loginUser.rejected is dispatched', () => {
    const expectedState = {
      ...initialState,
      error: 'test Error',
      isAuthChecked: false
    };

    const actualState = userReducer(
      {
        ...initialState,
        error: null,
        isAuthChecked: false
      },
      loginUser.rejected(new Error('test Error'), '', mockLogin)
    );

    expect(actualState).toEqual(expectedState);
  });
});

describe('tests for user slice get user', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  //тест работы запроcа get user

  test('should set isLoading to true when getUserFromApi.pending is dispatched', () => {
    const expectedState = {
      ...initialState,
      error: null,
      isLoading: true
    };

    const actualState = userReducer(
      {
        ...initialState,
        error: null,
        isLoading: true
      },
      getUserFromApi.pending('')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isLoading to false and isAuthChecked to true data with user when getUserFromApi.fulfilled is dispatched', () => {
    const expectedState = {
      ...initialState,
      data: mockUser,
      isAuthChecked: true,
      isLoading: false,
      error: null
    };

    const actualState = userReducer(
      {
        ...initialState,
        data: null,
        isAuthChecked: false,
        isLoading: true,
        error: null
      },
      getUserFromApi.fulfilled(
        {
          success: true,
          user: mockUser
        },
        ''
      )
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isAuthChecked to false and error to error.massage when getUserFromApi.rejected is dispatched', () => {
    const expectedState = {
      ...initialState,
      error: 'test Error',
      isAuthChecked: false
    };

    const actualState = userReducer(
      {
        ...initialState,
        error: null,
        isAuthChecked: true
      },
      getUserFromApi.rejected(new Error('test Error'), '')
    );

    expect(actualState).toEqual(expectedState);
  });
});

describe('tests for user slice get register', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  //тест работы запроcа register
  test('should set isLoading to true when registerUser.pending is dispatched', () => {
    const expectedState = {
      ...initialState,
      error: null,
      isLoading: true
    };

    const actualState = userReducer(
      {
        ...initialState,
        error: null,
        isLoading: true
      },
      registerUser.pending('', { ...mockUser, password: mockLogin.password })
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isLoading to false and isAuthChecked to true data with user when registerUser.fulfilled is dispatched', () => {
    const expectedState = {
      ...initialState,
      data: mockUser,
      isAuthChecked: true,
      isLoading: false,
      error: null
    };

    const actualState = userReducer(
      {
        ...initialState,
        data: null,
        isAuthChecked: false,
        isLoading: true,
        error: null
      },
      registerUser.fulfilled(
        {
          success: true,
          refreshToken: 'testToken',
          accessToken: 'testAccessToken',
          user: mockUser
        },
        '',
        { ...mockUser, password: mockLogin.password }
      )
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isAuthChecked to false and error to error.massage when registerUser.rejected is dispatched', () => {
    const expectedState = {
      ...initialState,
      error: 'test Error'
    };

    const actualState = userReducer(
      {
        ...initialState,
        error: null
      },
      registerUser.rejected(new Error('test Error'), '', {
        ...mockUser,
        password: mockLogin.password
      })
    );

    expect(actualState).toEqual(expectedState);
  });
});

describe('tests for user slice get logout', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  //тест работы запроcа logout
  test('should set isLoading to false and isAuthChecked to true data with user when logoutUser.fulfilled is dispatched', () => {
    const expectedState = {
      ...initialState
    };

    const actualState = userReducer(
      {
        ...initialState,
        data: mockUser,
        isAuthChecked: true,
        isLoading: false,
        error: null
      },
      logoutUser.fulfilled(undefined, '', undefined)
    );

    expect(actualState).toEqual(expectedState);
  });
});
