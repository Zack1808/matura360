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
import React, { useState } from "react";

import Button from "../components/Button";

import { useRegistration } from "../hooks/registration";

import { RegistrationErrorState, RegistrationState } from "../interfaces/state";

const Register: React.FC = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegistrationErrorState>({
    userNameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
  });
  const [data, setData] = useState<RegistrationState>({
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { registerUser } = useRegistration({ setIsLoading, setErrors });

  const { userNameError, emailError, passwordError, repeatPasswordError } =
    errors;

  const { userName, email, password, repeatPassword } = data;

  const handleTextChange = (text: string, type: string) => {
    switch (type) {
      case "username":
        setData((prevState) => ({
          ...prevState,
          userName: text,
        }));
        setErrors((prevState) => ({
          ...prevState,
          userNameError: "",
        }));
        break;
      case "email":
        setData((prevState) => ({
          ...prevState,
          email: text,
        }));
        setErrors((prevState) => ({
          ...prevState,
          emailError: "",
        }));
        break;
      case "password":
        setData((prevState) => ({
          ...prevState,
          password: text,
        }));
        setErrors((prevState) => ({
          ...prevState,
          passwordError: "",
        }));
        break;
      case "repeat":
        setData((prevState) => ({
          ...prevState,
          repeatPassword: text,
        }));
        setErrors((prevState) => ({
          ...prevState,
          repeatPasswordError: "",
        }));
        break;
    }
  };

  const handleRegistration = () => {
    if (!!!userName) {
      setErrors((prevState) => ({
        ...prevState,
        userNameError: "Morate upisati vaše korisničko ime",
      }));
      return;
    }

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
    if (password !== repeatPassword) {
      setErrors((prevState) => ({
        ...prevState,
        repeatPasswordError: "Lozinke se ne poklapaju",
      }));
      return;
    }

    registerUser(userName, email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={60}
      >
        <Image
          source={require("../../assets/imgs/background2.png")}
          style={styles.backgroundImage}
        />
        <Text style={styles.title}>Registracija</Text>
        <View style={styles.inputContainer}>
          <View style={{ gap: 5 }}>
            <TextInput
              value={userName}
              onChangeText={(text: string) =>
                handleTextChange(text, "username")
              }
              style={[styles.input, !!userNameError && styles.errorInput]}
              placeholder="Korisničko ime"
            />
            <View style={{ display: !!userNameError ? "flex" : "none" }}>
              <Text style={styles.errorText}>
                {!!userNameError && userNameError}
              </Text>
            </View>
          </View>
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
              style={[
                styles.input,
                (!!passwordError || !!repeatPasswordError) && styles.errorInput,
              ]}
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
          <View style={{ gap: 5 }}>
            <TextInput
              value={repeatPassword}
              onChangeText={(text: string) => handleTextChange(text, "repeat")}
              style={[styles.input, !!repeatPasswordError && styles.errorInput]}
              placeholder="Ponovljena lozinka"
              secureTextEntry={true}
            />
            <View
              style={{
                display: !!repeatPasswordError ? "flex" : "none",
              }}
            >
              <Text style={styles.errorText}>
                {!!repeatPasswordError && repeatPasswordError}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button primary onPress={handleRegistration}>
            {isLoading ? <ActivityIndicator color="white" /> : "Registriraj se"}
          </Button>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "nohemi",
              }}
            >
              Imaš profil?{" "}
            </Text>
            <Button
              onPress={() => navigation.navigate("Login")}
              style={styles.buttonText}
            >
              {" "}
              Prijavi se.
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

export default Register;
