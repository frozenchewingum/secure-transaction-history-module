// screens/TransactionHistory.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the path as needed
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TransactionItem } from '../types'; // Adjust the path as needed
import { SafeAreaView } from 'react-native-safe-area-context';

const TransactionHistory: React.FC = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: TransactionItem }) => (
          <View style={styles.item}>
            <Text> { new Date(item.date).toLocaleDateString() } </Text>
            <Text>{item.description}: {item.amount}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TransactionHistory;
