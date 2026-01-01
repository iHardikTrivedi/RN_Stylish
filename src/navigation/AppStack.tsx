import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/App/Home/HomeScreen";
import { AppStackParamList } from "./types";
import { AppRoutes } from "./routes";
import TabScreen from "../screens/App/Tab/TabScreen";

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.Home} component={HomeScreen} />
      <Stack.Screen name={AppRoutes.Tab} component={TabScreen} />
    </Stack.Navigator>
  );
}
