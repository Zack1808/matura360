import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";

const StartScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading)
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ImageBackground
        source={require("../../assets/imgs/background1.png")}
        style={styles.backgroundImageContainer}
      >
        <View style={styles.bannerContanier}>
          <Image
            style={styles.banner}
            source={require("../../assets/imgs/icon.png")}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Dobrodošli</Text>
          <Text style={styles.text}>
            Provjeri svoje znanje uz{" "}
            <Text style={{ color: "#EC622C" }}>Matura360</Text>
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C56EC",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#FFFFF0",
  },
  backgroundImageContainer: {
    flex: 1,
    resizeMode: "contain",
    paddingHorizontal: 30,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  bannerContanier: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
  },
  banner: {
    width: 100,
    height: 100,
  },
  welcomeContainer: {
    borderWidth: 1,
    width: "100%",
    paddingTop: 50,
    gap: 30,
  },
  title: {
    fontSize: 50,
    fontFamily: "nohemiSemiBold",
  },
  text: {
    fontSize: 20,
    fontFamily: "nohemiSemiBold",
  },
});

export default StartScreen;
