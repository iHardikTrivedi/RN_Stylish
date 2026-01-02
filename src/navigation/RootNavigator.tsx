import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from "../screens/Splash/SplashScreen";
import StartInfoScreen from "../screens/StartInfo/StartInfoScreen";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadToken } from "../store/authActions";

const KEYS = {
  hasSeenIntro: "hasSeenIntro",
  forceIntroAfterLogout: "showIntroAfterLogout",
};

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);

  const [booting, setBooting] = useState(true);
  const [seenIntro, setSeenIntro] = useState<boolean | null>(null);
  const [forceIntro, setForceIntro] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await new Promise((r) => setTimeout(r, 800));

        const [introValue, forceValue] = await Promise.all([
          AsyncStorage.getItem(KEYS.hasSeenIntro),
          AsyncStorage.getItem(KEYS.forceIntroAfterLogout),
        ]);

        if (!mounted) return;

        setSeenIntro(!!introValue);
        setForceIntro(forceValue === "1");

        await dispatch(loadToken());
      } finally {
        if (mounted) setBooting(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!token) {
        const forceValue = await AsyncStorage.getItem(KEYS.forceIntroAfterLogout);
        if (!mounted) return;

        setForceIntro(forceValue === "1");
        if (forceValue === "1") setSeenIntro(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token]);

  // 1) Splash
  if (booting || seenIntro === null || forceIntro === null) {
    return <SplashScreen />;
  }

  // 2) Intro: first install OR forced after logout
  if (!seenIntro || forceIntro) {
    return (
      <StartInfoScreen
        onFinish={async () => {
          await AsyncStorage.multiSet([
            [KEYS.hasSeenIntro, "1"],
            [KEYS.forceIntroAfterLogout, "0"],
          ]);

          setSeenIntro(true);
          setForceIntro(false);
        }}
      />
    );
  }

  // 3) Auth/App
  return token ? <AppStack /> : <AuthStack />;
}