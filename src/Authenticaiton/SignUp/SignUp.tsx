import React from "react";

import { View, Image, Text, TouchableOpacity } from "react-native";
import ScreenView from "../../components/layout/ScreenView";
import { Containers } from "../../components/styles/containers";
import { Paragraph, Links } from "../../components/styles/text";
import { Titles } from "../../components/styles/titles";
import { Inputs } from "../../components/styles/inputs";
import DividerVertical from "../../components/layout/DividerVertical";
import { TextInput } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { Routes, StackNavigationProps } from "../../components/Navigation";

const emailValidator = (email: string) =>
  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);

const SignUp = ({ navigation }: StackNavigationProps<Routes, "SignUp">) => {
  const [email, setEmail] = React.useState("");
  const [repassword, setRepassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setUsername] = React.useState("");
  const [validationMessage, setMessage] = React.useState("");
  const [validForm, setValidForm] = React.useState(false);

  const signupRequest = async () => {
    fetch(global.url + "/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          setMessage("Můžeš se přihlásit");
          setValidForm(true);
        } else {
          setMessage("Vypadá to že tento email již někdo používá");
        }
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally();
  };

  const signup = async () => {
    if (emailValidator(email)) {
      if (password === repassword) {
        signupRequest();
      } else {
        setMessage("Hesla nejsou stejná");
      }
    } else {
      setMessage("Neplatný email");
    }
  };

  return (
    <ScreenView styles={Containers.ContainerCenterCenter}>
      <View style={Containers.ContainerCenterCenter}>
        <Text style={Titles.titlePrimary}>Zaregistruj se</Text>
        <DividerVertical space={30} />
        <Text style={Paragraph.ParagraphDescription}>
          Zaregistruj se pro přístup do aplikace!
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
          placeholder="Jméno"
          onChangeText={setUsername}
        />
        <DividerVertical space={16} />
        <TextInput
          style={Inputs.TextInput}
          placeholder="Heslo"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <DividerVertical space={16} />
        <TextInput
          style={Inputs.TextInput}
          placeholder="Zopakuj heslo"
          secureTextEntry={true}
          onChangeText={setRepassword}
        />
        <DividerVertical space={30} />
        {validForm ? (
          <Text style={Inputs.ValidForm}>{validationMessage}</Text>
        ) : (
          <Text style={Inputs.Validation}>{validationMessage}</Text>
        )}

        <DividerVertical space={30} />
        <TouchableOpacity>
          <Button title="Zaregistrovat se" variant="primary" onPress={signup} />
        </TouchableOpacity>
        <DividerVertical space={30} />
        <Text style={Paragraph.ParagraphDescription}>Již máš účet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={Links.LinkButton}>Přihlaš se do aplikace</Text>
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
};

export default SignUp;
