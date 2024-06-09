import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";
import Button from "../components/Button";

import { useRegistration } from "../hooks/registration";

const StartScreen: React.FC = ({ navigation }: any) => {
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setToGuestMode } = useRegistration({ setIsLoading });

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading)
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
            Provjeri svoje znanje uz
            <Text style={{ color: "#EC622C" }}> Matura360</Text>
          </Text>
          <View style={styles.welcomeButtonContainer}>
            <Button
              onPress={() => navigation.navigate("Login")}
              style={{ width: "100%", textAlign: "center" }}
              primary
            >
              Prijavi se
            </Button>
            <Button
              onPress={() => navigation.navigate("Register")}
              style={{ width: "100%", textAlign: "center" }}
              secondary
            >
              Registriraj se
            </Button>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            style={{ width: "100%", textAlign: "center" }}
            secondary
            onPress={setToGuestMode}
          >
            {isLoading ? (
              <ActivityIndicator color="#EC622C" />
            ) : (
              "Nastavi kao gost"
            )}
          </Button>
          <Text style={{ fontSize: 14, fontFamily: "nohemi" }}>
            Kao gost nećeš moći pratiti napredak.
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
    width: "100%",
    paddingTop: 70,
    gap: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: "nohemiSemiBold",
  },
  text: {
    fontSize: 16,
    fontFamily: "nohemiMedium",
  },
  welcomeButtonContainer: {
    gap: 30,
  },
  bottomContainer: {
    width: "100%",
    marginTop: "auto",
    paddingBottom: 70,
    alignItems: "center",
    gap: 20,
  },
});

export default StartScreen;
