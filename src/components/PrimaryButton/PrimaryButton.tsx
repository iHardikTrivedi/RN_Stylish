import React from "react";
import { Keyboard, Pressable, PressableProps, StyleProp, Text, ViewStyle } from "react-native";
import styles from "./styles";

type Props = PressableProps & {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({ title, onPress, disabled, style, ...rest }: Props) {
  const handlePress: PressableProps["onPress"] = (e) => {
    Keyboard.dismiss();          // ✅ always dismiss
    onPress?.(e);                // ✅ then run original action
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.loginButton,
        disabled && { opacity: 0.6 },
        style,
      ]}
      {...rest}
    >
      <Text style={styles.loginButtonText}>{title}</Text>
    </Pressable>
  );
}
