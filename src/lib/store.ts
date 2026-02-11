import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import languageReducer from './features/language/languageSlice';
import calculatorReducer from './features/calculator/calculatorSlice';
import checkoutReducer from './features/checkout/checkoutSlice';
import authReducer from './features/auth/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      language: languageReducer,
      calculator: calculatorReducer,
      checkout: checkoutReducer,
      auth: authReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
