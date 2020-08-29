import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class count3 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.count}> 3 </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  count: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
  },
});
