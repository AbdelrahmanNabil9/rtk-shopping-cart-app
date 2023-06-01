import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CartState {
  items: { [productID: string]: number };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action:PayloadAction<string>){
        const id = action.payload;
        if(state.items[id]){
            state.items[id]++;
        } else{
            state.items[id]=1;
        }
    },
    removeFromCart(state, action :PayloadAction<string>){
        delete state.items[action.payload];
    },
    updateQuantity(
        state,
        action: PayloadAction<{ id: string; quantity: number }>
      ) {
        const { id, quantity } = action.payload;
        state.items[id] = quantity;
      },
  },
});


export function getNumItems(state: RootState) {
    let numItems= 0;
    for(let id in state.cart.items){
        numItems += state.cart.items[id];
    }
    return numItems;
}

export const getMemoizedNumItems = createSelector(
    (state: RootState) => state.cart.items,
    (items) =>{
        let numItems = 0 ;
        for(let id in items){
            numItems += items[id];
        }
        return numItems;
    }
    )

export const getTotalPrice = createSelector(
    (state: RootState) => state.cart.items,
    (state: RootState) => state.products.products,
    (items,products ) =>{
        let totalPrice = 0;
        for(let id in items){
            totalPrice += products[id].price * items[id];
        }
        return totalPrice.toFixed(2);
    }
)
export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
