import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function NetworkErrorScreen() {
  return (
    <>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            <View>
              <Image
                source={require("../assets/images/network-error.svg")}
                style={styles.image}
              />
              <Text style={styles.title}>Oops! Unable connect to the network</Text>
              <Text style={styles.subTitle}>Please check your internet and try again</Text>
            </View>
          </View>
        </SafeAreaView>
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
  }
});
