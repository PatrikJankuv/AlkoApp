import { StyleSheet } from "react-native";
import { ORANGE_50, TEAL_600, WHITE, YELLOW_600 } from "../../constants/colors";
import { FONT_BOLD, FONT_SIZE_BUTTON } from "../../constants/font";

export const Buttons = StyleSheet.create({
  Primary: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 330,
    borderRadius: 6,
  },
  ButtonText: {
    fontFamily: FONT_BOLD,
    textAlign: "center",
    fontWeight: "600",
    fontSize: FONT_SIZE_BUTTON,
    color: WHITE,
  },
  IncreaseDecreseButton: {
    color: WHITE,
    width: 40,
    height: 40,
    fontSize: 30,
    paddingTop: 2,
    paddingLeft: 12,
    fontWeight: "700",
    borderRadius: 6,
    margin: 16,
    backgroundColor: TEAL_600,
  },
  Counter: {
    backgroundColor: ORANGE_50,
    color: YELLOW_600,
    width: 60,
    height: 60,
    fontWeight: "700",
    margin: 16,
    paddingTop: 10,
    paddingLeft: 12,
    fontSize: 36,
  },
});
