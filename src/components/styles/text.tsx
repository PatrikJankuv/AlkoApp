import { StyleSheet } from "react-native";
import {
  FONT_SIZE_PRIMARY,
  FONT_REGULAR,
  FONT_BOLD,
} from "../../constants/font";
import { GRAY_600, TEAL_600, COOL_GRAY_400 } from "../../constants/colors";

export const Paragraph = StyleSheet.create({
  ParagraphDescription: {
    fontSize: FONT_SIZE_PRIMARY,
    fontFamily: FONT_REGULAR,
    fontWeight: "400",
    lineHeight: 24,
    textAlign: "center",
    color: GRAY_600,
  },
});

export const Links = StyleSheet.create({
  LinkButton: {
    fontSize: FONT_SIZE_PRIMARY,
    fontFamily: FONT_BOLD,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
    color: TEAL_600,
  },
  LinkButtonGray: {
    fontSize: FONT_SIZE_PRIMARY,
    fontFamily: FONT_BOLD,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
    color: COOL_GRAY_400,
    marginLeft: 16,
  },
  SkipLink: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
    color: COOL_GRAY_400,
  },
});
