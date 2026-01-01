import React, { useCallback, useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

import EmailIcon from "../../../../assets/SVGs/email.svg";

import { AuthStackParamList } from "../../../navigation/types";
import { AppReturnKeyType } from "../../../types/keyboard";
import { AuthRoutes } from "../../../navigation/routes";

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoutes.ForgotPassword>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const rootNavigation = useNavigation<any>(); // ✅ root navigator context
  const [email, setEmail] = useState("");

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.topBar}>
          <Text style={styles.title}>Forgot{"\n"}Password</Text>

          {Platform.OS === "ios" && (
            <Pressable onPress={goBack}>
              <Text style={styles.closeTitle}>Close</Text>
            </Pressable>
          )}
        </View>

        <AppTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
          leftIcon={<EmailIcon />}
          returnKeyType={AppReturnKeyType.Done}
        />

        <Text style={styles.text}>
          <Text style={styles.highlight}>*</Text>
          {" "}We will send you a message to set or reset your new password
        </Text>

        <PrimaryButton
          title="Submit"
          onPress={() => Alert.alert("Submit", "Submit - TODO")}
          style={styles.primaryButton}
        />
      </View>
    </SafeAreaView>
  );
}
