import React from "react";
import { View, Text, Dimensions, StyleSheet, type ViewProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';

export type TransactionDetailItemProps = ViewProps & {
  label: string;
  value: string;
  canCopy?: boolean;
};

const { width, height } = Dimensions.get('window');

export const TransactionDetailItem = React.memo(
  ({ label, value, canCopy }: TransactionDetailItemProps) => {
  
    const copyToClipboard = async () => {
      await Clipboard.setStringAsync(value);
    };

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <View style={styles.right}>
          {canCopy && (
            <MaterialCommunityIcons
              name="content-copy"
              size={width * 0.05}
              color="#f0f0f088"
              onPress={copyToClipboard}
            />
          )}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: height * 0.1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#5E879A",
    marginVertical: 10,
    borderRadius: 10
  },
  left: {
    width: 50,
    height: 50,
    display: "flex",
    gap: 5,
    flex: 1
  },
  right: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  label: {
    fontSize: width * 0.035,
    color: "#f0f0f088"
  },
  value: {
    fontSize: width * 0.04,
    color: "#e5e5e5",
    fontWeight: "bold"
  }
});
