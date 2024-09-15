import React, { useEffect, useState } from "react";
import { View, Text, Alert, Pressable, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function Index() {
  const [isAuthenticateFailed, setIsAuthenticateFailed] =
    useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const isCompatible = await LocalAuthentication.hasHardwareAsync();
    if (!isCompatible) {
      Alert.alert("Device does not support biometrics");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Please unlock to proceed",
      fallbackLabel: "Use Passcode",
    });

    if (result.success) {
      router.navigate("/TransactionHistoryScreen");
    } else {
      setIsAuthenticateFailed(true);
    }
  };

  return (
    <>
      {isAuthenticateFailed ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            <View>
              <Image
                source={require("../assets/images/authenticate-fail.svg")}
                style={styles.image}
              />
              <Text style={styles.title}>Oops! Unable to authenticate</Text>
              <Text style={styles.subTitle}>Please try again</Text>
              <Pressable style={styles.button} onPress={authenticate}>
                <Text style={styles.buttonText}>Retry</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Image
              source={require("../assets/images/react-logo.png")}
              style={styles.image}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#7c9faf",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    width: width*0.75,
    height: "100%",
    margin: "auto",
  },
  authenticateFailContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: width*0.05,
    fontWeight: "500",
    color: "#455962",
  },
  subTitle: {
    fontSize: width*0.04,
    fontWeight: "100",
  },
  image: {
    width: width*0.5,
    height: width*0.5,
    margin: "auto",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: height*0.05,
    elevation: 3,
    backgroundColor: "#212a2f",
    marginTop: 15,
    width: width*0.75,
    height: height*0.05
  },
  buttonText: {
    fontSize: width*0.04,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  }
});
