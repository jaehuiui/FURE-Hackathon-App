import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
    };
  }

  onPressReset() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        reset_status: true,
      })
      .then(() => {
        this.props.navigation.navigate("Register_2", {
          username: this.state.name,
          uid: this.state.uid,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.top}></View>
        <View style={styles.middle}></View>
        <View style={styles.bottom}></View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              this.onPressReset();
            }}
          >
            <LinearGradient
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              colors={["#303966", "#c3cfe2"]}
              style={styles.next_button}
            >
              <Text style={styles.button_text}>PLAN 다시 세우기</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  header: {},
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

  //footer
  footer: {
    flex: 2,
  },
  button_text: {
    fontSize: 20,
    color: "white",
  },
  next_button: {
    borderWidth: 0.5,
    borderColor: "gray",
    height: 50,
    marginTop: 15,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 25,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
});
