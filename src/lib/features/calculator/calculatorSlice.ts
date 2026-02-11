import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalculatorState {
    crop: string;
    farmSize: number;
    sizeUnit: 'hectares' | 'plants';
    applicationType: 'spraying' | 'sowing';
    result: {
        quantity: number;
        waterVolume: number;
        frequency: string;
        estimatedCost: number;
    } | null;
}

const initialState: CalculatorState = {
    crop: '',
    farmSize: 0,
    sizeUnit: 'hectares',
    applicationType: 'spraying',
    result: null,
};

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setInputs: (state, action: PayloadAction<Partial<CalculatorState>>) => {
            return { ...state, ...action.payload };
        },
        calculateResult: (state) => {
            // Dummy logic for now, will be implemented with real rules later
            state.result = {
                quantity: state.farmSize * 2,
                waterVolume: state.farmSize * 200,
                frequency: 'Every 7 days',
                estimatedCost: state.farmSize * 5000,
            };
        },
        clearCalculator: (state) => {
            return initialState;
        },
    },
});

export const { setInputs, calculateResult, clearCalculator } = calculatorSlice.actions;
export default calculatorSlice.reducer;
