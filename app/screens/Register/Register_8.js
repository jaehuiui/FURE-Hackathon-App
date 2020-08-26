import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

export default class Register_1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            type="material-community"
            style={styles.backicon}
          />
        </View>
        <View style={styles.top}></View>
        <View style={styles.middle}></View>
        <View style={styles.bottom}></View>
        <View style={styles.footer}>
          <Image
            source={require("../../images/logo_new.png")}
            style={styles.logo}
          ></Image>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  // header
  header: {
    flex: 1,
    justifyContent: "center",
  },

  backicon: {
    alignSelf: "flex-start",
    left: 30,
  },

  top: {
    flex: 2,
    justifyContent: "center",
  },

  middle: {
    flex: 5.5,
  },

  bottom: {
    flex: 1.5,
  },

  // footer
  footer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    height: "100%",
    aspectRatio: 1,
  },
});
