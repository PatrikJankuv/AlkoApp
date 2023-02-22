import { StyleSheet } from "react-native";
import { FONT_SIZE_PRIMARY, FONT_REGULAR } from "../../constants/font";
import {
  COOL_GRAY_400,
  COOL_GRAY_200,
  WHITE,
  GRAY_700,
  COOL_GRAY_500,
} from "../../constants/colors";
import { color } from "react-native-reanimated";

export const Inputs = StyleSheet.create({
  TextInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    fontWeight: "400",
    lineHeight: 20,
    borderColor: COOL_GRAY_200,
    color: COOL_GRAY_400,
    borderWidth: 1,
  },
  TextInputCons: {
    height: 38,
    width: 326,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: WHITE,
    borderColor: COOL_GRAY_200,
    color: COOL_GRAY_500,
  },
  InputTitle: {
    textAlign: "left",
    color: GRAY_700,
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_REGULAR,
  },
  Validation: {
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
  },
  ValidForm: {
    color: "#00AF29",
    fontWeight: "bold",
    textAlign: "center",
  },
});
