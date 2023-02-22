import React from "react";
import { View, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenView from "../../components/layout/ScreenView";
import { Titles } from "../../components/styles/titles";
import { Paragraph } from "../../components/styles/text";
import Slide from "../Onboarding/Slide";
import { IMG_ONBOARDING_D } from "../../constants/images";
import { DEVICE_WIDTH } from "../../constants/layout";
import DividerVertical from "../../components/layout/DividerVertical";
import { Containers } from "../../components/styles/containers";
import Button from "../../components/Button";
import { Routes, StackNavigationProps } from "../../components/Navigation";

const Welcome = ({ navigation }: StackNavigationProps<Routes, "Welcome">) => {
  return (
    <ScreenView styles={Containers.ContainerCenterCenter}>
      <View style={Containers.ContainerCenterCenter}>
        <Image source={IMG_ONBOARDING_D} width={380} />
        <DividerVertical space={70} />
        <Text style={Titles.titlePrimary}>Začínáme!</Text>
        <DividerVertical space={30} />
        <Text style={Paragraph.ParagraphDescription}>
          Začni přihlášením. Pokud ještě nemáš účet, může se hned zaregistrovat!
        </Text>
        <DividerVertical space={50} />
        <Button
          title="Přihlásit se"
          variant="primary"
          onPress={() => navigation.navigate("Login")}
        />
        <DividerVertical space={16} />
        <Button
          title="Zaregistrovat se"
          variant="secondary"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </ScreenView>
  );
};

export default Welcome;
