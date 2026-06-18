import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// = Global store configuration:
export const store = configureStore({
	reducer: {
		cart: cartReducer,
	},
});

// = SessionStorage:
store.subscribe(() => {
	sessionStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
});

// types:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
