import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export default class Register_second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      height: null,
      weight: null,
      age: null,
      purpose: "",
      name: "",
      uid: "",
    };
  }
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        var user = firebase.auth().currentUser;
        if (user != null) {
          firebase
            .firestore()
            .collection("users")
            .doc("App")
            .collection("info")
            .doc(user.uid)
            .onSnapshot((doc) => {
              var name_test = doc.data().name;
              console.log(name_test);
              this.setState({
                name: name_test,
                uid: user.uid,
              });
            });
        }
      }
    );
  }

  handleChange_opt1() {
    this.setState({
      purpose: "opt1",
    });
  }
  handleChange_opt2() {
    this.setState({
      purpose: "opt2",
    });
  }
  handleChange_opt3() {
    this.setState({
      purpose: "opt3",
    });
  }
  handleChange_opt4() {
    this.setState({
      purpose: "opt4",
    });
  }

  OnInsertPress() {
    const data = firebase.firestore();
    data
      .collection("users")
      .doc(this.state.uid)
      .update({
        purpose: this.state.purpose,
      })
      .then(() => {
        this.props.navigation.navigate("Register_second");
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
            <View style={styles.textbox}>
              <Text style={styles.middletext}>
                {this.state.name} 님, 반갑습니다.{"\n"}
                {this.state.name} 님의 러닝 목적은 무엇인가요?
              </Text>
            </View>
            <Text style={styles.title}></Text>
          </View>
          <View style={styles.middlelayer}>
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
          <View style={styles.bottomlayer}>
            <Image
              source={require("../images/logo.png")}
              style={styles.logo}
            ></Image>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  toplayer: {
    flex: 2,
    justifyContent: "center",
  },
  middlelayer: {
    flex: 4,
    justifyContent: "center",
  },
  bottomlayer: {
    flex: 2,
    justifyContent: "center",
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

  title: {
    fontSize: RFValue(25, 812),
    lineHeight: RFValue(40, 812),
    textAlign: "center",
  },
  inputinfo: {
    marginVertical: RFValue(20, 812),
    flexDirection: "row",
    justifyContent: "center",
  },
  question: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(20, 812),
    fontWeight: "bold",
  },

  inputbox: {
    borderColor: "gray",
    borderBottomWidth: 1,
    width: RFValue(150, 812),
    marginHorizontal: RFValue(20, 812),
    fontSize: RFValue(20, 812),
    textAlign: "center",
  },
  selecttext: {
    marginTop: RFValue(70, 812),
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f4c75",
  },
  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.3 }],
    resizeMode: "center",
    aspectRatio: 1,
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
});
