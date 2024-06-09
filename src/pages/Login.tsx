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
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useRegistration } from "../hooks/registration";

import Button from "../components/Button";

import { RegistrationState, RegistrationErrorState } from "../interfaces/state";

const Login: React.FC = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegistrationErrorState>({
    emailError: "",
    passwordError: "",
  });
  const [data, setData] = useState<RegistrationState>({
    email: "",
    password: "",
  });

  const { loginUser } = useRegistration({ setIsLoading, setErrors });

  const { emailError, passwordError } = errors;

  const { email, password } = data;

  const handleTextChange = (text: string, type: string) => {
    switch (type) {
      case "email":
        setData((prevState) => ({ ...prevState, email: text }));
        setErrors((prevState) => ({
          ...prevState,
          emailError: "",
        }));
        break;
      case "password":
        setData((prevState) => ({ ...prevState, password: text }));
        setErrors((prevState) => ({
          ...prevState,
          passwordError: "",
        }));
    }
  };

  const handleRegistration = () => {
    if (!!!email) {
      setErrors((prevState) => ({
        ...prevState,
        emailError: "Morate upisati vašu mail adressu",
      }));
      return;
    }

    if (!!!password) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "Morate upisati vašu lozinku",
      }));
      return;
    }

    loginUser(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Image
          source={require("../../assets/imgs/background2.png")}
          style={styles.backgroundImage}
        />
        <Text style={styles.title}>Prijava</Text>
        <View style={styles.inputContainer}>
          <View style={{ gap: 5 }}>
            <TextInput
              value={email}
              onChangeText={(text: string) => handleTextChange(text, "email")}
              style={[styles.input, !!emailError && styles.errorInput]}
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <View style={{ display: !!emailError ? "flex" : "none" }}>
              <Text style={styles.errorText}>{!!emailError && emailError}</Text>
            </View>
          </View>
          <View style={{ gap: 5 }}>
            <TextInput
              value={password}
              onChangeText={(text: string) =>
                handleTextChange(text, "password")
              }
              style={[styles.input, !!passwordError && styles.errorInput]}
              placeholder="Lozinka"
              secureTextEntry={true}
            />
            <View
              style={{
                display: !!passwordError ? "flex" : "none",
              }}
            >
              <Text style={styles.errorText}>
                {!!passwordError && passwordError}
              </Text>
            </View>
          </View>
          <Button style={{ color: "#EC622C", paddingHorizontal: 10 }}>
            Zaboravljena lozinka?
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button primary onPress={handleRegistration}>
            {isLoading ? <ActivityIndicator color="white" /> : "Prijavi se"}
          </Button>
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
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
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
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    fontFamily: "nohemi",
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
