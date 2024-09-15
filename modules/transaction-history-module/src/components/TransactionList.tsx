import React, { useState, useEffect } from "react";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  SectionList,
  RefreshControl,
  StyleSheet,
  type ViewProps,
} from "react-native";
import { RootState } from "../redux/store";
import { TransactionData } from "../types";
import { TransactionItem } from "./TransactionItem";
import { addTransaction } from "../redux/transactionSlice";
import uuid from "react-native-uuid";

type DailySection = {
  title: string;
  data: TransactionData[];
};

type MonthlySection = {
  title: string;
  data: DailySection[];
};

export type TransactionListProps = ViewProps & {
  isMasked: boolean;
};

export const TransactionList = React.memo(
  ({ isMasked }: TransactionListProps) => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const transactions = useSelector(
      (state: RootState) => state.transactions.transactions
    );

    const [groupedTransactions, setGroupedTransactions] = useState<
      MonthlySection[]
    >([]);

    useEffect(() => {
      if (transactions && transactions.length > 0) {
        setGroupedTransactions(groupDataByMonthAndDate(transactions));
      }
    }, [transactions]);

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const navigate = (id: string) => {
      navigation.navigate("TransactionDetail", { id: id });
    };

    const groupDataByMonthAndDate = (
      data: TransactionData[]
    ): MonthlySection[] => {
      const groupedData = data.reduce(
        (
          acc: { [month: string]: { [day: string]: TransactionData[] } },
          item
        ) => {
          const date = new Date(item.date);
          const month = date.getMonth(); // Get full month name
          const day = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

          if (!acc[month]) {
            acc[month] = {};
          }

          if (!acc[month][day]) {
            acc[month][day] = [];
          }

          acc[month][day].push(item);
          return acc;
        },
        {}
      );

      return Object.entries(groupedData)
        .map(([month, days]) => ({
          title: month,
          data: Object.entries(days)
            .map(([day, transactions]) => ({
              title: day,
              data: transactions.sort((a, b)=> new Date(b.date).getTime() - new Date(a.date).getTime()),
            }))
            .sort(
              (a, b) =>
                new Date(b.title).getTime() - new Date(a.title).getTime()
            ), // Sort days within the month
        }))
        .sort((a, b) => parseFloat(b.title) - parseFloat(a.title)); // Sort months
    };

    const getMonthName = (monthIndex: string | number) => {
      if (typeof monthIndex === "string") {
        monthIndex = parseFloat(monthIndex);
      }
      const date = new Date();
      date.setMonth(monthIndex);
      return date.toLocaleString("default", { month: "long" });
    };

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        handleAddTransaction();
        setRefreshing(false);
      }, 2000);
    }, []);

    const handleAddTransaction = () => {
      const newTransaction: TransactionData = {
        id: uuid.v4() as string, // You can generate a unique id
        amount: parseFloat((Math.random() * (1000 - 1) + 1).toFixed(2)),
        date: new Date().toISOString(),
        description: "Fund Transfer",
        type: "Credit",
        status: "Completed",
      };
      dispatch(addTransaction(newTransaction));
    };

    return (
      <SectionList
        style={styles.sectionList}
        sections={groupedTransactions}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <></>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{getMonthName(title)}</Text>
          </View>
        )}
        renderSectionFooter={({ section: { data } }) => (
          <>
            {data.map((dailySection, index) => (
              <SectionList
                key={index}
                sections={[dailySection]}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index, section }) => (
                  <TransactionItem
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    status={item.status}
                    amount={item.amount}
                    description={item.description}
                    date={item.date}
                    isMasked={isMasked}
                    callback={navigate}
                    index={index}
                    isFirst={index == 0}
                    isLast={index == section.data.length - 1}
                  ></TransactionItem>
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <View style={styles.subHeader}>
                    <Text style={styles.subHeaderText}>{title}</Text>
                  </View>
                )}
              />
            ))}
          </>
        )}
      />
    );
  },
  (prevProps, nextProps) => prevProps.isMasked === nextProps.isMasked
);

const styles = StyleSheet.create({
  sectionList: {
    marginBottom: 50,
  },
  header: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212a2f",
  },
  subHeader: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#212a2fa8",
    fontWeight: "bold",
  },
});
