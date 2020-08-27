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
      })
      .catch((e) => {
        this.setState({
          error: e.message,
          loading: false,
        });
        if (e.code == "auth/user-not-found") {
          alert("User not found, Create new account");
        } else {
          alert(e.message);
        }
      });

    this.props.navigation.navigate("Mainpage");
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
      /*<KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        enabled={true}
      > */
      <View style={styles.background}>
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

        <View style={styles.bottom_layer}>
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
      </View>
      //</KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  //layer level 1
  background: {
    flex: 1,
    backgroundColor: "white",
  },

  //layer level 2
  Theme: {
    paddingTop: RFValue(50, 812),
    top: RFValue(80, 812),

    flex: 2.5,
    justifyContent: "center",
    //position: "absolute",
  },
  form: {
    flex: 2,

    //top: 0,
    //position: "absolute",
  },

  bottom_layer: {
    flex: 3,

    //top: 0,
    //position: "absolute",
  },

  //layer level 3

  //level 3 - Theme

  //level 3 - Form
  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.3 }],
    resizeMode: "center",
    aspectRatio: 1,
  },

  inputinfo: {
    color: "gray",
    marginLeft: 25,
    fontSize: 15,
  },

  input_box: {
    flex: 1,
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#fdfbfb",
    marginVertical: 5,
    marginHorizontal: 20,
    alignSelf: "stretch",
    marginBottom: 30,
  },

  input_text: {
    flex: 6,
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
    bottom: 0,
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

    marginTop: 15,
    marginHorizontal: 40,
    marginBottom: 30,
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
