import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigation/RootNavigator";
import { useAppFonts } from "./theme/fonts";
import KeyboardDismissView from "./components/KeyboardDismissView";

export default function App() {
  const fontsLoaded = useAppFonts();
  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <KeyboardDismissView>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </KeyboardDismissView>
    </SafeAreaProvider>
  );
}