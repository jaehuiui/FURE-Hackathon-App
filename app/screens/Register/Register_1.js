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
import { Icon } from "react-native-elements";

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userid: "",
    };
    this.handleChangename = this.handleChangename.bind(this);
  }

  handleChangename(newText) {
    const user = firebase.auth().currentUser;
    this.setState({
      name: newText,
      userid: user.uid,
    });
  }

  OnInsertPress() {
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(this.state.userid)
      .set({
        name: this.state.name,
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon
              name="arrow-left"
              size={30}
              type="material-community"
              style={styles.backicon}
              onPress={() => {
                this.props.navigation.navigate("SignIn");
              }}
            />
          </View>
          <View style={styles.top}>
            <View style={styles.textbox}>
              <Text style={styles.title}>
                {" "}
                안녕하세요!{"\n"}당신의 AI 러닝 코치{"\n"}
                FU:RE입니다.
              </Text>
            </View>
          </View>
          <View style={styles.middle}>
            <Text style={styles.ask_name}>
              {" "}
              당신의 닉네임을 정해주세요.{"\n"}
              {"\n"}
            </Text>
            <TextInput
              style={styles.nameinput}
              placeholder=""
              onChangeText={this.handleChangename}
              onSubmitEditing={Keyboard.dismiss}
            ></TextInput>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => {
                this.OnInsertPress();
              }}
            >
              <LinearGradient
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#303966", "#c3cfe2"]}
                style={styles.next_button}
              >
                <Text style={styles.button_text}>다음</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Image
              source={require("../../images/logo_new.png")}
              style={styles.logo}
            ></Image>
          </View>
        </View>
      </TouchableWithoutFeedback>
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

  //top
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

  //middle
  middle: {
    flex: 5.5,
    justifyContent: "center",
    paddingBottom: 0,
  },
  ask_name: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
    bottom: RFValue(30, 812),
  },
  nameinput: {
    borderColor: "gray",
    borderBottomWidth: 1,
    width: RFValue(200, 812),
    marginHorizontal: RFValue(20, 812),
    fontSize: RFValue(25, 812),
    bottom: RFValue(30, 812),
    textAlign: "center",
    alignSelf: "center",
  },

  //bottom
  bottom: {
    flex: 1.5,
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
