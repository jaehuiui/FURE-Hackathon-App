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
      goal: "",
      visible: false,
    };
    this.handleChange_goal = this.handleChange_goal.bind(this);
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
  handleChange_goal(newText) {
    this.setState({
      goal: newText,
    });
  }

  handleChangevisible() {
    this.setState({
      visible: true,
    });
  }

  OnInsertPress() {
    const data = firebase.firestore();
    data
      .collection("users")
      .doc(this.state.uid)
      .update({
        goal: this.state.goal,
      })
      .then(() => {
        this.handleChangevisible();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (!this.state.visible) {
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
                {this.state.name} 님의 목표 체중은 얼마인가요?{"\n"}
                변화를 보여드릴게요.
              </Text>
            </View>
            <View style={styles.middlelayer}>
              <View style={styles.inputinfo}>
                <Text style={styles.question}>몸무게 : </Text>
                <TextInput
                  style={styles.inputbox}
                  placeholder=""
                  onChangeText={this.handleChange_goal}
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
    } else {
      return (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.25 }}
          colors={["#bbe1fa", "white"]}
          style={styles.container}
        >
          <View style={styles.toplayer}>
            <Text style={styles.title}>
              {this.state.name} 님의 목표 체중은 얼마인가요?{"\n"}
              변화를 보여드릴게요.
            </Text>
          </View>
          <View style={styles.middlelayer}>
            <View style={styles.modelbox}></View>
          </View>
          <View style={styles.bottomlayer}>
            <Text
              style={styles.selecttext}
              onPress={() => {
                this.props.navigation.navigate("Register_fourth");
              }}
            >
              내 얼굴 합성하기
            </Text>
          </View>
        </LinearGradient>
      );
    }
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
    flexDirection: "column",
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
  modelbox: {
    width: "80%",
    height: "90%",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "gray",
    backgroundColor: "white",
    alignSelf: "center",
  },
});
