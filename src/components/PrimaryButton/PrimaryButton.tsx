import React from "react";
import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import styles from "./styles";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({ title, onPress, disabled, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.loginButton,
        disabled && { opacity: 0.6 },
        style,
      ]}
    >
      <Text style={styles.loginButtonText}>{title}</Text>
    </Pressable>
  );
}
