import React from "react";
import { ViewStyle, StyleProp, TextStyle } from "react-native";

export interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  primary?: boolean;
  secondary?: boolean;
  style?: StyleProp<TextStyle | ViewStyle>;
}
