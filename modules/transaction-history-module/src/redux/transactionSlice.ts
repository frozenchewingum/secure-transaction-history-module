import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import transactionsData from '../data/transactions.json'; // Ensure correct path
import { TransactionData } from '../types'; // Ensure correct path

interface TransactionState {
  transactions: TransactionData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransactionState = {
  transactions: transactionsData as TransactionData[], // Type assertion
  status: 'idle',
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionData>) => {
      state.transactions.push(action.payload);
    },
  },
});

export const { addTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
