import { StyleSheet } from "react-native";
import { FontFamily } from "../../../theme/typography";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    backgroundColor: "#FFFFFF",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: FontFamily.semiBold,
    color: "#000",
    marginBottom: 24,
  },
  closeTitle: {
    fontSize: 16,
    fontFamily: FontFamily.extraBold,
    color: "#F83758",
  },

  eyeButton: {
    paddingLeft: 10,
    paddingVertical: 6,
  },
  eyeText: {
    fontSize: 16,
    opacity: 0.7,
  },

  forgotWrap: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotText: {
    fontSize: 12,
    color: "#F83758",
    fontFamily: FontFamily.regular,
  },

  primaryButton: {
    marginTop: 32,
  },

  dividerWrap: {
    marginTop: 28,
    alignItems: "center",
  },
  dividerText: {
    marginVertical: 12,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: "#575757",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginTop: 6,
  },
  socialText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },
  footerText: {
    fontSize: 14,
    color: "#575757",
    fontFamily: FontFamily.regular,
  },
  signUpText: {
    fontSize: 14,
    color: "#F83758",
    fontFamily: FontFamily.semiBold,
    textDecorationLine: "underline",
  },

  text: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: "#676767", // grey text
    marginTop: 16,
  },
  highlight: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: "#FF4B26", // red color
  },
});

export default styles;

