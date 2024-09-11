import {} from 'react-redux';
import { useEffect } from 'react';
import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import { Modal, OrderInfo } from '@components';
import { IngredientDetails } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../slices/ingredients/ingredientSlice';
import { getUserFromApi, userAction } from '../../slices/user/userSlice';
import { getCookie } from '../../utils/cookie';
import { ContentWithoutHistory } from '../../pages/content-without-history';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserFromApi());
    if (getCookie('accessToken')) {
      dispatch(getUserFromApi())
        .unwrap()
        .finally(() => {
          dispatch(userAction.authChecked());
        });
    } else {
      dispatch(userAction.authChecked());
    }
    // запрос на проверку авторизирован ли пользователь
  }, [dispatch]);

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* location={background || location} */}
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />{' '}
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />{' '}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <ContentWithoutHistory>
                <Profile />
              </ContentWithoutHistory>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />{' '}
        <Route
          path='/ingredients/:id'
          element={
            <ContentWithoutHistory>
              <IngredientDetails />
            </ContentWithoutHistory>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Детали заказа' onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;

// const checkUserAuth = () => (dispatch: AppDispatch) => {
//   if (getCookie('accessToken')) {
//     dispatch(getUserFromApi()).finally(() => {
//       dispatch(userAction.authChecked());
//     });
//   } else {
//     dispatch(userAction.authChecked());
//   }
// };
// checkUserAuth();
