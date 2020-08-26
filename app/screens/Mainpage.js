import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import "firebase/firestore";

export default class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todaycount: 0,
      todaydist: 0,
      name: "",
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
            .doc(user.uid)
            .onSnapshot((doc) => {
              var user = doc.data().name;
              var count = doc.data().today_count;
              var dist = doc.data().today_dist;
              this.setState({
                todaycount: count,
                todaydist: dist,
                name: user,
              });
            });
        }
      }
    );
  }

  render() {
    return (
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
        <View style={styles.middlelayer}>
          <View style={styles.todaybox}>
            <Text style={styles.text1}>
              오늘 {this.state.name} 님의 운동량입니다!{"\n"}운동 걸음 수는{" "}
              {this.state.todaycount} 보,{"\n"}달리기 거리는{" "}
              {this.state.todaydist} m 입니다!
            </Text>
          </View>
          <Text
            style={styles.selecttext}
            onPress={() => {
              this.props.navigation.navigate("Start");
            }}
          >
            {" "}
            Get Started!{" "}
          </Text>
        </View>
        <View style={styles.middlelayer2}></View>
        <View style={styles.bottomlayer}></View>
        <Text
          style={styles.selecttext}
          onPress={() => {
            this.props.navigation.navigate("Register_1");
          }}
        >
          {" "}
          튜토리얼 다시 하기{" "}
        </Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  toplayer: {
    flex: 3,
    justifyContent: "center",
  },
  middlelayer: {
    flex: 3,
    justifyContent: "center",
  },
  middlelayer2: {
    flex: 3,
    justifyContent: "center",
  },
  bottomlayer: {
    flex: 2,
    justifyContent: "center",
  },

  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.3 }],
    resizeMode: "center",
    aspectRatio: 1,
    top: RFValue(50, 812),
  },

  todaybox: {
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#eeeeee",
    opacity: 0.7,
    height: "90%",
    width: "80%",
    marginBottom: RFValue(20, 812),
  },
  text1: {
    fontSize: RFValue(22, 812),
    textAlign: "center",
    lineHeight: RFValue(30, 812),
  },

  selecttext: {
    textAlign: "center",
    fontSize: 20,
    color: "#0f4c75",
    fontWeight: "bold",
  },
});
