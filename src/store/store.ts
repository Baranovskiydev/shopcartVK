
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartApi } from '../api/cartApi';
import cartSlice from '../slices/cartSlice';

const rootReducer = combineReducers({
    cart: cartSlice,
    [cartApi.reducerPath]: cartApi.reducer
  });

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleWare => getDefaultMiddleWare().concat(cartApi.middleware)
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch