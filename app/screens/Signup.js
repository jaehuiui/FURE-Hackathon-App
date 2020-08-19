import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class Signup extends Component {
  render() {
    return (
      <View style={styles.testt}>
        <Text style={styles.test}> Sign Up Page </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  testt: {
    flex: 1,
    justifyContent: "center",
  },
  test: {
    alignContent: "center",
    textAlign: "center",
    fontSize: 30,
  },
});
