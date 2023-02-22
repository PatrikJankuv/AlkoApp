import { StyleSheet } from "react-native";

export const Containers = StyleSheet.create({
  ContainerCenter: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 24,
  },
  ContainerCenterCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ContainerAlignLeft: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 5,
    marginRight: 5,
  },
  ContainerHomeButtons: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
