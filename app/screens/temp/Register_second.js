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
      gender: "",
      height: null,
      weight: null,
      age: null,
    };
    this.handleChange_gender = this.handleChange_gender.bind(this);
    this.handleChange_height = this.handleChange_height.bind(this);
    this.handleChange_weight = this.handleChange_weight.bind(this);
    this.handleChange_age = this.handleChange_age.bind(this);
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
  handleChange_gender(newText) {
    this.setState({
      gender: newText,
    });
  }
  handleChange_height(newText) {
    this.setState({
      height: newText,
    });
  }
  handleChange_weight(newText) {
    this.setState({
      weight: newText,
    });
  }
  handleChange_age(newText) {
    this.setState({
      age: newText,
    });
  }

  OnInsertPress() {
    const data = firebase.firestore();
    data
      .collection("users")
      .doc(this.state.uid)
      .update({
        gender: this.state.gender,
        height: this.state.height,
        weight: this.state.weight,
        age: this.state.age,
      })
      .then(() => {
        this.props.navigation.navigate("Register_third");
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
              {this.state.name} 님, 반갑습니다.{"\n"}
              {this.state.name} 님에 대해 알아볼까요?
            </Text>
          </View>
          <View style={styles.middlelayer}>
            <View style={styles.inputinfo}>
              <Text style={styles.question}>성별 : </Text>
              <TextInput
                style={styles.inputbox}
                placeholder="남자 / 여자"
                onChangeText={this.handleChange_gender}
              ></TextInput>
            </View>
            <View style={styles.inputinfo}>
              <Text style={styles.question}>신장 : </Text>
              <TextInput
                style={styles.inputbox}
                placeholder="178cm"
                onChangeText={this.handleChange_height}
              ></TextInput>
            </View>
            <View style={styles.inputinfo}>
              <Text style={styles.question}>몸무게 : </Text>
              <TextInput
                style={styles.inputbox}
                placeholder="70kg"
                onChangeText={this.handleChange_weight}
              ></TextInput>
            </View>
            <View style={styles.inputinfo}>
              <Text style={styles.question}>나이 : </Text>
              <TextInput
                style={styles.inputbox}
                placeholder="24"
                onChangeText={this.handleChange_age}
              ></TextInput>
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
