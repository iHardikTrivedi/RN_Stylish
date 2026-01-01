import React, { useCallback, useMemo, useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommonActions, useNavigation } from "@react-navigation/native";

import styles from "./styles";
import AppTextInput from "../../components/AppTextInput/AppTextInput";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import UserIcon from "../../../assets/SVGs/user.svg";
import LockIcon from "../../../assets/SVGs/lock.svg";
import EyeOpenIcon from "../../../assets/SVGs/eye_open.svg";
import GoogleIcon from "../../../assets/SVGs/google.svg";
import AppleIcon from "../../../assets/SVGs/apple.svg";
import FBIcon from "../../../assets/SVGs/fb.svg";

import { AuthStackParamList, RootStackParamList } from "../../navigation/types";
import { AppReturnKeyType } from "../../types/keyboard";
import { AuthRoutes, RootRoutes } from "../../navigation/routes";

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoutes.SignUp>;

export default function SignUpScreen({ navigation }: Props) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const goToApp = useCallback(() => {
    const parentNav = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
    parentNav?.reset({
      index: 0,
      routes: [{ name: RootRoutes.App }],
    });
  }, [navigation]);

  const handleCreateAccount = useCallback(async () => {
    const u = emailOrUsername.trim();

    if (!u) return Alert.alert("Validation", "Please enter Username or Email.");
    if (!password) return Alert.alert("Validation", "Please enter Password.");
    if (password.length < 6)
      return Alert.alert("Validation", "Password must be at least 6 characters.");
    if (password !== confirmPassword)
      return Alert.alert("Validation", "Password and Confirm Password must match.");

    try {
      await AsyncStorage.setItem("token", "dummy_token");

      goToApp();
    } catch {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  }, [emailOrUsername, password, confirmPassword, goToApp]);

  const goToLogin = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Create{"\n"}Account!</Text>

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
          returnKeyType={AppReturnKeyType.Next}
        />

        <AppTextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={!isConfirmPasswordVisible}
          leftIcon={<LockIcon />}
          rightIcon={<EyeOpenIcon />}
          onRightIconPress={() => setIsConfirmPasswordVisible((v) => !v)}
          returnKeyType={AppReturnKeyType.Done}
          onSubmitEditing={handleCreateAccount}
        />

        <Text style={styles.text}>
          By clicking the{" "}
          <Text style={styles.highlight}>Register</Text>
          {" "}button, you agree to the public offer
        </Text>

        <PrimaryButton
          title="Create Account"
          onPress={handleCreateAccount}
          style={styles.primaryButton}
        />

        <View style={styles.dividerWrap}>
          <Text style={styles.dividerText}>- OR Continue with -</Text>
        </View>

        <View style={styles.socialRow}>
          <Pressable onPress={() => Alert.alert("Google", "Google signup - TODO")}>
            <GoogleIcon />
          </Pressable>

          <Pressable onPress={() => Alert.alert("Apple", "Apple signup - TODO")}>
            <AppleIcon />
          </Pressable>

          <Pressable onPress={() => Alert.alert("Facebook", "Facebook signup - TODO")}>
            <FBIcon />
          </Pressable>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>I Already Have an Account </Text>
          <Pressable onPress={goToLogin} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.signUpText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
