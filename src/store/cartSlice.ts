// Shopping cart reducer:

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
	id: number;
	title: string;
	price: number;
	image: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
}

const storedCart = sessionStorage.getItem("cart");
const initialState: CartState = {
	items: storedCart ? JSON.parse(storedCart) : [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (
			state,
			action: PayloadAction<Omit<CartItem, "quantity">>,
		) => {
			const existing = state.items.find(
				(item) => item.id === action.payload.id,
			);

			if (existing) {
				existing.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
		},

		removeFromCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(
				(item) => item.id !== action.payload,
			);
		},

		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
