import React from "react";
import { View, TextInput, Pressable } from "react-native";
import styles from "./styles";
import { AppKeyboardType, AppReturnKeyType } from "../../types/keyboard";
import { AutoCapitalize } from "../../types/input";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  autoCapitalize?: AutoCapitalize;
  keyboardType?: AppKeyboardType;
  returnKeyType?: AppReturnKeyType;
  onSubmitEditing?: () => void;
};

export default function AppTextInput({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = "#9A9A9A",
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
  autoCapitalize = AutoCapitalize.None,
  keyboardType = AppKeyboardType.Default,
  returnKeyType = AppReturnKeyType.Default,
  onSubmitEditing,
}: Props) {
  return (
    <View style={styles.inputWrapper}>
      {leftIcon}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        secureTextEntry={!!secureTextEntry}
        style={styles.input}
        keyboardType={keyboardType}
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
