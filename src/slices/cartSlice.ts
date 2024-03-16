import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { Cart } from "../interfaces/Cart";
import { cartApi } from "../api/cartApi";


interface CartState{
    cart: Cart | undefined;
}

const initialState: CartState = {
    cart: undefined,
}




export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        deleteItem: (state, action: PayloadAction<number>) => {
            if(state.cart){
                const deletedItem = state.cart.products.find((elem) => elem.id == action.payload);
                state.cart.products = state.cart.products.filter((elem) => elem.id !== action.payload);
                if(deletedItem){
                    state.cart.total -= deletedItem.total;
                    state.cart.discountedTotal -= deletedItem.discountedPrice;
                    state.cart.totalQuantity -= deletedItem.quantity;
                    state.cart.totalProducts -= 1;
                }
            }
        },
        incrementAmount: (state , action: PayloadAction<number>) => {
            if(state.cart){
                const item = state.cart.products.find((elem) => elem.id === action.payload);
                if (item){
                    const indexOfItem: number = state.cart.products.findIndex((elem) => elem.id === action.payload);
                    state.cart.products[indexOfItem] = {
                        ...item,
                        quantity: item.quantity + 1,
                        total: item.total + item.price,
                        discountedPrice: Math.round((item.total + item.price) * (1 - item.discountPercentage / 100))
                    }
                state.cart.total += item.price
                state.cart.discountedTotal += state.cart.products[indexOfItem].discountedPrice - item.discountedPrice;
                state.cart.totalQuantity += 1;
            }
            }
        },
        decrementAmount: (state , action: PayloadAction<number>) => {
            if(state.cart){
                const item = state.cart.products.find((elem) => elem.id === action.payload);
                if (item){
                    const indexOfItem: number = state.cart.products.findIndex((elem) => elem.id === action.payload);
                    state.cart.products[indexOfItem] = {
                        ...item,
                        quantity: item.quantity - 1,
                        total: item.total - item.price,
                        discountedPrice: Math.round((item.total - item.price) * (1 - item.discountPercentage / 100))
                    }
                state.cart.total -= item.price
                state.cart.discountedTotal += state.cart.products[indexOfItem].discountedPrice - item.discountedPrice;
                state.cart.totalQuantity -= 1;
            }
            }
        },
    },
    extraReducers: builder => {
        builder
            .addMatcher(cartApi.endpoints.getCartById.matchFulfilled, (state, action: PayloadAction<Cart>) => {
                state.cart = action.payload;
            })
    }
})

export default cartSlice.reducer

export const {
    deleteItem,
    incrementAmount,
    decrementAmount,
} = cartSlice.actions