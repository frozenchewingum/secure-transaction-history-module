// redux/transactionSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import transactionsData from '../data/transactions.json'; // Ensure correct path
import { TransactionItem } from '../types'; // Ensure correct path

interface TransactionState {
  transactions: TransactionItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransactionState = {
  transactions: transactionsData as TransactionItem[], // Type assertion
  status: 'idle',
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
});

export default transactionSlice.reducer;
