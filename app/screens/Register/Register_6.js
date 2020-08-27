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
      name: this.props.route.params.username,
      goal: null,
      visualize: false,
    };
    this.handleChange_goal = this.handleChange_goal.bind(this);
  }
  handleChange_goal(newText) {
    this.setState({
      goal: newText,
    });
  }
  selectgoal() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        goal: this.state.goal,
      })
      .then(() => {
        this.props.navigation.navigate("Register_7", {
          username: this.state.name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (!this.state.visualize) {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.3 }}
            colors={["#bbe1fa", "white"]}
            style={styles.container}
          >
            <View style={styles.header}>
              <Icon
                name="arrow-left"
                size={30}
                type="material-community"
                style={styles.backicon}
                onPress={() => {
                  this.props.navigation.navigate("Register_5");
                }}
              />
              <Text style={styles.stage}>3/4</Text>
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>
                {this.state.name} 님의 목표 체중은 얼마인가요?{"\n"}
                체감되는 변화를 보여드릴게요
              </Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.ask_goal}>
                {" "}
                목표 체중을 입력해주세요.{"\n"}
                {"\n"}
              </Text>
              <TextInput
                style={styles.goalinput}
                placeholder=""
                onChangeText={this.handleChange_goal}
                keyboardType="numeric"
              ></TextInput>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    visualize: true,
                  });
                }}
              >
                <LinearGradient
                  start={{ x: 0.1, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  colors={["#303966", "#c3cfe2"]}
                  style={styles.next_button}
                >
                  <Text style={styles.button_text}>확인하기</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Image
                source={require("../../images/logo_new.png")}
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
          end={{ x: 0, y: 0.3 }}
          colors={["#bbe1fa", "white"]}
          style={styles.container}
        >
          <View style={styles.header}>
            <Icon
              name="arrow-left"
              size={30}
              type="material-community"
              style={styles.backicon}
              onPress={() => {
                this.props.navigation.navigate("Register_5");
              }}
            />
            <Text style={styles.stage}>4/5</Text>
          </View>
          <View style={styles.top}>
            <Text style={styles.title}>
              {this.state.name} 님의 예상변화입니다!
            </Text>
          </View>
          <View style={styles.middle}>
            <View style={styles.result}></View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => {
                this.selectgoal();
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
        </LinearGradient>
      );
    }
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
  stage: {
    textAlign: "center",
    fontSize: RFValue(18, 812),
  },

  //top
  top: {
    flex: 2,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
  },

  //middle
  middle: {
    flex: 5.5,
    justifyContent: "center",
  },
  ask_goal: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
    bottom: RFValue(30, 812),
  },
  goalinput: {
    borderColor: "gray",
    borderBottomWidth: 1,
    width: RFValue(200, 812),
    marginHorizontal: RFValue(20, 812),
    fontSize: RFValue(25, 812),
    bottom: RFValue(30, 812),
    textAlign: "center",
    alignSelf: "center",
  },

  //second page
  result: {
    width: "90%",
    height: "95%",
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#e1f2fb",
    borderRadius: 20,
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
