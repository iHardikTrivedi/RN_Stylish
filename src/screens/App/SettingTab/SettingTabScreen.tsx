import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { useAppDispatch } from "../../../store/hooks";
import { useCallback } from "react";
import { logoutUser } from "../../../store/authActions";
import styles from "./styles";

export default function SettingTabScreen() {
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