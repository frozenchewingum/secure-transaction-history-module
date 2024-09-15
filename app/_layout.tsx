import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import NetInfo from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
          setIsConnected(state.isConnected);
          if (!state.isConnected) {
            Alert.alert("Network Error", "There was an error connecting. Please check your internet.");
            if(router) {
              router.navigate("/NetworkErrorScreen");
            }
          } else {
            if(router) {
              router.navigate("/");
            }
          }
        });
        return () => unsubscribe();
      });
    }

  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="TransactionHistoryScreen"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="NetworkErrorScreen"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
