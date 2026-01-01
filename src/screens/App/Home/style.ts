import { StyleSheet } from "react-native";
import { FontFamily } from "../../../theme/typography";

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    bottom: 0,
    justifyContent: "flex-end",
  },

  bottomContent: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 34,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontFamily: FontFamily.semiBold,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 16,
    marginBottom: 42,
    color: "#F2F2F2",
    fontSize: 14,
    fontFamily: FontFamily.regular,
    textAlign: "center",
  },

  button: {
    width: "78%",
    height: 56,
  },
});

export default styles;

