import "react-native-gesture-handler";
import * as React from "react";
import * as Font from "expo-font";
import LoadAssets from "./src/components/LoadAssets";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticationNavigation } from "./src/Authenticaiton/index";
import HomeScreen from "./screens/Home";
import ProgressScreen from "./screens/Progress";
import SchedulerScreen from "./screens/SchedulerScreen";
import StatsScreen from "./screens/Stats";
import ProfileScreen from "./screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Foundation } from "@expo/vector-icons";
import {
  COOL_GRAY_500,
  TEAL_600,
  GRAY_200,
  WHITE,
} from "./src/constants/colors";
import { FONT_BOLD } from "./src/constants/font";

const fonts = {
  "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
  "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
  "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
  "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
  "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
};

const logedIn = false;

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Domů" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const ProgressStack = createStackNavigator();
function ProgressStackScreen() {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen name="Progress" component={ProgressScreen} />
    </ProgressStack.Navigator>
  );
}

const SchedulerStack = createStackNavigator();
function SchedulerStackScreen() {
  return (
    <SchedulerStack.Navigator>
      <SchedulerStack.Screen name="Scheduler" component={SchedulerScreen} />
    </SchedulerStack.Navigator>
  );
}

const StatsStack = createStackNavigator();
function StatsStackScreen() {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen name="Stats" component={StatsScreen} />
    </StatsStack.Navigator>
  );
}

const RestStack = createStackNavigator();
function RestStackScreen() {
  return (
    <RestStack.Navigator>
      <RestStack.Screen name="Profile" component={ProfileScreen} />
    </RestStack.Navigator>
  );
}

export default function App() {
  const [isLogin, setLogin] = React.useState(true);

  React.useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const jwtToken = await AsyncStorage.getItem("@jwt_token");
    console.log(jwtToken);
    if (jwtToken === null || jwtToken === "null") {
      console.log("false");
      setLogin(true);
    } else {
      console.log("true");
      setLogin(false);
    }
  };

  return isLogin ? (
    <LoadAssets {...{ fonts }}>
      <AuthenticationNavigation />
    </LoadAssets>
  ) : (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: TEAL_600,
          inactiveTintColor: COOL_GRAY_500,
          style: {
            borderTopColor: GRAY_200,
            backgroundColor: WHITE,
          },
          labelStyle: {
            fontSize: 14,
            fontFamily: FONT_BOLD,
            fontWeight: "600",
            margin: 0,
            padding: 0,
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: "Domů",
            tabBarIcon: ({ color, size }) => (
              <Foundation name="home" size={24} color={color} />
            ),
          }}
          name="Domů"
          component={HomeStackScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Plánovač",
            tabBarIcon: ({ color, size }) => (
              <Foundation name="calendar" size={24} color={color} />
            ),
          }}
          name="Plánovač"
          component={SchedulerStackScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Statistika",
            tabBarIcon: ({ color, size }) => (
              <Foundation name="graph-bar" size={24} color={color} />
            ),
          }}
          name="Statistika"
          component={StatsStackScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Foundation name="torso" size={24} color={color} />
            ),
          }}
          name="Profile"
          component={RestStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/**
 * This function is called asynchronously to load the resources.
 *
 * @returns {Promise<void>}
 * @private
 */
const _loadResourcesAsync = async () => {
  await Promise.all([
    Font.loadAsync({
      "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
      "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
      "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
      "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
      "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
      "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
      "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
      "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
    }),
  ]);
};
