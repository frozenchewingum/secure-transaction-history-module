import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewProps,
} from "react-native";
import { type TransactionData } from "../types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export type TransactionItemProps = ViewProps &
  TransactionData & {
    index: number,
    isFirst: boolean,
    isLast: boolean,
    isMasked: boolean;
    callback: (id: string) => void;
  };

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
    callback
  }: TransactionItemProps) => {

    const convertTo12HourTime = (isoString: string): string => {
        const date = new Date(isoString);
        
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
      
        // Convert hours from 24-hour to 12-hour format
        hours = hours % 12 || 12; // If hour is 0 (midnight), set to 12
      
        // Pad minutes with leading zero if necessary
        const minutesPadded = minutes < 10 ? `0${minutes}` : minutes;
      
        return `${hours}:${minutesPadded} ${ampm}`;
      }

      const formatAmount = (amount: number): string => {
        // Format the amount as a currency (RM)
        const formattedAmount = `RM ${amount.toFixed(2)}`;
      
        // Add "+" for Debit and "-" for Credit
        if (type === "Debit") {
          return `+${formattedAmount}`;
        } else if (type === "Credit") {
          return `-${formattedAmount}`;
        }
      
        // If type is neither Debit nor Credit, just return the formatted amount
        return formattedAmount;
      }

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
              size={30}
              style={{
                marginLeft: type === "Credit" ? 5 : 0,
                marginRight: type === "Debit" ? 5 : 0,
              }}
              color="#e5e5e5"
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.date}>{convertTo12HourTime(date)}</Text>
          </View>
          <View style={styles.right}>
            <Text style={[styles.amount, type==='Debit' && !isMasked ? styles.positive : {}]}>{isMasked ? '*****' :  formatAmount(amount) }</Text>
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
    height: "auto",
    paddingVertical: 20,
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    backgroundColor: "#5E879A",
    marginTop: 1
  },
  left: {
    width: 50,
    height: 50,
    backgroundColor: "#7c9faf",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  center: {
    display: 'flex',
    flex: 0.6,
    gap: 5
  },
  right: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 0.4,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    color: "#e5e5e5"
  },
  date: {
    color: '#f0f0f088'
  },
  amount: {
    fontSize: 16,
    color: '#e5e5e5'
  },
  positive: {
    color: '#b3f08d',
  },
  isFirst: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20
  },
  isLast: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20
  }
});
