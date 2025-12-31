import { StyleSheet } from "react-native";
import { FontFamily } from "../../theme/typography";

const styles = StyleSheet.create({
  loginButton: {
    height: 54,
    borderRadius: 4,
    backgroundColor: "#F83758",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
  },
});

export default styles;