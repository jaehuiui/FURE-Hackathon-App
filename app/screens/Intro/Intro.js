import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Swiper from "react-native-swiper";
import firebase from "firebase";
import "firebase/firestore";

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          status: true,
        });
      } else {
        this.setState({
          status: false,
        });
      }
    });
  }

  render() {
    if (this.state.status) {
      return (
        <View style={styles.container}>
          <View style={styles.top_layer_2}>
            <View style={styles.logo_box_2}>
              <Image
                source={require("../../images/new_logo.png")}
                style={styles.logo_2}
              ></Image>
            </View>
          </View>
          <View style={styles.middle_layer_2}>
            <Text style={styles.mission}>
              <Text style={styles.explanation_1}>Aim</Text>
              <Text style={styles.explanation}> your </Text>
              <Text style={styles.explanation_1}>Fit</Text>
              {"\n"}
              <Text style={styles.explanation_1}>Run</Text>
              <Text style={styles.explanation}> to your future</Text>
            </Text>
          </View>
          <View style={styles.bottom_layer_2}>
            <Text
              style={styles.skip_2}
              onPress={() => {
                this.props.navigation.navigate("Mainpage");
              }}
            >
              시작하기
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <Swiper autoplay={true} autoplayTimeout={5}>
          <View style={styles.container}>
            <View style={styles.middle_layer}>
              <Text style={styles.explanation}>일률적인{"\n"}</Text>
              <Text style={styles.explanation}>
                몇 km 달리기 다이어트에 지치셨나요?{"\n"}
              </Text>
              <Text style={styles.explanation}>
                살뺀다고 무작정 달리고 계시진 않나요?{"\n"}
                {"\n"}
                {"\n"}
              </Text>
              <Text style={styles.mission}>
                <Text style={styles.explanation}>거리나 시간은 </Text>
                <Text style={styles.explanation_1}>수단</Text>
                <Text style={styles.explanation}>일 뿐이에요.{"\n"}</Text>
              </Text>
              <Text style={styles.mission}>
                <Text style={styles.explanation_1}>목적</Text>
                <Text style={styles.explanation}>은 체중감량이죠.</Text>
              </Text>
              <Text>{"\n"}</Text>
            </View>
            <View style={styles.bottom_layer}>
              <View style={styles.logo_box}>
                <Image
                  source={require("../../images/new_logo.png")}
                  style={styles.logo}
                ></Image>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.middle_layer_1}>
              <Text style={styles.mission}>
                <Text style={styles.explanation_1}>FU:RE 인공지능</Text>
                <Text style={styles.explanation}>은{"\n"}</Text>
              </Text>
              <Text style={styles.mission}>
                <Text style={styles.explanation}>당신은 </Text>
                <Text style={styles.explanation_1}>목적</Text>
                <Text style={styles.explanation}>인{"\n"}</Text>
              </Text>
              <Text style={styles.explanation}>체중 감량에 초점하여{"\n"}</Text>
              <Text style={styles.explanation}>
                맞춤 플랜을 제시합니다{"\n"}
                {"\n"}
                {"\n"}
              </Text>
              <Text style={styles.mission}>
                <Text style={styles.explanation_1}>성공적인 러닝 다이어트</Text>
                <Text style={styles.explanation}>
                  를 도울게요{"\n"}
                  {"\n"}
                </Text>
              </Text>

              <Text>{"\n"}</Text>
            </View>
            <View style={styles.bottom_layer_1}>
              <Text
                style={styles.skip}
                onPress={() => {
                  this.props.navigation.navigate("SignIn");
                }}
              >
                시작하기
              </Text>
            </View>
          </View>
        </Swiper>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  top_layer_2: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  middle_layer_2: {
    flex: 4,
    alignItems: "center",
  },
  bottom_layer_2: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RFValue(50, 812),
  },
  logo_box_2: {
    justifyContent: "center",
    alignItems: "center",
  },
  //Inner Layer 1
  logo_2: {
    alignSelf: "center",
    transform: [{ scale: 0.6 }],
    resizeMode: "center",
    aspectRatio: 1,
  },
  skip_2: {
    fontSize: RFValue(22, 812),
    fontWeight: "600",
    color: "gray",
    textAlign: "center",
  },

  middle_layer: {
    flex: 7,
    justifyContent: "center",
  },
  bottom_layer: {
    flex: 3,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.35 }],
    resizeMode: "center",
    aspectRatio: 1,
  },
  //Page 1
  top_layer_1: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  middle_layer_1: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom_layer_1: {
    flex: 2,
    justifyContent: "center",

    marginBottom: RFValue(50, 812),
  },
  mission: {
    textAlign: "center",
  },
  logo_box: {
    justifyContent: "center",
    alignItems: "center",
  },
  //Inner Layer 1

  explanation: {
    fontSize: RFValue(22, 812),
    textAlign: "center",
    color: "gray",
  },
  explanation_1: {
    fontSize: RFValue(22, 812),
    textAlign: "center",
    color: "#76B4FF",
  },
  skip: {
    fontSize: RFValue(25, 812),
    color: "#393e46",
    textAlign: "center",
    fontWeight: "bold",
  },
});
