import { RootState } from './../store/store';
export const productsSelector = (state: RootState) =>
     state.cart.cart?.products;

