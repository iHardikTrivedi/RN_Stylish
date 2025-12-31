import React, { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./styles";
import AppTextInput from "../../components/AppTextInput/AppTextInput";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import UserIcon from "../../../assets/SVGs/user.svg";
import LockIcon from "../../../assets/SVGs/lock.svg";
import EyeOpenIcon from "../../../assets/SVGs/eye_open.svg";

import { AuthStackParamList, RootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppReturnKeyType } from "../../types/keyboard";
import { withKeyboardDismiss } from "../../utils/press";

type Props = NativeStackScreenProps<AuthStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: Props) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const goToApp = useCallback(() => {
    // ✅ jump to ROOT stack from AuthStack
    const parentNav = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
    parentNav?.reset({
      index: 0,
      routes: [{ name: "App" }],
    });
  }, [navigation]);

  const handleLogin = useCallback(async () => {
    // TODO: real API login
    await AsyncStorage.setItem("token", "dummy_token");
    goToApp();
  }, [goToApp]);

  const handleSignUp = useCallback(() => {
    navigation.navigate("SignUp");
  }, [navigation]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate("ForgotPassword");
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

        <PrimaryButton title="Login" onPress={handleLogin} style={styles.primaryButton} />

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
