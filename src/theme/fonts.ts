import { useFonts } from "expo-font";

export const useAppFonts = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("../../assets/Fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Medium": require("../../assets/Fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../../assets/Fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../../assets/Fonts/Montserrat-SemiBold.ttf"),
  });

  return fontsLoaded;
};
