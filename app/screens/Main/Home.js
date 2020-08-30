import React, { Component } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { CommonActions } from "@react-navigation/native";
import Loading from "./Loading";
import { LineChart } from "react-native-chart-kit";
import {
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLegend,
  VictoryArea,
  VictoryZoomContainer,
  createContainer,
} from "victory-native";

export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      current: false,
      isLoading: true,
      weight: 80,
      height: 178,
      goal: 77,
      gap1: 0,
      gap2: 0,
      kcal: 0,
      domain_top: 81,
      current_weight: 78,
      axis1: "",
      axis2: "",
      axis3: "",
      axis4: "",
      axis_x: 0,
      const_two: 0,
      const_four: 0,
      const_six: 0,
      methd_two: 0,
      methd_four: 0,
      methd_six: 0,
      coefficient_two: 0,
      coefficient_four: 0,
      coefficient_six: 0,
      coefficient_def: 0,
      const_def: 0,
      methd_def: 0,
      default: null,
      reset_status: false,
      today_date: "",
      start_date: "",
      input_handle: false,
      input_weight: 0,
      gap_date: 0,
      progress: 0,
      hour: 0,
      min: 0,
      count_ex: 0,
      weight_today: 0,
    };
  }

  async componentDidMount() {
    console.log(this.state.isLoading + "1111");
    this.props.navigation.dispatch(
      CommonActions.setParams({
        tabBarVisible: false,
      })
    );
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
            .get()
            .then((doc) => {
              if (!doc.exists) {
                this.setState({
                  current: false,
                });
                setTimeout(
                  function () {
                    this.setState({ isLoading: false });
                    this.props.navigation.dispatch(
                      CommonActions.setParams({
                        tabBarVisible: false,
                      })
                    );
                  }.bind(this),
                  1500
                );
              } else {
                var date = new Date().getDate();
                var month = new Date().getMonth() + 1;
                var year = new Date().getFullYear();
                this.setState({
                  current: true,
                  today_date: date + "-" + month + "-" + year, //format: dd-mm-yyyy;
                });
                setTimeout(
                  function () {
                    this.setState({ isLoading: false });
                  }.bind(this),
                  1500
                );
              }
              if (this.state.current) {
                firebase
                  .firestore()
                  .collection("users")
                  .doc("App")
                  .collection("info")
                  .doc(user.uid)
                  .onSnapshot((doc) => {
                    this.setState({
                      reset_status: doc.data().reset_status,
                      name: String(doc.data().name),
                      weight: Number(doc.data().weight),
                      height: Number(doc.data().height),
                      goal: Number(doc.data().goal),
                      kcal: (Number(doc.data().height) - 100) * 27,
                      default: String(doc.data().defaultplan),
                      start_date: doc.data().startdate,
                      hour: Number(doc.data().runninghour),
                      min: Number(doc.data().runningmin),
                      count_ex: Number(doc.data().count_ex),
                      weight_today: Number(doc.data().weight_today),
                    });
                  });
                /*console.log("name : " + this.state.name);
                console.log("weight : " + this.state.weight);
                console.log("height : " + this.state.height);
                console.log("goal : " + this.state.goal);
                console.log("default : " + this.state.default);*/
                firebase
                  .firestore()
                  .collection("users")
                  .doc("App")
                  .collection("info")
                  .doc(user.uid)
                  .collection("prediction")
                  .doc("data")
                  .onSnapshot((doc) => {
                    this.setState({
                      const_two: Number(doc.data().const_two),
                      const_four: Number(doc.data().const_four),
                      const_six: Number(doc.data().const_six),
                      methd_two: Number(doc.data().methd_two),
                      methd_four: Number(doc.data().methd_four),
                      methd_six: Number(doc.data().methd_six),
                      coefficient_two:
                        Number(doc.data().methd_two) * 2.99 * 0.00001,
                      coefficient_four:
                        Number(doc.data().methd_four) * 2.99 * 0.00001,
                      coefficient_six:
                        Number(doc.data().methd_six) * 2.99 * 0.00001,
                    });
                    if (this.state.reset_status) {
                      setTimeout(
                        function () {
                          this.setState({ isLoading: false });
                          this.props.navigation.dispatch(
                            CommonActions.setParams({
                              tabBarVisible: false,
                            })
                          );
                        }.bind(this),
                        1500
                      );
                    } else {
                      /*console.log("const_two : " + this.state.const_two);
                      console.log("const_four : " + this.state.const_four);
                      console.log("const_six : " + this.state.const_six);

                      console.log("methd_two : " + this.state.methd_two);
                      console.log("methd_four : " + this.state.methd_four);
                      console.log("methd_six : " + this.state.methd_six);
                      console.log(
                        "coefficient_two : " + this.state.coefficient_two
                      );
                      console.log(
                        "coefficient_four : " + this.state.coefficient_four
                      );
                      console.log(
                        "coefficient_six : " + this.state.coefficient_six
                      );

                      console.log(this.state.today_date); */
                      var timearr = this.state.start_date
                        .split("-")
                        .map(Number);
                      var date_t = new Date().getDate();
                      var month_t = new Date().getMonth() + 1;
                      var date_s = timearr[0];
                      var month_s = timearr[1];
                      var gap_date = Number(date_t - date_s);
                      var gap_month = Number(month_t - month_s);
                      var total_gap = gap_month * 30 + gap_date;
                      console.log("time gap : " + total_gap);

                      var result = parseInt(Number(this.state.min) / 60);
                      var real_min = Number(this.state.min) - result * 60;
                      var real_hour = Number(this.state.hour) + result;

                      this.setState({
                        gap_date: Number(total_gap) + 1,
                        hour: Number(real_hour),
                        min: Number(real_min),
                      });

                      if (this.state.default === "2month") {
                        this.setState({
                          axis_x: 60,
                          axis1: "2주 후",
                          axis2: "4주 후",
                          axis3: "6주 후",
                          axis4: "달성",
                          coefficient_def: this.state.coefficient_two,
                          methd_def: this.state.methd_two,
                          const_def: this.state.const_two,
                        });
                      } else if (this.state.default === "4month") {
                        this.setState({
                          axis_x: 120,
                          axis1: "1달 후",
                          axis2: "2달 후",
                          axis3: "3달 후",
                          axis4: "달성",
                          coefficient_def: this.state.coefficient_four,
                          methd_def: this.state.methd_four,
                          const_def: this.state.const_four,
                        });
                      } else if (this.state.default === "6month") {
                        this.setState({
                          axis_x: 180,
                          axis1: "6주 후",
                          axis2: "12주 후",
                          axis3: "18주 후",
                          axis4: "달성",
                          coefficient_def: this.state.coefficient_six,
                          methd_def: this.state.methd_six,
                          const_def: this.state.const_six,
                        });
                      }
                      this.setState({
                        progress:
                          (
                            (Number(this.state.gap_date) /
                              Number(this.state.axis_x)) *
                            100
                          ).toFixed(1) + "%",
                      });
                      /*console.log("axis : " + (this.state.axis_x * 2) / 4);
                      console.log("const_def : " + this.state.const_def);
                      console.log("methd_def : " + this.state.methd_def);
                      console.log(
                        "coefficient_def : " + this.state.coefficient_def
                      );
                      console.log("due date : " + this.state.gap_date); */
                      if (this.state.coefficient_def == 0) {
                        this.props.navigation.dispatch(
                          CommonActions.setParams({
                            tabBarVisible: false,
                          })
                        );
                      } else {
                        setTimeout(
                          function () {
                            this.setState({ isLoading: false });
                            this.props.navigation.dispatch(
                              CommonActions.setParams({
                                tabBarVisible: true,
                              })
                            );
                          }.bind(this),
                          1500
                        );
                      }
                    }
                  });
                //console.log(this.state.isLoading);
              } else {
                this.setState({
                  current: false,
                });
              }
            });
        }
      }
    );
  }

  setTimePassed() {
    this.setState({ isLoading: false });
  }

  render() {
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.reset_status) {
      return (
        <View style={styles.container}>
          <View style={styles.header1}>
            <Icon
              name="arrow-left"
              size={30}
              type="material-community"
              style={styles.backicon}
              onPress={() => {
                this.props.navigation.navigate("SignIn");
              }}
            />
          </View>
          <View style={styles.top1}>
            <Text style={styles.title1}>
              목표 재설정이 완료되지 않았습니다..
            </Text>
          </View>
          <View style={styles.middle1}>
            <Text style={styles.title1}>다시 진행해주세요</Text>
          </View>
          <View style={styles.bottom1}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Register_2");
              }}
            >
              <LinearGradient
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#303966", "#c3cfe2"]}
                style={styles.next_button}
              >
                <Text style={styles.button_text}>다시 시작하기</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.footer1}>
            <Image
              source={require("../../images/logo_new.png")}
              style={styles.logo}
            ></Image>
          </View>
        </View>
      );
    } else if (!this.state.current && !this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.header1}>
            <Icon
              name="arrow-left"
              size={30}
              type="material-community"
              style={styles.backicon}
              onPress={() => {
                this.props.navigation.navigate("SignIn");
              }}
            />
          </View>
          <View style={styles.top1}>
            <Text style={styles.title1}>
              막연한 유산소 다이어트에 지치셨나요?
            </Text>
          </View>
          <View style={styles.middle1}>
            <Text style={styles.title1}>이제 목표만큼만 알고 뛰세요!</Text>
          </View>
          <View style={styles.bottom1}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Register_1");
              }}
            >
              <LinearGradient
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#303966", "#c3cfe2"]}
                style={styles.next_button}
              >
                <Text style={styles.button_text}>시작하기</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.footer1}>
            <Image
              source={require("../../images/logo_new.png")}
              style={styles.logo}
            ></Image>
          </View>
        </View>
      );
    } else if (this.state.coefficient_def == 0) {
      return (
        <View style={styles.container}>
          <View style={styles.header1}>
            <Icon
              name="arrow-left"
              size={30}
              type="material-community"
              style={styles.backicon}
              onPress={() => {
                this.props.navigation.navigate("SignIn");
              }}
            />
          </View>
          <View style={styles.top1}>
            <Text style={styles.title1}>플랜 선택이 완료되지 않았어요..</Text>
          </View>
          <View style={styles.middle1}>
            <Text style={styles.title1}>다시 목표를 세워볼까요?</Text>
          </View>
          <View style={styles.bottom1}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Register_2");
              }}
            >
              <LinearGradient
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#303966", "#c3cfe2"]}
                style={styles.next_button}
              >
                <Text style={styles.button_text}>다시 시작하기</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.footer1}>
            <Image
              source={require("../../images/logo_new.png")}
              style={styles.logo}
            ></Image>
          </View>
        </View>
      );
    } else if (this.state.current && !this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.topbanner}>
              <Text style={styles.title}>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.name2}> 님</Text>
              </Text>
              <Text style={styles.subtitle}>
                이번 주도 계획대로 잘하고 계세요!
              </Text>
            </View>
          </View>
          <View style={styles.top}>
            <View style={styles.graphbox}>
              <Text style={styles.graphtitle}>
                진행률 : {this.state.progress}
              </Text>

              <VictoryChart
                theme={VictoryTheme.grayscale}
                width={Dimensions.get("window").width * 0.95}
                animate={{ duration: 2000 }}
                domain={{
                  x: [0, this.state.axis_x],
                  y: [this.state.goal - 1, this.state.weight + 1],
                }}
                containerComponent={
                  <VictoryZoomVoronoiContainer
                    labels={({ datum }) =>
                      `목표까지 ${(this.state.weight - datum.y).toFixed(1)}kg`
                    }
                    minimumZoom={{ x: 300, y: 20 }}
                  />
                }
              >
                <VictoryAxis
                  tickValues={[
                    0,
                    this.state.axis_x * 0.25,
                    this.state.axis_x * 0.5,
                    this.state.axis_x * 0.75,
                    this.state.axis_x,
                    this.state.axis_x * 1.25,
                  ]}
                  tickFormat={[
                    "시작",
                    this.state.axis1,
                    this.state.axis2,
                    this.state.axis3,
                    this.state.axis4,
                    "",
                  ]}
                />
                <VictoryAxis
                  dependentAxis
                  tickValues={[
                    this.state.goal - (this.state.weight - this.state.goal) / 3,
                    this.state.goal,
                    (this.state.weight - this.state.goal) / 3 + this.state.goal,
                    ((this.state.weight - this.state.goal) * 2) / 3 +
                      this.state.goal,
                    this.state.weight,
                  ]}
                  tickFormat={(tick) => `${Math.round(tick)}kg`}
                />
                <VictoryLine
                  style={{
                    data: { stroke: "#0f4c75", strokeWidth: 2 },
                    parent: { border: "1px solid #ccc" },
                  }}
                  y={(d) =>
                    (Math.log(
                      1 /
                        ((d.x / 24) * this.state.coefficient_def +
                          this.state.const_def)
                    ) /
                      0.279) *
                    (this.state.height / 100) *
                    (this.state.height / 100)
                  }
                />
                <VictoryLine
                  interpolation="cardinal"
                  style={{
                    data: { stroke: "#f67280", strokeWidth: 2 },
                    parent: { border: "1px solid #ccc" },
                  }}
                  data={[
                    { x: 0, y: this.state.weight },
                    {
                      x: Number(this.state.gap_date),
                      y: Number(this.state.weight_today),
                    },
                  ]}
                />
              </VictoryChart>
            </View>
          </View>
          <View style={styles.middle}>
            <View style={styles.thingment}>
              <View style={styles.encourage}>
                <Text style={styles.ex_num}>
                  <Text style={styles.bold}>
                    {isNaN(this.state.count_ex) ? 0 : this.state.count_ex}
                  </Text>
                  <Text style={styles.unit}> 회{"\n"}</Text>
                  <Text style={styles.unit_bottom}>운동횟수</Text>
                </Text>
                <Text style={styles.ex_hour}>
                  <Text style={styles.bold}>
                    {isNaN(this.state.hour) ? 0 : this.state.hour}
                  </Text>
                  <Text style={styles.unit}> 시간{"  "}</Text>
                  <Text style={styles.bold}>
                    {isNaN(this.state.min) ? 0 : this.state.min}
                  </Text>
                  <Text style={styles.unit}> 분{"\n"}</Text>
                  <Text style={styles.unit_bottom}>운동시간</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.eat}>
              <Text style={styles.recommendation}>
                <Text style={styles.rec_bold}>{this.state.name}</Text>
                님의 하루 권장 섭취 칼로리는 {"\n"}{" "}
                <Text style={styles.rec_bold}>{this.state.kcal}</Text>
                <Text style={styles.recommendation}>Kcal입니다!</Text>
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  //header
  header: {
    flex: 0.9,
    justifyContent: "flex-end",
  },
  title: {
    marginTop: RFValue(15, 812),
    fontSize: RFValue(35, 812),
    flexDirection: "row",
    marginLeft: RFValue(30, 812),
    marginBottom: RFValue(5, 812),
  },
  name: {
    color: "#76B4FF",
    fontWeight: "bold",
  },
  name2: {},
  subtitle: {
    marginLeft: RFValue(30, 812),
    fontSize: RFValue(25, 812),
  },

  //top
  top: {
    flex: 2,
    justifyContent: "center",
  },
  graphbox: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#465881",
    backgroundColor: "white",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  graphtitle: {
    top: RFValue(40, 812),
    fontSize: RFValue(20, 812),
    fontWeight: "bold",
    textAlign: "center",
  },

  //middle
  middle: {
    flex: 1,
    justifyContent: "center",
  },
  thingment: {
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  encourage: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  ex_hour: {
    marginHorizontal: RFValue(20, 812),
    textAlign: "center",
  },
  ex_num: {
    marginHorizontal: RFValue(20, 812),
    textAlign: "center",
  },
  bold: {
    fontSize: RFValue(45, 812),
    fontWeight: "bold",
    color: "black",
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  unit_bottom: {
    fontSize: RFValue(15, 812),
    color: "black",
    textAlign: "center",
  },
  unit: {
    fontSize: RFValue(20, 812),
    color: "black",
  },

  //bottom
  bottom: {
    flex: 1,
    justifyContent: "center",
  },
  eat: {
    width: "90%",
    height: "90%",
    backgroundColor: "#324e7b",
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  recommendation: {
    fontSize: RFValue(20, 812),
    textAlign: "center",
    color: "white",
  },
  rec_bold: {
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },

  // For newbie
  header1: {
    flex: 1.5,
    justifyContent: "center",
  },
  backicon: {
    alignSelf: "flex-start",
    left: 30,
  },

  top1: {
    flex: 2,
    justifyContent: "center",
  },
  title1: {
    fontSize: RFValue(25, 812),
    flexDirection: "row",
    textAlign: "center",
  },

  //middle
  middle1: {
    flex: 5.5,
    justifyContent: "center",
  },

  //bottom
  bottom1: {
    flex: 1.5,
    justifyContent: "center",
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

  //footer
  footer1: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    height: "100%",
    aspectRatio: 1,
  },
});
