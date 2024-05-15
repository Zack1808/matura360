import { View, Text, StyleSheet } from "react-native";
import React from "react";

import Loader from "../components/Loader";

const StartScreen = () => {
  return (
    <View style={styles.loaderContainer}>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C56EC",
  },
});

export default StartScreen;
