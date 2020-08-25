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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
