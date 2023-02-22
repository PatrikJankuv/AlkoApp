import React from "react";
import { View } from "react-native";

const DividerHorizontal = ({ space }) => {
  if (space === 0) return null;

  return <View style={{ height: "100%", width: space }} />;
};

export default DividerHorizontal;
