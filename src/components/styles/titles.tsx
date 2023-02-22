import { StyleSheet } from "react-native";
import { TITLE_PRIMARY, FONT_BOLD } from "../../constants/font";
import { TEAL_600 } from "../../constants/colors";

export const Titles = StyleSheet.create({
  titlePrimary: {
    fontSize: TITLE_PRIMARY,
    fontFamily: FONT_BOLD,
    fontWeight: "600",
    lineHeight: 36,
    textAlign: "center",
    color: TEAL_600,
  },
});
