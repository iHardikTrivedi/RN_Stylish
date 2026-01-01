import React, { useCallback } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../navigation/types";
import { AppRoutes } from "../../../navigation/routes";
import { useAppDispatch } from "../../../store/hooks";
import { logoutUser } from "../../../store/authActions";

type Props = NativeStackScreenProps<AppStackParamList, AppRoutes.Tab>;

export default function TabScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const loggedOut = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <PrimaryButton
          title="Log Out"
          onPress={loggedOut}
        />
      </View>
    </SafeAreaView>
  );
}
