import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import RootNavigator from "./navigation/RootNavigator";
import { useAppFonts } from "./theme/fonts";
import KeyboardDismissView from "./components/KeyboardDismissView";

import { store } from "./store/store";

export default function App() {
  const fontsLoaded = useAppFonts();
  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardDismissView>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </KeyboardDismissView>
      </SafeAreaProvider>
    </Provider>
  );
}
