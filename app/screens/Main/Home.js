import React, { Component } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  assign,
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
  VictoryArea,
  VictoryZoomContainer,
  createContainer,
} from "victory-native";

export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      current: false,
      isLoading: true,
      weight: 80,
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
        console.log(this.state.isLoading + "1");
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
                    console.log(this.state.isLoading + "2222");
                    this.props.navigation.dispatch(
                      CommonActions.setParams({
                        tabBarVisible: false,
                      })
                    );
                  }.bind(this),
                  1500
                );
              } else {
                this.setState({
                  current: true,
                });
                setTimeout(
                  function () {
                    this.setState({ isLoading: false });
                    console.log(this.state.isLoading + "2222");
                  }.bind(this),
                  1500
                );
              }
              console.log(this.state.isLoading + "2");
              if (this.state.current) {
                firebase
                  .firestore()
                  .collection("users")
                  .doc("App")
                  .collection("info")
                  .doc(user.uid)
                  .onSnapshot((doc) => {
                    console.log(doc.data().name);
                    this.setState({
                      name: doc.data().name,
                      weight: Number(doc.data().weight),
                      //goal: Number(doc.data().goal),
                      kcal: (Number(doc.data().height) - 100) * 27,
                      gap1:
                        (Number(doc.data().goal) - Number(doc.data().weight)) *
                          0.33 +
                        Number(doc.data().weight),
                      gap2:
                        (Number(doc.data().goal) - Number(doc.data().weight)) *
                          0.66 +
                        Number(doc.data().weight),
                      //domain_top: Number(doc.data().weight) + 1,
                      axis1: "2주 후",
                      axis2: "4주 후",
                      axis3: "6주 후",
                      axis4: "8주 후",
                    });
                    setTimeout(
                      function () {
                        this.setState({ isLoading: false });
                        console.log(this.state.isLoading + "2222");
                        this.props.navigation.dispatch(
                          CommonActions.setParams({
                            tabBarVisible: true,
                          })
                        );
                      }.bind(this),
                      1500
                    );
                  });
              }
            });

          //console.log(this.state.isLoading);
        } else {
          this.props.navigation.navigate("SignIn");
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
    } else if (this.state.current && !this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.topbanner}>
              <Text style={styles.title}>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.name2}>님</Text>
              </Text>
              <Text style={styles.subtitle}>
                이번 주도 계획대로 잘하고 계세요!
              </Text>
            </View>
          </View>
          <View style={styles.top}>
            <View style={styles.graphbox}>
              <VictoryChart
                theme={VictoryTheme.grayscale}
                width={Dimensions.get("window").width * 0.95}
                animate={{ duration: 2000 }}
                containerComponent={
                  <VictoryZoomVoronoiContainer
                    labels={({ datum }) => `${datum.y}`}
                    minimumZoom={{ x: 3.5, y: 3.5 }}
                  />
                }
              >
                <VictoryAxis
                  tickValues={[1, 2, 3, 4, 5]}
                  tickFormat={["시작", "2주 후", "4주 후", "6주 후", "8주 후"]}
                />
                <VictoryAxis
                  dependentAxis
                  tickValues={[this.state.goal, this.state.domain_top]}
                  tickFormat={(tick) => `${Math.round(tick)}kg`}
                />
                <VictoryLine
                  interpolation="natural"
                  style={{
                    data: { stroke: "#0f4c75" },
                    parent: { border: "1px solid #ccc" },
                  }}
                  data={[
                    { x: 1, y: 80 },
                    { x: 2, y: 79.3 },
                    { x: 3, y: 78.8 },
                    { x: 4, y: 77.6 },
                    { x: 5, y: 77 },
                  ]}
                />
              </VictoryChart>
            </View>
          </View>
          <View style={styles.middle}>
            <View style={styles.thingment}></View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.eat}>
              <Text style={styles.recommendation}>
                {this.state.name}님의 하루 권장 섭취 칼로리는 {"\n"}{" "}
                {this.state.kcal}Kcal입니다!
              </Text>
            </View>
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
    justifyContent: "center",
  },
  title: {
    fontSize: RFValue(30, 812),
    flexDirection: "row",
    textAlign: "center",
  },
  name: {
    color: "#76B4FF",
  },
  name2: {},
  subtitle: {
    fontSize: RFValue(20, 812),
    textAlign: "center",
  },

  //top
  top: {
    flex: 2,
    justifyContent: "center",
  },
  graphbox: {
    width: "90%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
  },

  //middle
  middle: {
    flex: 1,
    justifyContent: "center",
  },
  thingment: {
    width: "90%",
    height: "90%",
    backgroundColor: "#3282b8",
    borderRadius: 20,
    alignSelf: "center",
  },

  //bottom
  bottom: {
    flex: 1,
    justifyContent: "center",
  },
  eat: {
    width: "90%",
    height: "90%",
    backgroundColor: "#dff6f0",
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  recommendation: {
    fontSize: RFValue(20, 812),
    textAlign: "center",
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
