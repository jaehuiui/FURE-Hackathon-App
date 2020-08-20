import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default class Mainpage extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.signup_button}
          onPress={() => {
            this.props.navigation.navigate("Signup");
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signup_button: {
    height: 50,
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
