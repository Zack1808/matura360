import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";

interface ButtonProps {
  children?: string;
  onPress?: () => void;
  primary?: boolean;
  secondary?: boolean;
  style?: StyleProp<ViewStyle>;
}

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
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    padding: 20,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#EC622C",
  },
  secondary: {
    padding: 20,
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#EC622C",
  },
  buttonText: {
    fontFamily: "nohemiSemiBold",
    fontSize: 20,
  },
  buttonTextPrimary: {
    color: "#FFFFF0",
  },
  buttonTextSecondary: {
    color: "#EC622C",
  },
});

export default Button;
