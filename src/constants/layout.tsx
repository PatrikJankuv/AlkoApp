import { Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const DEVICE_WIDTH = screenWidth;

export const DEVICE_HEIGHT =
  Platform.OS === "ios"
    ? screenHeight - (getStatusBarHeight() + 20)
    : screenHeight;

export const NAVIGATION_BAR_HEIGHT = 70;
export const ONBOARDING_HEADER_HEIGHT = 90;

export const CONTENT_WIDTH = DEVICE_WIDTH - 70;
export const CONTENT_WIDTH_NOTIFICATIONS = DEVICE_WIDTH - 50;
