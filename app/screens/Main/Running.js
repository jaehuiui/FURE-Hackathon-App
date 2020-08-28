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
      count1: true,
    };
    this._subscribe = this._subscribe.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.getFormattedTime = this.getFormattedTime.bind(this);
  }

  componentDidMount() {
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

  componentWillUnmount() {
    this._unsubscribe();
    console.log(this.currentTime);
  }

  _subscribe = () => {
    var toc = this.state.todaycount;
    var tod = this.state.todaydist;
    this._subscription = Pedometer.watchStepCount((result) => {
      this.setState({
        currentStepCount: result.steps,
        currentmeter: Number(this.state.currentStepCount) * 0.7,
      });
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

    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        runningtime: this.currentTime,
        today_count:
          Number(this.state.currentStepCount) + Number(this.state.today_count),
        today_dist: meter,
      })
      .then(() => {
        this.props.navigation.navigate("Today");
      });
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
    fontSize: RFValue(20, 812),
    color: "#0f4c75",
  },
  reset_button: {
    fontSize: RFValue(20, 812),
    color: "gray",
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
