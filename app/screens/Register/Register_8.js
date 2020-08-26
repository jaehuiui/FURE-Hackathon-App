import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.username,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            type="material-community"
            style={styles.backicon}
            onPress={() => {
              this.props.navigation.navigate("Register_7");
            }}
          />
        </View>
        <View style={styles.top}>
          <View style={styles.textbox}>
            <Text style={styles.title}>
              FU:RE가 제안하는{"\n"}
              {this.state.name}님의 운동 계획입니다.
            </Text>
          </View>
        </View>
        <View style={styles.middle}></View>
        <View style={styles.bottom}>
          <Text style={styles.title}>
            FU:RE 가 {this.state.name}님과 함께할게요!
          </Text>
        </View>
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
    flex: 1.5,
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
  textbox: {
    borderColor: "#e1f2fb",
    borderWidth: 3,
    borderRadius: 20,
    height: "80%",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
  title: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(23, 812),
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
