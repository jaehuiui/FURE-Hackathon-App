import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import KeyboardSpacer from "react-native-keyboard-spacer";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "email",
      password: "password",
      error: "",
      loading: false,
      already: false,
      user: false,
      uid: "",
    };
    this.handleChangeemail = this.handleChangeemail.bind(this);
    this.handleChangepassword = this.handleChangepassword.bind(this);
  }

  OnLoginPress() {
    this.setState({
      error: "",
      loading: true,
    });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: "",
          loading: false,
        });
        this.props.navigation.navigate("Mainpage");
      })
      .catch((e) => {
        this.setState({
          error: e.message,
          loading: false,
        });
        if (e.code == "auth/user-not-found") {
          alert("회원정보가 없습니다!");
        } else {
          alert("입력 정보를 다시 확인해주세요!");
        }
      });

    /*if (this.state.user) {
      this.props.navigation.navigate("Mainpage");
    } else {
      this.props.navigation.navigate("Register_1");
    }*/
  }

  handleChangeemail(newText) {
    this.setState({
      email: newText,
    });
  }
  handleChangepassword(newText) {
    this.setState({
      password: newText,
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.background}>
          <ScrollView
            scrollEnabled={true}
            contentContainerStyle={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.Theme}>
              <Image
                source={require("../../images/logo.png")}
                style={styles.logo}
              ></Image>
            </View>
            <View style={styles.form}>
              <Text style={styles.inputinfo}>User Email</Text>
              <View style={styles.input_box}>
                <TextInput
                  style={styles.input_text}
                  autoCompleteType="email"
                  placeholder="fure@gmail.com"
                  onChangeText={this.handleChangeemail}
                  keyboardType={"email-address"}
                ></TextInput>
              </View>
              <Text style={styles.inputinfo}>Password</Text>
              <View style={styles.input_box}>
                <TextInput
                  style={styles.input_text}
                  secureTextEntry
                  placeholder="********"
                  onChangeText={this.handleChangepassword}
                ></TextInput>
              </View>
            </View>

            <View style={styles.bottom_layer1}>
              <TouchableOpacity
                onPress={() => {
                  this.OnLoginPress();
                }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#f5f7fa", "#c3cfe2"]}
                  style={styles.signin_button}
                >
                  <Text style={styles.signin}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <KeyboardSpacer topSpacing={RFValue(-100, 812)} />
            <View style={styles.bottom_layer2}>
              <View style={styles.signup}>
                <Text>Don't have account? </Text>
                <TouchableOpacity
                  style={styles.signup_button}
                  onPress={() => {
                    this.props.navigation.navigate("Signup");
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  //layer level 1
  background: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },

  //layer level 2
  Theme: {
    flex: 3,
    justifyContent: "center",
  },
  form: {
    flex: 2.5,
    justifyContent: "center",
    //top: 0,
    //position: "absolute",
  },

  bottom_layer1: {
    flex: 1.5,
    justifyContent: "center",
    //top: 0,
    //position: "absolute",
  },
  bottom_layer2: {
    flex: 1,
    justifyContent: "center",
    //top: 0,
    //position: "absolute",
  },

  //layer level 3

  //level 3 - Theme

  //level 3 - Form
  logo: {
    alignSelf: "center",
    top: RFValue(50, 812),
    height: RFValue(180, 812),
    aspectRatio: 1,
    marginBottom: RFValue(30, 812),
  },

  inputinfo: {
    color: "gray",
    marginLeft: 25,
    fontSize: 15,
  },

  input_box: {
    fontSize: RFValue(15, 812),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#fdfbfb",
    marginVertical: RFValue(5, 812),
    marginHorizontal: 20,
    alignSelf: "stretch",
    marginBottom: RFValue(30, 812),
  },

  input_text: {
    marginVertical: 5,
    marginRight: 5,
    height: 50,
    color: "black",
    borderRadius: 4,

    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },

  //level 3 - bottom layer

  signup: {
    flexDirection: "row",
    //position: "absolute",
    bottom: RFValue(30, 812),
    alignSelf: "center",
  },

  signin: {
    fontSize: 20,
    color: "white",
  },

  signin_button: {
    borderWidth: 0.5,
    borderColor: "gray",
    height: 50,

    marginHorizontal: 40,

    borderRadius: 25,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },

  signup_button: {
    height: 50,
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
