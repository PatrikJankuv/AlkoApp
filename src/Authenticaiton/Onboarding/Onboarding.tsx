import React, { useRef } from "react";
import { Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenView from "../../components/layout/ScreenView";
import Slide from "./Slide";
import {
  IMG_ONBOARDING_A,
  IMG_ONBOARDING_B,
  IMG_ONBOARDING_C,
} from "../../constants/images";
import { DEVICE_WIDTH } from "../../constants/layout";
import { Containers } from "../../components/styles/containers";
import { Routes, StackNavigationProps } from "../../components/Navigation";

const slides = [
  {
    title: "Vítej v AlkoApp!",
    description:
      "Užívání alkoholu může mít vliv na Tvé zdraví, proto Ti touto aplikací chceme pomoct dostat své pití alkoholu pod kontrolu, ale přitom nemusíš nutně abstinovat.",
    url: IMG_ONBOARDING_A,
  },
  {
    title: "Vše potřebné máš v ruce",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec quis nibh at felis congue commodo. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.",
    url: IMG_ONBOARDING_B,
  },
  {
    title: "Šité na míru",
    description:
      "Zkus s AlkoApp plánovat, kdy a kolik pít a naopak, kdy nepít. Zapisuj si čárky na vlastní nápojový lístek. Sleduj své uživatelské zvyky, nálady a pocity a co spouští Tvou chuť na alkohol.",
    url: IMG_ONBOARDING_C,
  },
];

const Onboarding = ({
  navigation,
}: StackNavigationProps<Routes, "Onboarding">) => {
  const scroll = useRef<ScrollView>(null);
  return (
    <ScreenView styles={Containers.ContainerCenterCenter}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        horizontal
        snapToInterval={DEVICE_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        ref={scroll}
      >
        {slides.map(({ title, description, url }, index) => {
          const last = index === slides.length - 1;
          return (
            <Slide
              key={index}
              last={index === slides.length - 1}
              {...{ title, description, url }}
              onPress={() => {
                if (last) {
                  navigation.navigate("Welcome");
                } else if (scroll.current) {
                  scroll.current.scrollTo({
                    x: DEVICE_WIDTH * (index + 1),
                    animated: true,
                  });
                }
              }}
            />
          );
        })}
      </ScrollView>
    </ScreenView>
  );
};

export default Onboarding;
