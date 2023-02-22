import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  DevSettings,
  Alert,
} from "react-native";
import Button from "../../components/Button";
import ScreenView from "../../components/layout/ScreenView";
import { Containers } from "../../components/styles/containers";
import { Paragraph, Links } from "../../components/styles/text";
import { Titles } from "../../components/styles/titles";
import { Inputs } from "../../components/styles/inputs";
import DividerVertical from "../../components/layout/DividerVertical";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../../../Global.js";
import { Routes, StackNavigationProps } from "../../components/Navigation";
import App from "../../../App";

const emailValidator = (email: string) =>
  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);

const Login = ({ navigation }: StackNavigationProps<Routes, "Login">) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validationMessage, setMessage] = React.useState("");

  const login = async () => {
    const jwtToken = await AsyncStorage.getItem("@jwt_token");
    console.log(jwtToken);

    fetch(global.url + "/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        storeToken(json);
      })
      .catch((error) => console.error(error))
      .finally();
  };

  const storeToken = async (data) => {
    console.log(data);

    if (data.status === 401) {
      await AsyncStorage.setItem("@jwt_token", "");
      setMessage("Neplatný email nebo heslo.");
    } else {
      try {
        await AsyncStorage.setItem(
          "@jwt_token",
          data.tokenType + " " + data.accessToken
        );
        DevSettings.reload();
      } catch (e) {
        console.log("invalid token");
      }
    }
  };

  return (
    <ScreenView styles={Containers.ContainerCenterCenter}>
      <View style={Containers.ContainerCenterCenter}>
        <Text style={Titles.titlePrimary}>Vítej zpět</Text>
        <DividerVertical space={30} />
        <Text style={Paragraph.ParagraphDescription}>
          Začni přihlášením.{"\n"} Pokud ještě nemáš účet, může se hned
          zaregistrovat!
        </Text>
        <DividerVertical space={60} />
        <TextInput
          style={Inputs.TextInput}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <DividerVertical space={16} />
        <TextInput
          style={Inputs.TextInput}
          placeholder="Heslo"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <DividerVertical space={30} />
        <Text style={Inputs.Validation}>{validationMessage}</Text>
        <DividerVertical space={30} />
        <TouchableOpacity>
          <Button title="Přihlásit se" onPress={login} variant="primary" />
        </TouchableOpacity>
        <DividerVertical space={30} />
        <Text style={Paragraph.ParagraphDescription}>Nemáš účet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={Links.LinkButton}>Zaregistruj se zde</Text>
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
};

export default Login;
