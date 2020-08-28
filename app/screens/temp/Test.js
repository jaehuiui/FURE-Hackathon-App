import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import axios from "axios";
import Loading from "../Main/Loading";
import { ThemeProvider } from "@react-navigation/native";
import Swiper from "react-native-swiper";

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: "",
      selectplan: "",
    };
  }

  selectplan() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        plan2: this.state.plan2,
        plan4: this.state.plan2,
        plan6: this.state.plan2,
      })
      .then(() => {
        this.props.navigation.navigate("Mainpage", {
          username: this.state.name,
          uid: this.state.uid,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Swiper
        showsButtons={true}
        autoplay={false}
        onIndexChanged={(index) => {
          console.log("index >>> ", index);
        }}
      >
        <View style={styles.container}>
          <ImageBackground
            source={require("../../images/plan.jpeg")}
            style={styles.background}
          >
            <View style={styles.header}>
              <Icon
                name="arrow-left"
                color="white"
                size={30}
                type="material-community"
                style={styles.backicon}
                onPress={() => {
                  this.props.navigation.navigate("Register_7");
                }}
              />
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>
                {this.state.name}님만을 위한 플랜입니다.
              </Text>
            </View>
            <View style={styles.middle}>
              <View style={styles.planbox}>
                <Text style={styles.plan}>
                  {" "}
                  {this.state.gap}kg 감량을 위한 2달짜리 계획입니다.{"\n"}
                  일주일에 {this.state.interval}번씩, 하루에 {this.state.time}
                  시간만큼{"\n"}
                  {this.state.plan2_dist}km를 달려보세요!{"\n"}
                </Text>
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={() => {}}>
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
            <View style={styles.footer}></View>
          </ImageBackground>
        </View>
        <View style={styles.container}>
          <View style={styles.top_layer_2}>
            <Text style={{ textAlign: "center" }}>Top Layer</Text>
          </View>
          <View style={styles.middle_layer_2}>
            <Text style={{ textAlign: "center" }}>Second Page</Text>
          </View>
          <View style={styles.bottom_layer_2}>
            <Text
              style={styles.skip}
              onPress={() => {
                this.props.navigation.navigate("Mainpage");
              }}
            >
              Skip
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text>Test</Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    height: "100%",
    width: "100%",
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
    fontSize: RFValue(25, 812),
    color: "white",
  },

  middle: {
    flex: 5.5,
    justifyContent: "center",
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

  // footer
  footer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.2 }],
    resizeMode: "center",
    aspectRatio: 1,
  },

  next: {
    color: "white",
  },
});
