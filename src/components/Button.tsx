import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

import { ButtonProps } from "../interfaces/components";

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  primary,
  secondary,
  style,
  ...rest
}) => {
  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      {...rest}
      onPress={handlePress}
      style={[primary && styles.primary, secondary && styles.secondary, style]}
    >
      <Text
        style={[
          styles.buttonText,
          primary && styles.buttonTextPrimary,
          secondary && styles.buttonTextSecondary,
          style,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#EC622C",
  },
  secondary: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#EC622C",
  },
  buttonText: {
    fontFamily: "nohemi",
  },
  buttonTextPrimary: {
    color: "#FFFFF0",
    fontFamily: "nohemiSemiBold",
  },
  buttonTextSecondary: {
    color: "#EC622C",
    fontFamily: "nohemiSemiBold",
  },
});

export default Button;
