// Route props
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  TransactionHistory: { };
  TransactionDetail: { id: string }
};

export type TransactionDetailRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>;

export type TransactionData = {
  id: string;
  type: 'Credit' | 'Debit'; // Ensure this matches the JSON data
  amount: number;
  date: string;
  description: string;
  status: 'Pending' | 'Completed' | 'Failed';
};
