import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  type ViewProps,
} from "react-native";
import { type TransactionData } from "../types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatAmount, format12HourTime } from "../utils/formatUtils";
export type TransactionItemProps = ViewProps &
  TransactionData & {
    index: number;
    isFirst: boolean;
    isLast: boolean;
    isMasked: boolean;
    callback: (id: string) => void;
  };

const { width, height } = Dimensions.get("window");

export const TransactionItem = React.memo(
  ({
    id,
    type,
    date,
    amount,
    description,
    index,
    isFirst,
    isLast,
    isMasked,
    callback,
  }: TransactionItemProps) => {
    return (
      <Pressable onPress={() => callback(id)}>
        <View
          style={[
            styles.container,
            isFirst ? styles.isFirst : {},
            isLast && styles.isLast,
          ]}
        >
          <View style={styles.left}>
            <MaterialCommunityIcons
              name={type === "Debit" ? "bank-transfer-in" : "bank-transfer-out"}
              size={width*0.06}
              style={{
                marginLeft: type === "Credit" ? 5 : 0,
                marginRight: type === "Debit" ? 5 : 0,
              }}
              color="#e5e5e5"
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.date}>{format12HourTime(date)}</Text>
          </View>
          <View style={styles.right}>
            <Text
              style={[
                styles.amount,
                type === "Debit" && !isMasked ? styles.positive : {},
              ]}
            >
              {isMasked ? "*****" : formatAmount(type, amount)}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  },
  (prevProps, nextProps) =>
    prevProps.isMasked === nextProps.isMasked && prevProps.id === nextProps.id
);

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: height*0.12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#5E879A",
    marginTop: 1,
  },
  left: {
    width: width*0.1,
    height: width*0.1,
    backgroundColor: "#7c9faf",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    display: "flex",
    flex: 0.6,
    gap: 5,
  },
  right: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 0.4,
  },
  description: {
    fontSize: width*0.045,
    fontWeight: "500",
    color: "#e5e5e5",
  },
  date: {
    color: "#f0f0f088",
  },
  amount: {
    fontSize: width*0.04,
    color: "#e5e5e5",
  },
  positive: {
    color: "#b3f08d",
  },
  isFirst: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20,
  },
  isLast: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20,
  },
});
