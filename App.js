import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebaseConfig } from "./app/config/firebaseConfig";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import * as Analytics from "expo-firebase-analytics";

import Intro from "./app/screens/Intro";
import SignIn from "./app/screens/SignIn";
import Mainpage from "./app/screens/Mainpage";
import Signup from "./app/screens/Signup";

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

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
        <Stack.Screen name="Mainpage" component={Mainpage} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
