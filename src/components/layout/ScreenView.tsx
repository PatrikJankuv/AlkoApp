import React from "react";
import { SafeAreaView } from "react-native";
import { DEVICE_WIDTH } from "../../constants/layout";
/**
 * Render content within the safe area boundaries of a device.
 *
 * @returns {JSX.Element}
 */
const ScreenView = (props) => {
  const { children } = props;

  return (
    <SafeAreaView style={{ flex: 1, width: DEVICE_WIDTH }}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenView;
