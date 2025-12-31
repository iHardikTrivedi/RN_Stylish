import React from "react";
import { View, TextInput, Pressable } from "react-native";
import styles from "./styles";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  returnKeyType?: "next" | "done";
  onSubmitEditing?: () => void;
};

export default function AppTextInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
  returnKeyType,
  onSubmitEditing,
}: Props) {
  return (
    <View style={styles.inputWrapper}>
      {leftIcon}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9A9A9A"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={!!secureTextEntry}
        style={styles.input}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />

      {rightIcon && (
        <Pressable
          onPress={onRightIconPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {rightIcon}
        </Pressable>
      )}
    </View>
  );
}
