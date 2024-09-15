export type TransactionItem = {
  id: string;
  type: 'Credit' | 'Debit'; // Ensure this matches the JSON data
  amount: number;
  date: string;
  description: string;
  status: 'Pending' | 'Completed' | 'Failed';
};
