import { Keyboard } from "react-native";

export function withKeyboardDismiss<T extends any[]>(
  fn?: (...args: T) => void
) {
  return (...args: T) => {
    Keyboard.dismiss();
    fn?.(...args);
  };
}
