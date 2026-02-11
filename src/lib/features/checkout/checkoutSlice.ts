import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
    status: 'idle' | 'pending' | 'paid' | 'failed' | 'whatsapp';
    orderId: string | null;
    paymentMethod: 'momo' | 'om' | 'whatsapp' | null;
}

const initialState: CheckoutState = {
    status: 'idle',
    orderId: null,
    paymentMethod: null,
};

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckoutStatus: (state, action: PayloadAction<CheckoutState['status']>) => {
            state.status = action.payload;
        },
        setOrderId: (state, action: PayloadAction<string>) => {
            state.orderId = action.payload;
        },
        setPaymentMethod: (state, action: PayloadAction<CheckoutState['paymentMethod']>) => {
            state.paymentMethod = action.payload;
        },
        resetCheckout: (state) => {
            return initialState;
        },
    },
});

export const { setCheckoutStatus, setOrderId, setPaymentMethod, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
