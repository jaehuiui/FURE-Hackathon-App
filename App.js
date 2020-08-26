import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebaseConfig } from "./app/config/firebaseConfig";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Analytics from "expo-firebase-analytics";

import Intro from "./app/screens/Intro";
import SignIn from "./app/screens/SignIn";
import Mainpage from "./app/screens/Mainpage";
import Today from "./app/screens/Today";
import Future from "./app/screens/Future";
import Signup from "./app/screens/Signup";
import Start from "./app/screens/Start";
import Register_first from "./app/screens/Register_first";
import Register_second from "./app/screens/Register_second";
import Register_third from "./app/screens/Register_third";
import Register_fourth from "./app/screens/Register_fourth";
import Register_fifth from "./app/screens/Register_fifth";
import Register_final from "./app/screens/Register_final";
import Register_new1 from "./app/screens/Register_new1";

import Register_1 from "./app/screens/Register/Register_1";
import Register_2 from "./app/screens/Register/Register_2";
import Register_3 from "./app/screens/Register/Register_3";
import Register_4 from "./app/screens/Register/Register_4";
import Register_5 from "./app/screens/Register/Register_5";
import Register_6 from "./app/screens/Register/Register_6";
import Register_7 from "./app/screens/Register/Register_7";
import Register_8 from "./app/screens/Register/Register_8";

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName="Mainpage"
      tabBarOptions={{
        activeTintColor: "#0f4c75",
      }}
    >
      <Tab.Screen
        name="Mainpage"
        component={Mainpage}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Today"
        component={Today}
        options={{
          tabBarLabel: "Start",
        }}
      />
      <Tab.Screen
        name="Future"
        component={Future}
        options={{
          tabBarLabel: "Future",
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Register_first" component={Register_first} />
        <Stack.Screen name="Register_new1" component={Register_new1} />
        <Stack.Screen name="Register_second" component={Register_second} />
        <Stack.Screen name="Register_third" component={Register_third} />
        <Stack.Screen name="Register_fourth" component={Register_fourth} />
        <Stack.Screen name="Register_fifth" component={Register_fifth} />
        <Stack.Screen name="Register_final" component={Register_final} />
        <Stack.Screen name="Mainpage" component={MyTab} />
        <Stack.Screen name="Register_1" component={Register_1} />
        <Stack.Screen name="Register_2" component={Register_2} />
        <Stack.Screen name="Register_3" component={Register_3} />
        <Stack.Screen name="Register_4" component={Register_4} />
        <Stack.Screen name="Register_5" component={Register_5} />
        <Stack.Screen name="Register_6" component={Register_6} />
        <Stack.Screen name="Register_7" component={Register_7} />
        <Stack.Screen name="Register_8" component={Register_8} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
