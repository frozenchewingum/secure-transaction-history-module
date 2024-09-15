import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Adjust the path as needed
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { TransactionData, TransactionDetailRouteProp } from "../types"; // Adjust the path as needed
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TransactionDetailItem } from "../components/TransactionDetailItem";
import { formatAmount, format12HourDateTime } from "../utils/formatUtils";

const { width, height } = Dimensions.get('window');

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

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={width*0.1}
          color="#e5e5e5"
          onPress={goBack}
        />
      </View>
      <ScrollView>
        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amount,
              transaction?.type === "Debit" ? styles.positive : {},
            ]}
          >
            {formatAmount(transaction?.type ?? "", transaction?.amount ?? 0)}
          </Text>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={
                transaction?.type === "Debit"
                  ? "bank-transfer-in"
                  : "bank-transfer-out"
              }
              size={width*0.08}
              style={{
                marginLeft: transaction?.type === "Credit" ? 5 : 0,
                marginRight: transaction?.type === "Debit" ? 5 : 0,
              }}
              color="#e5e5e5"
            />
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.description}>{transaction?.description}</Text>
          <Text style={styles.date}>
            {format12HourDateTime(transaction?.date ?? "")}
          </Text>
          <TransactionDetailItem
            label="Transaction ID"
            value={transaction?.id ?? "-"}
            canCopy
          />
          <TransactionDetailItem
            label="Type"
            value={transaction?.type ?? "-"}
          />
          <TransactionDetailItem
            label="Status"
            value={transaction?.status ?? "-"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7c9faf",
  },
  headerContainer: {
    padding: 20,
    display: "flex",
  },
  amountContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: width*0.1,
    fontWeight: "bold",
    color: "#e5e5e5",
  },
  positive: {
    color: "#b3f08d",
  },
  iconContainer: {
    width: width*0.125,
    height: width*0.125,
    backgroundColor: "#5E879A",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: width*0.05,
    color: "#e5e5e5",
  },
  date: {
    fontSize: width*0.04,
    marginBottom: 15,
    color: "#f0f0f088",
  },
  detailContainer: {
    padding: 20,
    display: "flex",
  },
});

export default TransactionDetail;
