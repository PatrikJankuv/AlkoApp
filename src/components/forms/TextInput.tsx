import React, { useState } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import ScreenView from "../layout/ScreenView";
import {Inputs} from "../styles/inputs";

interface TextInputProps {
  placeholder: string;
  icon: string;
  validator: (input: string) => boolean;
}

const Valid = true;
const Invalid = false;
const Pristine = null;
type InputState = typeof Valid | typeof Invalid | typeof Pristine;

const TextInput = ({ icon }: TextInputProps) => {
  const [state, setState] = useState<InputState>(Pristine);
  return (
    <ScreenView>
      <View>
        <Icon name={icon} />
        <RNTextInput underlineColorAndroid="transparent" />
        {(state === Valid || state === Invalid) && (
          <View style={Inputs.TextInput}>
            <Icon name={state === Valid? "check" | "x"} />
          </View>
        )}
      </View>
    </ScreenView>
  );
};

export default TextInput;
