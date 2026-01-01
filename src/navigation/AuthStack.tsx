import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { AuthRoutes } from "./routes";

import SignInScreen from "../screens/Auth/SignIn/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUp/SignUpScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPassword/ForgotPasswordScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AuthRoutes.SignIn} component={SignInScreen} />
      <Stack.Screen name={AuthRoutes.SignUp} component={SignUpScreen} />
      <Stack.Screen name={AuthRoutes.ForgotPassword} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
