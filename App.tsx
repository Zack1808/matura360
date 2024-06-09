import { useState, useEffect } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import Router from "./src/Router";

import Loader from "./src/components/Loader";

import { useAuthStatus } from "./src/hooks/useAuthStatus";

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  const { checkingStatus } = useAuthStatus();

  const [loadedFont, fontError] = useFonts({
    nohemi: require("./assets/fonts/Nohemi-Regular.ttf"),
    nohemiMedium: require("./assets/fonts/Nohemi-Medium.ttf"),
    nohemiSemiBold: require("./assets/fonts/Nohemi-SemiBold.ttf"),
    nohemiBold: require("./assets/fonts/Nohemi-Bold.ttf"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  });

  if (!loadedFont || isAppLoading || checkingStatus)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2C56EC",
        }}
      >
        <Loader />
      </View>
    );

  return (
    <>
      <Router />
      <Toast />
    </>
  );
}
