import React from "react";
import { Pedometer } from "expo-sensors";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  TouchableHighlight,
  currentTime,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import "firebase/firestore";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import Count3 from "../temp/count3";
import Count2 from "../temp/count2";
import Count1 from "../temp/count1";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: true,
      totalDuration: 900000,
      stopwatchReset: false,
      dist: "0m",
      currentStepCount: 0,
      currentmeter: 0,
      todaycount: 0,
      todaydist: 0,
      sumcount: 0,
      sumdist: 0,
      count3: true,
      count2: true,
      weight: 0,
      count1: true,
      hour1: 0,
      hour2: 0,
      min1: 0,
      min2: 0,
      hist_hour: 0,
      hist_min: 0,
      speed: 0,
      kcal: 0,
      msg: false,
    };
    this._subscribe = this._subscribe.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.getFormattedTime = this.getFormattedTime.bind(this);
    console.disableYellowBox = true;
  }

  async componentDidMount() {
    this._subscribe();
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .onSnapshot((doc) => {
        this.setState({
          weight: Number(doc.data().weight_today),
          today_count: Number(doc.data().today_count),
          today_dist: Number(doc.data().today_dist),
        });
        setTimeout(
          function () {
            this.setState({ count3: false });
          }.bind(this),
          1000
        );
        setTimeout(
          function () {
            this.setState({ count2: false });
          }.bind(this),
          2000
        );
        setTimeout(
          function () {
            this.setState({ count1: false });
          }.bind(this),
          3000
        );
      });
  }

  playSound() {
    alert("준비 중인 서비스입니다.");
    console.log("play");
  }

  _subscribe = () => {
    var toc = this.state.todaycount;
    var tod = this.state.todaydist;
    this._subscription = Pedometer.watchStepCount((result) => {
      if (this.currentTime !== undefined) {
        var time = String(this.currentTime);
      } else {
        var time = "00:00:00:000";
      }
      var timearr = time.split(":");
      var time_hour1 = Number.parseInt(timearr[0], 10);
      var time_min1 = Number.parseInt(timearr[1], 10);
      var time_sec1 = Number.parseInt(timearr[2], 10);
      var total = time_hour1 + time_min1 / 60 + time_sec1 / 3600;
      var total_min = time_hour1 * 60 + time_min1 + time_sec1 / 60;
      this.setState({
        currentStepCount: result.steps,
        currentmeter: Number(this.state.currentStepCount) * 0.7,
        hour1: Number(time_hour1),
        min1: Number(time_min1),
        speed: (Number(this.state.currentStepCount) * 0.7) / 1000 / total,
      });

      if (Number.parseInt(this.state.speed, 10) > 6) {
        this.setState({
          msg: true,
          kcal:
            ((((Number(this.state.speed) / 1.6 - 4.2182) / 0.5682) *
              3.5 *
              Number(this.state.weight)) /
              200) *
            total_min,
        });
      } else {
        this.setState({
          msg: false,
          kcal: ((4.5 * 3.5 * Number(this.state.weight)) / 200) * total_min,
        });
      }
      if (Number(this.state.currentmeter) < 1000) {
        this.setState({
          dist: Number(this.state.currentmeter).toFixed(1) + "m",
        });
      } else if (Number(this.state.currentmeter) >= 100) {
        this.setState({
          dist: Number(this.state.currentmeter).toFixed(0) + "m",
        });
      } else if (Number(this.state.currentmeter) >= 1000) {
        this.setState({
          dist: (Number(this.state.currentmeter) / 1000).toFixed(2) + "km",
        });
      }
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  onSubmit() {
    this.setState({
      stopwatchStart: false,
    });
    console.log(this.state.currentmeter);
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    const meter =
      Number(this.state.today_dist) + Number(this.state.currentmeter);
    var timearr = this.currentTime.split(":");
    var time_hour1 = Number.parseInt(timearr[0], 10);
    var time_min1 = Number.parseInt(timearr[1], 10);

    this.setState({});
    console.log("tlqkf1 : " + time_hour1);

    console.log("tlqkf3 : " + time_min1);

    const increment_count = firebase.firestore.FieldValue.increment(1);
    const increment_hour = firebase.firestore.FieldValue.increment(
      Number(time_hour1)
    );
    const increment_min = firebase.firestore.FieldValue.increment(
      Number(time_min1)
    );

    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        count_ex: increment_count,
        runninghour: increment_hour,
        runningmin: increment_min,
        today_count:
          Number(this.state.currentStepCount) + Number(this.state.today_count),
        today_dist: meter,
      })
      .then(() => {
        this.props.navigation.navigate("Today");
      });
    this._unsubscribe();
    console.log(this.currentTime);
  }

  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
    });
  }

  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }
  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    if (this.state.count3) {
      return <Count3 />;
    } else if (!this.state.count3 && this.state.count2) {
      return <Count2 />;
    } else if (!this.state.count3 && !this.state.count2 && this.state.count1) {
      return <Count1 />;
    } else if (!this.state.count3 && !this.state.count2 && !this.state.count1) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Today's Running</Text>
          </View>
          <View style={styles.top}>
            <View style={styles.stopwatch_box}>
              <Stopwatch
                laps
                msecs
                getTime={this.getFormattedTime}
                start={this.state.stopwatchStart}
                reset={this.state.stopwatchReset}
              />
            </View>
            <View style={styles.stopwatch_button_layer}>
              <TouchableOpacity onPress={this.toggleStopwatch}>
                <Text style={styles.start_button}>
                  {!this.state.stopwatchStart ? "Start" : "Stop"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.resetStopwatch}>
                <Text style={styles.reset_button}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.top2}>
            <View style={styles.first_ele}>
              <Text style={styles.dist}>
                {this.state.dist}
                {"\n"}
              </Text>
              <Text style={styles.dist_text}>거리</Text>
            </View>
            <View style={styles.second_ele}>
              <Text style={styles.dist}>
                {isNaN(this.state.kcal)
                  ? 0
                  : Number(this.state.kcal).toFixed(1)}
                {"\n"}
              </Text>
              <Text style={styles.dist_text}>칼로리 (Kcal)</Text>
            </View>
            <View style={styles.third_ele}>
              <Text style={styles.dist}>
                {Number(this.state.speed).toFixed(2)}
                {"\n"}
              </Text>
              <Text style={styles.dist_text}>페이스 (km/h)</Text>
            </View>
          </View>

          <View style={styles.middle}>
            <Text style={styles.advice}>
              {!this.state.msg
                ? "조금 더 속도를 올려볼까요?\n\n화이팅!\n"
                : "오늘 컨디션이 좋으시군요?\n\n플랜대로 잘 뛰고 있어요!\n"}
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.audio}
                onPress={() => {
                  this.playSound();
                }}
              >
                오디오 코칭 듣기
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                this.onSubmit();
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
    fontWeight: "bold",
  },

  //top
  top: {
    flex: 1,
    justifyContent: "center",
  },
  stopwatch_box: {
    alignSelf: "center",
    marginBottom: RFValue(20, 812),
  },
  stopwatch_button_layer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  start_button: {
    fontSize: RFValue(23, 812),
    color: "#0f4c75",
    fontWeight: "bold",
  },
  reset_button: {
    fontSize: RFValue(23, 812),
    color: "gray",
    fontWeight: "bold",
  },

  //top2
  top2: {
    flex: 1,
    marginTop: RFValue(20, 812),
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
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
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
    fontSize: RFValue(30, 812),
    fontWeight: "bold",
    color: "#005086",
  },
  audio: {
    fontSize: RFValue(20, 812),
    color: "#005086",
    textAlign: "center",
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
