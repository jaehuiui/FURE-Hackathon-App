import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export default class Register_first extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uid: "",
    };
    this.handleChangename = this.handleChangename.bind(this);
  }

  handleChangename(newText) {
    const user = firebase.auth().currentUser;
    this.setState({
      name: newText,
      uid: user.uid,
    });
    console.log(this.state.name);
    console.log(this.state.uid);
  }

  OnInsertPress() {
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(this.state.uid)
      .set({
        name: this.state.name,
      })
      .then(() => {
        this.props.navigation.navigate("Register_new1");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.25 }}
          colors={["#bbe1fa", "white"]}
          style={styles.container}
        >
          <View style={styles.toplayer}>
            <Image
              source={require("../images/logo.png")}
              style={styles.logo}
            ></Image>
          </View>
          <View style={styles.middlelayer1}>
            <View style={styles.textbox}>
              <Text style={styles.middletext}>
                {" "}
                안녕하세요!{"\n"}당신의 AI 러닝 코치{"\n"}
                FU:RE입니다.
              </Text>
            </View>
          </View>
          <View style={styles.middlelayer2}>
            <View style={styles.input}>
              <Text style={styles.namequestion}> 당신의 닉네임은?</Text>
              <TextInput
                style={styles.nameinput}
                placeholder=""
                onChangeText={this.handleChangename}
              ></TextInput>
            </View>
          </View>
          <View style={styles.bottomlayer}>
            <Text
              style={styles.selecttext}
              onPress={() => {
                this.OnInsertPress();
              }}
            >
              {" "}
              입력{" "}
            </Text>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  //layer 1
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },

  //layer 2
  toplayer: {
    flex: 2,
    justifyContent: "center",
  },
  middlelayer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  middlelayer2: {
    flex: 3,
    justifyContent: "center",
  },
  bottomlayer: {
    flex: 2,
    justifyContent: "center",
  },

  //layer 3
  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.3 }],
    resizeMode: "center",
    aspectRatio: 1,
    top: RFValue(50, 812),
  },
  textbox: {
    borderColor: "#e1f2fb",
    borderWidth: 3,
    borderRadius: 20,
    height: RFValue(100, 812),
    justifyContent: "center",
    width: "90%",
  },

  middletext: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },
  namequestion: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(20, 812),
    fontWeight: "bold",
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
  },
  nameinput: {
    borderColor: "gray",
    borderBottomWidth: 1,
    width: RFValue(100, 812),
    marginHorizontal: RFValue(20, 812),
    fontSize: RFValue(20, 812),
    textAlign: "center",
  },

  selecttext: {
    textAlign: "center",
    fontSize: 20,
    color: "#0f4c75",
    fontWeight: "bold",
  },
});
