export { default as Onboarding } from "./Onboarding";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "../components/Navigation";
import Onboarding from "../Authenticaiton/Onboarding/Onboarding";
import Welcome from "./Welcome/Welcome";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Slide from "./Onboarding/Slide";

const AuthenticationStack = createStackNavigator<Routes>();
export const AuthenticationNavigation = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen name="Slide" component={Slide} />
    </AuthenticationStack.Navigator>
  );
};
