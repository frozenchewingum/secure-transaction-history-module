import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Adjust the path as needed
import { View, Button, Text, FlatList, StyleSheet } from "react-native";
import { TransactionData, TransactionDetailRouteProp } from "../types"; // Adjust the path as needed
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";

const TransactionDetail: React.FC = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const [transaction, setTransaction] = useState<TransactionData>();
  const route = useRoute<TransactionDetailRouteProp>();
  useEffect(() => {
    const { id } = route.params;
    if (id) {
      const detail = transactions.find((item) => item.id === id);
      if (detail) {
        setTransaction(detail);
      }
    }
  }, []);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const goback = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Transaction Detail</Text>
      <Text>{transaction?.id}</Text>
      <Text>{transaction?.amount}</Text>
      <Text>{transaction?.description}</Text>
      <Button title="Back" onPress={goback} />
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
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default TransactionDetail;
