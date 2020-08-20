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
import Register_first from "./app/screens/Register_first";
import Register_second from "./app/screens/Register_second";
import Register_third from "./app/screens/Register_third";

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
        <Stack.Screen name="Register_first" component={Register_first} />
        <Stack.Screen name="Register_second" component={Register_second} />
        <Stack.Screen name="Register_third" component={Register_third} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
