import { ingredientsSlice } from '../slices/ingredients/ingredientSlice';
import { burgerSlice } from '../slices/burderConstructor/burgerConstructorSlice';
import { feedsSlice } from '../slices//feeds/feedSlice';
import { userSlice } from '../slices/user/userSlice';
import { orderSlice } from '../slices/order/orderSlice';
import { orderListSlice } from '../slices/orderList/orderListSlice';

export const rootReducer = {
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [burgerSlice.name]: burgerSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [orderListSlice.name]: orderListSlice.reducer
};
