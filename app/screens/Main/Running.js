import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
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
        currentmeter: this.state.currentStepCount * 0.7,
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
        this.props.navigation.navigate("Today");
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Today's Running</Text>
        </View>
        <View style={styles.top}>
          <Text style={styles.timer}>00:13:50</Text>
          <Text style={styles.timer_text}>운동 시간</Text>
        </View>
        <View style={styles.top2}>
          <View style={styles.first_ele}>
            <Text style={styles.dist}>{this.state.currentmeter}</Text>
            <Text style={styles.dist_text}>거리(Km)</Text>
          </View>
          <View style={styles.second_ele}>
            <Text style={styles.cal}>230</Text>
            <Text style={styles.cal_text}></Text>
          </View>
          <View style={styles.third_ele}>
            <Text style={styles.speed}></Text>
            <Text style={styles.speed_text}></Text>
          </View>
        </View>

        <View style={styles.middle}>
          <Text style={styles.advice}>
            오늘은 컨디션이 좋으시군요? {"\n"} 플랜대로 잘 뛰고 있어요!
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Running");
            }}
          >
            <LinearGradient
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              colors={["#303966", "#c3cfe2"]}
              style={styles.next_button}
            >
              <Text style={styles.button_text}>Finish</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //layer 1
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  //header
  header: {
    flex: 1.5,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: RFValue(30, 812),
  },

  //top
  top: {
    flex: 1,
    flexDirection: "column",
  },
  timer: {
    textAlign: "center",
    fontSize: RFValue(35, 812),
    fontWeight: "bold",
  },
  timer_text: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },

  //top2
  top2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  first_ele: {
    flexDirection: "column",
    width: "33%",
    justifyContent: "center",
  },
  dist: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },
  dist_text: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },

  second_ele: {
    flexDirection: "column",
    width: "33%",
    justifyContent: "center",
  },
  cal: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },
  cal_text: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },

  third_ele: {
    flexDirection: "column",
    width: "33%",
    justifyContent: "center",
  },
  speed: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },
  speed_text: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },

  //middle
  middle: {
    flex: 3,
    justifyContent: "center",
  },
  advice: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
  },

  //footer
  footer: {
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
});
