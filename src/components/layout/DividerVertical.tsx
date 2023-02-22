import React from "react";
import { View } from "react-native";

const DividerVertical = ({ space, color = "transparent" }) => {
  if (space === 0) return null;

  return (
    <View style={{ height: space, width: "100%", backgroundColor: color }} />
  );
};

export default DividerVertical;
