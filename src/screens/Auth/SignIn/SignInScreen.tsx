import React, { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./styles";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

import UserIcon from "../../../../assets/SVGs/user.svg";
import LockIcon from "../../../../assets/SVGs/lock.svg";
import EyeOpenIcon from "../../../../assets/SVGs/eye_open.svg";

import { AuthStackParamList } from "../../../navigation/types";
import { AppReturnKeyType } from "../../../types/keyboard";
import { withKeyboardDismiss } from "../../../utils/press";
import { AuthRoutes } from "../../../navigation/routes";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { authError } from "../../../store/authSlice";
import { login } from "../../../store/authActions";
import { checkInternet } from "../../../utils/network";

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoutes.SignIn>;

export default function SignInScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((s) => s.auth);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (!error) return;

    Alert.alert("Error", error, [
      { text: "OK", onPress: () => dispatch(authError("")) },
    ]);
  }, [error, dispatch]);

  const handleLogin = useCallback(async () => {
    const u = emailOrUsername.trim();

    if (!u) return Alert.alert("Validation", "Please enter Username or Email.");
    if (!password) return Alert.alert("Validation", "Please enter Password.");
    if (password.length < 6)
      return Alert.alert("Validation", "Password must be at least 6 characters.");

    const hasInternet = await checkInternet();
    if (!hasInternet) {
      return Alert.alert("No Internet", "Please check your internet connection and try again.");
    }

    dispatch(authError(""));
    dispatch(login({ phone_no: u, password }));
  }, [emailOrUsername, password, dispatch]);

  const handleSignUp = useCallback(() => {
    navigation.navigate(AuthRoutes.SignUp);
  }, [navigation]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate(AuthRoutes.ForgotPassword);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome{"\n"}Back!</Text>

        <AppTextInput
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
          placeholder="Username or Email"
          leftIcon={<UserIcon />}
          returnKeyType={AppReturnKeyType.Next}
        />

        <AppTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          leftIcon={<LockIcon />}
          rightIcon={<EyeOpenIcon />}
          onRightIconPress={() => setIsPasswordVisible((v) => !v)}
          returnKeyType={AppReturnKeyType.Done}
          onSubmitEditing={handleLogin}
        />
        <Pressable
          onPress={handleForgotPassword}
          style={styles.forgotView}
        >
          <Text style={styles.forgotButton}>Forgot Password?</Text>
        </Pressable>

        <PrimaryButton
          title={isLoading ? "Logging In..." : "Login"}
          onPress={handleLogin}
          style={styles.primaryButton}
          disabled={isLoading}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Create An Account </Text>
          <Pressable onPress={withKeyboardDismiss(handleSignUp)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
