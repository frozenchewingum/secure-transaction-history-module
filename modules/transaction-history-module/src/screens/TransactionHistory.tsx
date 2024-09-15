import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransactionList } from "../components/TransactionList";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as LocalAuthentication from "expo-local-authentication";


const TransactionHistory: React.FC = () => {
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);
  const [isMask, setIsMask] = useState<boolean>(true);

  const toggleMask = async () => {
    if(!isAuthenticate) {
      await authenticate().then((response) => {
        if(response?.success) {
          setIsMask((prev) => !prev);
        }
      });
    } else {
      setIsMask((prev) => !prev);
    }
  };

  const authenticate = async () => {
    const isCompatible = await LocalAuthentication.hasHardwareAsync();
    if (!isCompatible) {
      Alert.alert("Device does not support biometrics");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Please verify to view the amount",
      fallbackLabel: "Use Passcode",
    });

    if (result.success) {
      setIsAuthenticate(true);
    } else {
    }

    return result;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Transaction History</Text>
        <MaterialCommunityIcons
          name={isMask ? "eye" : "eye-off"}
          size={28}
          color="#212a2f"
          onPress={toggleMask}
        />
      </View>
      <View style={styles.listContainer}>
      <TransactionList isMasked={isMask} />
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#212a2f"
  },
  listContainer: {
    padding: 20
  }
});

export default TransactionHistory;
