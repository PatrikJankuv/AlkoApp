import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  DevSettings,
  Alert,
} from "react-native";
import "../Global.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginForm } from "./Components/LoginForm";
import { ProfileDetails } from "./Components/ProfileDetail";
import * as MediaLibrary from "expo-media-library";
import { openConnection, truncateAllTables } from "../Database";

const db = openConnection();

export default function ProfileScreen() {
  const [jwtToken, setToken] = React.useState("null");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState({
    profile: { name: null, age: null, weight: null, height: null },
  });

  React.useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const jwtToken = await AsyncStorage.getItem("@jwt_token");

    if (jwtToken === null || jwtToken === "null") {
      setToken("null");
    } else {
      setToken("1");
    }
    getUser();
  };

  const login = () => {
    fetch(global.url + "/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: jwtToken,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        storeToken(json), setToken("1");
      })
      .catch((error) => console.error(error))
      .finally();

    getUser();
  };

  const getUser = () => {
    fetch(global.url + "/user/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwtToken,
      },
    })
      .then((response) => response.json())
      .then((json) => setUser(json))
      .catch((error) => console.error(error))
      .finally();
  };

  const storeToken = async (data) => {
    try {
      await AsyncStorage.setItem(
        "@jwt_token",
        data.tokenType + " " + data.accessToken
      );
    } catch (e) {
      console.log("invalid token");
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.setItem("@jwt_token", "null");
      setToken("null");
      DevSettings.reload();
      truncateAllTables(db);
    } catch (e) {
      console.log("error");
    }
  };

  return (
    <View>
      {/* <ProfileDetails logout={logout}></ProfileDetails> */}
      {jwtToken === "null" ? (
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          login={login}
        ></LoginForm>
      ) : (
        <ProfileDetails logout={logout}></ProfileDetails>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: 150,
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  validation: {
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
  },
});
