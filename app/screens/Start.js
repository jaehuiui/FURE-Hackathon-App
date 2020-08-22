import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import "firebase/firestore";

export default class App extends React.Component {
  state = {
    currentStepCount: 0,
    currentmeter: 0,
    todaycount: 0,
    todaydist: 0,
    sumcount: 0,
    sumdist: 0,
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    var toc = this.state.todaycount;
    var tod = this.state.todaydist;
    this._subscription = Pedometer.watchStepCount((result) => {
      this.setState({
        currentStepCount: result.steps,
        currentmeter: this.state.currentStepCount * 0.5,
      });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  onSubmit() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    const increment_c = firebase.firestore.FieldValue.increment(
      this.state.currentStepCount
    );
    const increment_d = firebase.firestore.FieldValue.increment(
      this.state.currentmeter
    );
    data
      .collection("users")
      .doc(user.uid)
      .update({
        today_count: increment_c,
        today_dist: increment_d,
      })
      .then(() => {
        this.props.navigation.navigate("Mainpage");
      });
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.25 }}
        colors={["#bbe1fa", "white"]}
        style={styles.container}
      >
        <View style={styles.toplayer}></View>
        <View style={styles.middlelayer}>
          <Text style={styles.check}>
            FU:RE가 걸음 수를 확인하고 있어요{"\n"}현재 걸음 수 :{" "}
            {this.state.currentStepCount} 보{"\n"}
            현재 거리 : {this.state.currentmeter} m
          </Text>
          <Text
            style={styles.selecttext}
            onPress={() => {
              this.onSubmit();
            }}
          >
            {" "}
            Finish!{" "}
          </Text>
        </View>
        <View style={styles.bottomlayer}>
          <Image
            source={require("../images/logo.png")}
            style={styles.logo}
          ></Image>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  //layer 1
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  // Layer 2
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
  //layer 3
  check: {
    textAlign: "center",
    fontSize: 25,
    lineHeight: RFValue(50, 812),
  },
  selecttext: {
    marginTop: RFValue(70, 812),
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f4c75",
    marginBottom: RFValue(30, 812),
  },
  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.3 }],
    resizeMode: "center",
    aspectRatio: 1,
  },
});
