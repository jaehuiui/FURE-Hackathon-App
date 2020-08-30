import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import axios from "axios";
import Loading from "../Main/Loading_reg";
import { ThemeProvider } from "@react-navigation/native";
import Swiper from "react-native-swiper";

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uid: "",
      interval: "",
      time: "",
      weight: "",
      goal: "",
      gap: 0,
      plan2: "",
      plan4: "",
      plan6: "",
      plan2_dist: "",
      plan4_dist: "",
      plan6_dist: "",
      isLoading: true,
      isLoadingend: true,
      index: "",
      selectplan: "",
      startdate: "",
    };
  }
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        this.setState({
          startdate: date + "-" + month + "-" + year, //format: dd-mm-yyyy;
        });

        if (user != null) {
          firebase
            .firestore()
            .collection("users")
            .doc("App")
            .collection("info")
            .doc(user.uid)
            .onSnapshot((doc) => {
              var weight = doc.data().weight;
              var goal = doc.data().goal;
              var interval = doc.data().days;
              var time = doc.data().time;
              var gap = weight - goal;
              this.setState({
                name: doc.data().name,
                interval: interval,
                goal: goal,
                weight: weight,
                time: time,
                gap: gap,
              });
            });
        }
      }
    );
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    axios({
      method: "post",
      url: "http://34.64.105.43:3389/plan/",
      data: {
        uid: user.uid,
      },
    })
      .then((response) => {
        console.log("2달 플랜 속도 : " + response.data.Two);
        console.log("4달 플랜 속도 : " + response.data.Four);
        console.log("6달 플랜 속도 : " + response.data.Six);
        this.setState({
          plan2: response.data.Two,
          plan4: response.data.Four,
          plan6: response.data.Six,
        });
        const plan2_dist =
          Number(this.state.plan2) * 1.6 * Number(this.state.time);
        const plan4_dist =
          Number(this.state.plan4) * 1.6 * Number(this.state.time);
        const plan6_dist =
          Number(this.state.plan6) * 1.6 * Number(this.state.time);
        this.setState({
          plan2_dist: plan2_dist.toFixed(1),
          plan4_dist: plan4_dist.toFixed(1),
          plan6_dist: plan6_dist.toFixed(1),
        });
        console.log("2달 플랜 거리 : " + this.state.plan2_dist);
        console.log("4달 플랜 거리 : " + this.state.plan4_dist);
        console.log("6달 플랜 거리 : " + this.state.plan6_dist);
        console.log(this.state.startdate);
        setTimeout(
          function () {
            this.setState({ isLoading: false });
            console.log(this.state.isLoading + " check loading");
          }.bind(this),
          2000
        );
      })
      .catch(function (error) {
        console.log(user.uid);
        console.log(error);
      });
  }

  selectplan2() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        plan2: this.state.plan2,
        plan4: this.state.plan4,
        plan6: this.state.plan6,
        defaultplan: "2month",
        reset_status: false,
        startdate: this.state.startdate,
        first: false,
      })
      .then(() => {
        setTimeout(
          function () {
            this.setState({
              isLoadingend: false,
            });
          }.bind(this),
          1000
        );
        this.props.navigation.navigate("Mainpage");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  selectplan4() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        plan2: this.state.plan2,
        plan4: this.state.plan4,
        plan6: this.state.plan6,
        defaultplan: "4month",
        reset_status: false,
        startdate: this.state.startdate,
        first: false,
      })
      .then(() => {
        setTimeout(
          function () {
            this.setState({
              isLoadingend: false,
            });
          }.bind(this),
          1000
        );
        this.props.navigation.navigate("Mainpage");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  selectplan6() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        plan2: this.state.plan2,
        plan4: this.state.plan4,
        plan6: this.state.plan6,
        defaultplan: "6month",
        reset_status: false,
        startdate: this.state.startdate,
        first: false,
      })
      .then(() => {
        setTimeout(
          function () {
            this.setState({
              isLoadingend: false,
            });
          }.bind(this),
          1000
        );
        this.props.navigation.navigate("Mainpage");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else if (!this.state.isLoading && this.state.isLoadingend) {
      return (
        <ImageBackground
          source={require("../../images/plan.jpeg")}
          style={styles.container_image}
        >
          <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.top}>
              <Text style={styles.title}>
                {this.state.name}님만을 위한 PLAN이예요.
              </Text>
            </View>
            <Swiper
              showsButtons={true}
              autoplay={true}
              containerStyle={styles.middle}
              activeDotColor="#2866ab"
              dotColor="#eeeeee"
            >
              <View style={styles.swipe}>
                <View style={styles.list}>
                  <Text style={styles.title}>
                    2개월 PLAN{"\n"}
                    {"\n"}
                  </Text>
                  <Text style={styles.plan}>
                    {Number(this.state.plan2) > 7.5
                      ? "2개월 플랜은 무리입니다..\n 다른 플랜을 골라주세요!"
                      : this.state.time +
                        " 시간 동안 " +
                        this.state.plan2_dist +
                        " km 씩\n일주일에 " +
                        this.state.interval +
                        " 번씩 뛰어볼까요?"}
                  </Text>
                </View>
                <View style={styles.bottom}>
                  <TouchableOpacity
                    onPress={() => {
                      Number(this.state.plan2) > 7.5
                        ? this.props.navigation.navigate("Register_6")
                        : this.selectplan2();
                    }}
                  >
                    <LinearGradient
                      start={{ x: 0.1, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      colors={["#303966", "#c3cfe2"]}
                      style={styles.next_button}
                    >
                      <Text style={styles.button_text}>
                        {" "}
                        {Number(this.state.plan2) > 7.5
                          ? "목표 체중 재설정하기"
                          : "PLAN 선택"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.footer}></View>
              </View>
              <View style={styles.swipe}>
                <View style={styles.list}>
                  <Text style={styles.title}>
                    4개월 PLAN{"\n"}
                    {"\n"}
                  </Text>
                  <Text style={styles.plan}>
                    {Number(this.state.plan4) > 7.5
                      ? "4개월 플랜은 무리입니다..\n 다른 플랜을 골라주세요!"
                      : this.state.time +
                        " 시간 동안 " +
                        this.state.plan4_dist +
                        " km 씩\n일주일에 " +
                        this.state.interval +
                        " 번씩 뛰어볼까요?"}
                  </Text>
                </View>
                <View style={styles.bottom}>
                  <TouchableOpacity
                    onPress={() => {
                      Number(this.state.plan4) > 7.5
                        ? this.props.navigation.navigate("Register_6")
                        : this.selectplan4();
                    }}
                  >
                    <LinearGradient
                      start={{ x: 0.1, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      colors={["#303966", "#c3cfe2"]}
                      style={styles.next_button}
                    >
                      <Text style={styles.button_text}>
                        {Number(this.state.plan4) > 7.5
                          ? "목표 체중 재설정하기"
                          : "PLAN 선택"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.footer}></View>
              </View>
              <View style={styles.swipe}>
                <View style={styles.list}>
                  <Text style={styles.title}>
                    6개월 PLAN{"\n"}
                    {"\n"}
                  </Text>
                  <Text style={styles.plan}>
                    {Number(this.state.plan6) > 7.5
                      ? "6개월 플랜은 무리입니다..\n 다른 플랜을 골라주세요!"
                      : this.state.time +
                        " 시간 동안 " +
                        this.state.plan6_dist +
                        " km 씩\n일주일에 " +
                        this.state.interval +
                        " 번씩 뛰어볼까요?"}
                  </Text>
                </View>
                <View style={styles.bottom}>
                  <TouchableOpacity
                    onPress={() => {
                      {
                        Number(this.state.plan6) > 7.5
                          ? this.props.navigation.navigate("Register_6")
                          : this.selectplan6();
                      }
                    }}
                  >
                    <LinearGradient
                      start={{ x: 0.1, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      colors={["#303966", "#c3cfe2"]}
                      style={styles.next_button}
                    >
                      <Text style={styles.button_text}>
                        {Number(this.state.plan6) > 7.5
                          ? "목표 체중 재설정하기"
                          : "PLAN 선택"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.footer}></View>
              </View>
            </Swiper>
          </View>
        </ImageBackground>
      );
    } else if (!this.state.isLoading && !this.state.isLoadingend) {
      return <Loading />;
    }
  }
}

const styles = StyleSheet.create({
  container_image: {
    flex: 1,
  },
  container: {
    width: "100%",
    height: "100%",
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

  top: {
    flex: 2,
    justifyContent: "center",
  },
  textbox: {
    borderColor: "#e1f2fb",
    borderWidth: 3,
    borderRadius: 20,
    height: "80%",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
  title: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(28, 812),
    color: "white",
    fontWeight: "bold",
  },

  middle: {
    flex: 8.5,
    justifyContent: "center",
  },
  list: {
    flex: 11,
  },
  swipe: {
    flex: 1,
  },
  planbox: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 20,
  },
  plan: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
    color: "white",
    lineHeight: 35,
  },

  bottom: {
    flex: 3,
    justifyContent: "center",
  },
  button_text: {
    fontSize: 20,
    color: "white",
  },
  next_button: {
    borderWidth: 1,
    borderColor: "white",
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
    flex: 2,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.2 }],
    resizeMode: "center",
    aspectRatio: 1,
  },
});
