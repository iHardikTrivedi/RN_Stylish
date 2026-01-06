import { Platform, StyleSheet } from "react-native";
import { FontFamily } from "../../../theme/typography";

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },

  tabBar: {
    height: Platform.OS === "ios" ? 86 : 70,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 10,
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: "#FFFFFF",
  },

  label: {
    fontSize: 12,
    marginTop: 4,
  },

  centerBtnWrap: {
    top: -22, // floating effect
    alignItems: "center",
    justifyContent: "center",
  },

  centerBtnBase: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",

    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  // 🔘 NOT selected (image 1)
  centerBtnInactive: {
    backgroundColor: "#FFFFFF",
  },

  // 🔴 SELECTED (image 2)
  centerBtnActive: {
    backgroundColor: "#E53935",
  },
});

export default styles;

