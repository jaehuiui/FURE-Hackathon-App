import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { firebaseConfig } from "./app/config/firebaseConfig";
import firebase from "firebase";
import "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import * as Analytics from "expo-firebase-analytics";

import Intro from "./app/screens/Intro/Intro";
import SignIn from "./app/screens/Intro/SignIn";

import Signup from "./app/screens/Intro/Signup";

import Home from "./app/screens/Main/Home";
import Today from "./app/screens/Main/Today";
import Future from "./app/screens/Main/Future";
import Running from "./app/screens/Main/Running";
import Setting from "./app/screens/Main/Setting";
import Loading from "./app/screens/Main/Loading";
import Loading_start from "./app/screens/Main/Loading_start";

import Register_1 from "./app/screens/Register/Register_1";
import Register_2 from "./app/screens/Register/Register_2";
import Register_3 from "./app/screens/Register/Register_3";
import Register_4 from "./app/screens/Register/Register_4";
import Register_5 from "./app/screens/Register/Register_5";
import Register_6 from "./app/screens/Register/Register_6";
import Register_7 from "./app/screens/Register/Register_7";
import Register_8 from "./app/screens/Register/Register_8";

import Test from "./app/screens/temp/Test";

console.disableYellowBox = true;

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
  const getTabBarVisible = (route) => {
    const params = route.params;
    if (params) {
      if (params.tabBarVisible === false) {
        return false;
      }
    }
    return true;
  };
  return (
    <Tab.Navigator
      initialRouteName="Mainpage"
      tabBarOptions={{
        activeTintColor: "#0f4c75",
        inactiveTintColor: "gray",
        showIcon: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              size={25}
              color={color}
              type="material-community"
            />
          ),
        })}
      />
      <Tab.Screen
        name="Today"
        component={Today}
        options={{
          tabBarLabel: "Today",
          tabBarIcon: ({ color }) => (
            <Icon
              name="calendar-check"
              size={25}
              color={color}
              type="material-community"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Future"
        component={Future}
        options={{
          tabBarLabel: "Future",
          tabBarIcon: ({ color }) => (
            <Icon
              name="progress-clock"
              size={25}
              color={color}
              type="material-community"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <Icon
              name="account-key"
              size={25}
              color={color}
              type="material-community"
            />
          ),
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
        <Stack.Screen name="Mainpage" component={MyTab} />

        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="Register_1" component={Register_1} />
        <Stack.Screen name="Register_2" component={Register_2} />
        <Stack.Screen name="Register_3" component={Register_3} />
        <Stack.Screen name="Register_4" component={Register_4} />
        <Stack.Screen name="Register_5" component={Register_5} />
        <Stack.Screen name="Register_6" component={Register_6} />
        <Stack.Screen name="Register_7" component={Register_7} />
        <Stack.Screen name="Register_8" component={Register_8} />

        <Stack.Screen name="Running" component={Running} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
