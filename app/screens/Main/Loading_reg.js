import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <Image
            source={require("../../images/new_logo.png")}
            style={styles.logo_load}
          ></Image>
        </View>
        <View style={styles.lower}>
          <Text style={styles.loading}>
            회원님을 위한 3개의 플랜을 생성 중입니다.{"\n"}잠시만 기다려주세요
          </Text>
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

  upper: {
    flex: 5,
    justifyContent: "center",
  },
  lower: {
    flex: 3,
    justifyContent: "center",
  },
  loading: {
    fontSize: RFValue(20, 812),
    textAlign: "center",
  },

  logo_load: {
    alignSelf: "center",
    transform: [{ scale: 0.6 }],
    resizeMode: "center",
    aspectRatio: 1,
  },
});
