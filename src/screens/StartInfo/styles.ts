import { Dimensions, StyleSheet } from "react-native";
import { FontFamily } from "../../theme/typography";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Top Bar */
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 10,        // ✅ iOS
    elevation: 10,
  },
  skipButton: {
    color: "#000",
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
  },
  counter: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
  },
  current: {
    color: "#000000",
  },
  total: {
    color: "#A0A0A1",
  },

  /* Content area */
  content: {
    flex: 1,
    justifyContent: "center",
    // small visual balance tweak (your current approach kept)
    transform: [{ translateY: -SCREEN_HEIGHT * 0.08 }],
  },

  /* Page */
  page: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    marginTop: 18,
    fontSize: 24,
    fontFamily: FontFamily.extraBold,
    color: "#000",
    textAlign: "center",
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: "#A8A8A9",
    textAlign: "center",
  },

  /* Bottom Bar */
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  bottomSide: {
    width: 110, // ✅ reserves space so "Get Started" never wraps
  },
  bottomSideRight: {
    alignItems: "flex-end",
  },

  bottomText: {
    fontSize: 18,
    color: "#C4C4C4",
    fontFamily: FontFamily.semiBold,
  },

  dotsContainer: {
    flex: 1, // ✅ keeps dots truly centered between fixed left/right slots
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },

  nextWrap: {
    position: "relative",
    minWidth: 110, // ✅ extra guard against wrap
    alignItems: "flex-end",
  },
  nextText: {
    fontSize: 18,
    color: "#F83758",
    fontFamily: FontFamily.semiBold,
    textAlign: "right",
  },
  nextAbsolute: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default styles;