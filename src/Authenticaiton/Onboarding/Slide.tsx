import React from "react";
import { Text, Image, ImageProps, View, TouchableOpacity } from "react-native";
import { Titles } from "../../components/styles/titles";
import { Links, Paragraph } from "../../components/styles/text";
import { Containers } from "../../components/styles/containers";
import DividerVertical from "../../components/layout/DividerVertical";
import ScreenView from "../../components/layout/ScreenView";
import Button from "../../components/Button";
import { Routes, StackNavigationProps } from "../../components/Navigation";

interface SlideProps {
  title: string;
  description: string;
  url: ImageProps["source"];
  last?: boolean;
  onPress: () => void;
}

const Slide = (
  { title, description, url, last, onPress }: SlideProps,
  { navigation }: StackNavigationProps<Routes, "Slide">
) => {
  return (
    <ScreenView>
      <View style={Containers.ContainerCenter}>
        <DividerVertical space={70} />
        <Image source={url} width={380} />
        <DividerVertical space={70} />
        <Text style={Titles.titlePrimary}>{title}</Text>
        <DividerVertical space={30} />
        <Text style={Paragraph.ParagraphDescription}>{description}</Text>
        <DividerVertical space={50} />
        <Button
          title={last ? "Pojďme na to" : "Pokračovat"}
          variant={last ? "primary" : "default"}
          {...{ onPress }}
        />
        <DividerVertical space={10} />
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <Text style={Links.SkipLink}>Přeskočit</Text>
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
};

export default Slide;
