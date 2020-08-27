import React, { Component } from "react";
import { Text, StyleSheet, View, Image, ImageBackground } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import axios from "axios";
import Loading from "../Main/Loading";
import { ThemeProvider } from "@react-navigation/native";

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.username,
      uid: this.props.route.params.userid,
      interval: this.props.route.params.interval,
      time: this.props.route.params.time,
      weight: this.props.route.params.weight_pre,
      goal: this.props.route.params.weight_goal,
      gap: 0,
      plan2: "",
      plan4: "",
      plan6: "",
      plan2_dist: "",
      plan4_dist: "",
      plan6_dist: "",
      isLoading: true,
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

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon
              name="arrow-left"
              size={30}
              type="material-community"
              style={styles.backicon}
              onPress={() => {
                this.props.navigation.navigate("Register_7");
              }}
            />
          </View>
          <View style={styles.top}>
            <View style={styles.textbox}>
              <Text style={styles.title}>
                FU:RE가 제안하는{"\n"}
                {this.state.name}님의 운동 계획입니다.
              </Text>
            </View>
          </View>
          <View style={styles.middle}>
            <View style={styles.planbox}>
              <Text style={styles.plan}>
                {this.state.gap}kg 감량을 위한 2달짜리 계획입니다.{"\n"}
                일주일에 {this.state.interval}번씩, 하루에 {this.state.time}
                시간만큼{"\n"}
                {this.state.plan2_dist}km를 달려보세요!{"\n"}
              </Text>
              <Text style={styles.plan}>
                {this.state.gap}kg 감량을 위한 4달짜리 계획입니다.{"\n"}
                일주일에 {this.state.interval}번씩, 하루에 {this.state.time}
                시간만큼{"\n"}
                {this.state.plan4_dist}km를 달려보세요!{"\n"}
              </Text>
              <Text style={styles.plan}>
                {this.state.gap}kg 감량을 위한 6달짜리 계획입니다.{"\n"}
                일주일에 {this.state.interval}번씩, 하루에 {this.state.time}
                시간만큼{"\n"}
                {this.state.plan6_dist}km를 달려보세요!{"\n"}
              </Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.title}>
              FU:RE 가 {this.state.name}님과 함께할게요!
            </Text>
          </View>
          <View style={styles.footer}>
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
    fontSize: RFValue(23, 812),
  },

  middle: {
    flex: 5.5,
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
    fontSize: RFValue(20, 812),
  },

  bottom: {
    flex: 1.5,
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
