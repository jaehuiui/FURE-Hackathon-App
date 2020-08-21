import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Keyboard,
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
      name: "",
      uid: "",
      numperweek: null,
      timepernum: null,
    };
    this.handleChange_npw = this.handleChange_npw.bind(this);
    this.handleChange_tpn = this.handleChange_tpn.bind(this);
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
  handleChange_tpn(newText) {
    this.setState({
      timepernum: newText,
    });
  }
  handleChange_npw(newText) {
    this.setState({
      numperweek: newText,
    });
  }

  OnInsertPress() {
    const data = firebase.firestore();
    data
      .collection("users")
      .doc(this.state.uid)
      .update({
        timepernum: this.state.timepernum,
        numperweek: this.state.numperweek,
      })
      .then(() => {
        this.props.navigation.navigate("Register_final");
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
            <Text style={styles.title}>
              {this.state.name} 님{"\n"}
              운동에 얼마나 시간을 내실 수 있나요?
            </Text>
          </View>
          <View style={styles.middlelayer}>
            <View style={styles.inputinfo}>
              <TextInput
                style={styles.inputbox}
                placeholder=""
                onChangeText={this.handleChange_npw}
              ></TextInput>
              <Text style={styles.question}> : 회 / 일주일 </Text>
            </View>
            <View style={styles.inputinfo}>
              <TextInput
                style={styles.inputbox}
                placeholder=""
                onChangeText={this.handleChange_tpn}
              ></TextInput>
              <Text style={styles.question}> : 시간 / 회당 </Text>
            </View>

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
});
