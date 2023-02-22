import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export function LoginForm({ setEmail, setPassword, login }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    marginLeft: "20%",
    width: "60%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    width: "60%",
    marginLeft: "20%",
    padding: 10,
    margin: 10,
  },
  validation: {
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
  },
});
