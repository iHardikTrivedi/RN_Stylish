import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from "../screens/Splash/SplashScreen";
import StartInfoScreen from "../screens/StartInfo/StartInfoScreen";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadToken } from "../store/authActions";

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);

  const [booting, setBooting] = useState(true);
  const [seenIntro, setSeenIntro] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // optional delay to show splash nicely
        await new Promise((r) => setTimeout(r, 800));

        const introValue = await AsyncStorage.getItem("hasSeenIntro");
        if (!mounted) return;

        setSeenIntro(!!introValue);

        // load token from AsyncStorage into redux
        await dispatch(loadToken());
      } finally {
        if (mounted) setBooting(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  // 1) Splash while booting
  if (booting || seenIntro === null) {
    return <SplashScreen />;
  }

  // 2) Intro (only once)
  if (!seenIntro) {
    return (
      <StartInfoScreen
        onFinish={async () => {
          await AsyncStorage.setItem("hasSeenIntro", "1");
          setSeenIntro(true);
        }}
      />
    );
  }

  // 3) Auth vs App based on token (AUTO redirects on login/logout)
  return token ? <AppStack /> : <AuthStack />;
}