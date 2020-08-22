import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class Future extends Component {
  render() {
    return (
      <View style={styles.jaehee}>
        <Text style={styles.text}> Hi Hi </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  jaehee: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "blue",
  },
});
