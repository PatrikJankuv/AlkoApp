import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { Text, StyleSheet, View } from "react-native";
import ScreenView from "./layout/ScreenView";
import { Buttons } from "../components/styles/buttons";
import { TEAL_600, GRAY_600 } from "../constants/colors";
import { Containers } from "../components/styles/containers";

interface ButtonProps {
  title: string;
  variant: "default" | "primary";
  onPress: () => void;
}

const Button = ({ title, variant, onPress }: ButtonProps) => {
  const backgroundColor = variant === "primary" ? TEAL_600 : GRAY_600;
  return (
    <RectButton style={[Buttons.Primary, { backgroundColor }]} {...{ onPress }}>
      <Text style={Buttons.ButtonText}>{title}</Text>
    </RectButton>
  );
};

Button.defaultProps = { variant: "default" };

export default Button;
