import {
  SafeAreaView,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";

import Button from "../components/Button";

const Login: React.FC = ({ navigation }: any) => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (event) => {
      setKeyboardHeight(-event.endCoordinates.height);
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", (event) => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidHide.remove();
      keyboardDidShow.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={require("../../assets/imgs/background2.png")}
          style={[styles.backgroundImage, { bottom: keyboardHeight }]}
        />
        <Text style={styles.title}>Prijava</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="E-mail" />
          <TextInput style={styles.input} placeholder="Lozinka" />
          <Button style={{ color: "#EC622C", paddingHorizontal: 10 }}>
            Zaboravljena lozinka?
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button primary>Prijavi se</Button>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "nohemi",
              }}
            >
              Nemaš profil?{" "}
            </Text>
            <Button
              onPress={() => navigation.navigate("Register")}
              style={styles.buttonText}
            >
              {" "}
              Registriraj se se.
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF0",
    position: "relative",
    alignItems: "center",
    width: "100%",
    gap: 35,
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    zIndex: -1,
  },
  title: {
    marginTop: "70%",
    fontSize: 32,
    fontFamily: "nohemiMedium",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 15,
  },
  input: {
    borderColor: "rgba(0, 0, 0, .15)",
    backgroundColor: "rgba(0, 0, 0, .04)",
    borderWidth: 1,
    fontFamily: "nohemi",
    width: "100%",
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonContainer: {
    gap: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#EC622C",
  },
});

export default Login;
