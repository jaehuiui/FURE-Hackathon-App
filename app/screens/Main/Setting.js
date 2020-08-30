import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      email: "",
      count: 0,
    };
  }

  async componentDidMount() {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .onSnapshot((doc) => {
        this.setState({
          name: doc.data().name,
          email: user.email,
        });
      });
  }

  onPressReset() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        reset_status: true,
      })
      .then(() => {
        this.props.navigation.navigate("Register_2", {
          username: this.state.name,
          uid: this.state.uid,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillUnmount() {
    this.setState({
      count: 0,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Setting</Text>
        </View>
        <View style={styles.top}>
          <View style={styles.profile}>
            <Text style={styles.profile_title}>유저 정보{"\n"}</Text>
            <Text style={styles.info}>
              <Text style={styles.name_t}>닉네임 : </Text>
              <Text style={styles.name}>
                {this.state.name}
                {"\n"}
              </Text>
            </Text>
            <Text style={styles.info}>
              <Text style={styles.name_t}>이메일 : </Text>
              <Text style={styles.name}>
                {this.state.email}
                {"\n"}
              </Text>
            </Text>
            <Text style={styles.info}>
              <Text style={styles.name_t}>등급 : </Text>
              <Text style={styles.name}>
                일반 회원
                {"\n"}
              </Text>
            </Text>
            <Text style={styles.info}>
              <Text style={styles.name_t}>연동 웨어러블 기기 : </Text>
              <Text style={styles.name}>
                없음
                {"\n"}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.props.navigation.navigate("SignIn");
                  })
                  .catch(function (error) {
                    // An error happened.
                  });
              }}
            >
              <Text style={styles.name_l}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middle}>
          <View style={styles.teaminfo}>
            <Image
              source={require("../../images/logo_new.png")}
              style={styles.logo}
            ></Image>
            <Text style={styles.team}>FU:RE 1.0.5 ver</Text>
            <Text style={styles.team}>Co-Founder : Koo, Oh, Lee</Text>
            <Text style={styles.copy}>Copyright All Rights Reserved 2020</Text>
          </View>
        </View>
        <View style={styles.bottom}></View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              if (this.state.count == 0) {
                alert("기존 플랜이 초기화됩니다!");
                this.setState({
                  count: this.state.count + 1,
                });
              } else if (this.state.count == 1) {
                this.onPressReset();
              }
            }}
          >
            <LinearGradient
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              colors={["#303966", "#c3cfe2"]}
              style={styles.next_button}
            >
              <Text style={styles.button_text}>PLAN 다시 세우기</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 3,
    justifyContent: "center",
  },
  profile_title: {
    marginTop: RFValue(15, 812),
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    marginTop: RFValue(15, 812),
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
    marginLeft: RFValue(30, 812),
    marginBottom: RFValue(5, 812),
  },
  top: {
    flex: 8.5,
    justifyContent: "center",
  },
  profile: {
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  info: {
    marginLeft: RFValue(20, 812),
  },
  name_t: {
    fontSize: RFValue(17, 812),
    fontWeight: "bold",
    marginTop: RFValue(15, 812),
  },
  name_l: {
    fontSize: RFValue(20, 812),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: RFValue(20, 812),
    color: "#1b3c59",
  },
  name: {
    fontSize: RFValue(15, 812),

    marginTop: RFValue(20, 812),
  },
  middle: {
    flex: 7.5,
  },
  teaminfo: {
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  logo: {
    aspectRatio: 1,
  },
  team: {
    textAlign: "center",
    fontSize: RFValue(16, 812),
    marginBottom: RFValue(10, 812),
    fontWeight: "600",
  },
  copy: {
    textAlign: "center",
    fontSize: RFValue(15, 812),
    marginTop: RFValue(30, 812),
  },
  bottom: {
    flex: 0,
  },

  //footer
  footer: {
    flex: 2,
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
