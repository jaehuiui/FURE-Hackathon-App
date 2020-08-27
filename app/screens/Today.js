import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.top}></View>
        <View style={styles.middle}></View>
        <View style={styles.bottom}></View>
        <View style={styles.footer}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  top: {
    flex: 3.5,
    justifyContent: "center",
  },
  middle: {
    flex: 8.5,
  },
  bottom: {
    flex: 3.5,
  },
  footer: {
    flex: 1,
  },
});
