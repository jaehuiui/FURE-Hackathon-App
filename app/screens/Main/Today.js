import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Alert,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import axios from "axios";

export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      plan2_dist: 0,
      plan2_dist: 0,
      plan2_dist: 0,
      dpw: 0,
      tpd: 0,
      defaultplan: "",
      month: 0,
      gap_date: 0,
      today_date: "",
      dist: 0,
      new_weight: 0,
      tempature_high: 0,
      tempature_low: 0,
      weather_description: "",
      weather: "",
      icon: "",
      humidity: "",
      uri: "",
      sibal: 0,
      weight: 0,
      visible: false,
      weight_modal: 0,
      weigth_height: 0,
    };
    this.handleChangename = this.handleChangename.bind(this);
  }

  onPressOverlay() {
    this.setState({
      visible: !this.state.visible,
    });
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
          dpw: doc.data().days,
          tpd: doc.data().time,
          plan2_dist: Number(doc.data().plan2),
          plan4_dist: Number(doc.data().plan4),
          plan6_dist: Number(doc.data().plan6),
          defaultplan: Number.parseInt(doc.data().defaultplan),
          start_date: doc.data().startdate,
          weight: doc.data().goal,
          weight_modal: doc.data().weight,
          weigth_height: doc.data().height,
        });

        var timearr = this.state.start_date.split("-").map(Number);
        var date_t = new Date().getDate();
        var month_t = new Date().getMonth() + 1;
        var date_s = timearr[0];
        var month_s = timearr[1];
        var gap_date = Number(date_t - date_s);
        var gap_month = Number(month_t - month_s);
        var total_gap = gap_month * 30 + gap_date;

        this.setState({
          gap_date: Number(total_gap) + 1,
        });
        if (Number(this.state.defaultplan) == 2) {
          this.setState({
            dist: Number(this.state.plan2_dist) * 1.6 * Number(this.state.tpd),
          });
        } else if (Number(this.state.defaultplan) == 4) {
          this.setState({
            dist: Number(this.state.plan4_dist) * 1.6 * Number(this.state.tpd),
          });
        } else if (Number(this.state.defaultplan) == 6) {
          this.setState({
            dist: Number(this.state.plan6_dist) * 1.6 * Number(this.state.tpd),
          });
        }
      });

    axios({
      method: "post",
      url: "http://34.64.105.43:3389/weather/",
      data: {
        coord: {
          lon: 126.52,
          lat: 33.51,
        },
      },
    })
      .then((response) => {
        this.setState({
          weather_description: response.data.weather_description,
          weather: response.data.weather_main,
          icon: response.data.weather_icon,
          tempature_high: response.data.temp,
          humidity: response.data.humidity,
        });
        switch (response.data.weather_icon) {
          case "01d":
            this.setState({
              sibal: 0,
            });
            break;

          case "01n":
            this.setState({
              sibal: 1,
            });
            break;

          case "02d":
            this.setState({
              sibal: 2,
            });
            break;

          case "02n":
            this.setState({
              sibal: 3,
            });
            break;

          case "03d":
            this.setState({
              sibal: 4,
            });
            break;

          case "03n":
            this.setState({
              sibal: 5,
            });
            break;

          case "04d":
            this.setState({
              sibal: 6,
            });
            break;

          case "04n":
            this.setState({
              sibal: 7,
            });
            break;

          case "09d":
            this.setState({
              sibal: 8,
            });
            break;

          case "09n":
            this.setState({
              sibal: 9,
            });
            break;

          case "10d":
            this.setState({
              sibal: 10,
            });
            break;

          case "10n":
            this.setState({
              sibal: 11,
            });
            break;

          case "11d":
            this.setState({
              sibal: 12,
            });
            break;

          case "11n":
            this.setState({
              sibal: 13,
            });
            break;
          case "13d":
            this.setState({
              sibal: 14,
            });
            break;
          case "13n":
            this.setState({
              sibal: 15,
            });
            break;
          case "50d":
            this.setState({
              sibal: 16,
            });
            break;
          case "50n":
            this.setState({
              sibal: 17,
            });
            break;
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }
  handleChangename(newText) {
    this.setState({
      new_weight: newText,
    });
  }
  changeweight() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        weight_today: this.state.new_weight,
      });
    this.textInput.clear();
    if (Number(this.state.weight) >= Number(this.state.new_weight)) {
      Alert.alert(
        "목표를 달성하셨습니다",
        "축하드립니다!",
        [
          {
            text: "친구에게 공유하기",
            onPress: () => console.log("Ask me later pressed"),
          },

          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      alert("감사합니다!");
    }
  }

  render() {
    var randomImages = [
      require("../../images/icons/01d.png"),
      require("../../images/icons/01n.png"),
      require("../../images/icons/02d.png"),
      require("../../images/icons/02n.png"),
      require("../../images/icons/03d.png"),
      require("../../images/icons/03n.png"),
      require("../../images/icons/04d.png"),
      require("../../images/icons/04n.png"),
      require("../../images/icons/09d.png"),
      require("../../images/icons/09n.png"),
      require("../../images/icons/10d.png"),
      require("../../images/icons/10n.png"),
      require("../../images/icons/11d.png"),
      require("../../images/icons/11n.png"),
      require("../../images/icons/13d.png"),
      require("../../images/icons/13n.png"),
      require("../../images/icons/50d.png"),
      require("../../images/icons/50n.png"),
    ];

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Today</Text>
          </View>
          <View style={styles.top}>
            <Text style={styles.plan_title}>
              오늘은 시작한지{"  "}
              <Text style={styles.date}>{this.state.gap_date}</Text>일 째입니다
            </Text>
            <View style={styles.planbox_2}>
              <Text style={styles.plan}>
                <Text style={styles.date_1}>{this.state.defaultplan}</Text>
                개월 플랜 진행 중입니다.{"\n"}
                오늘도 <Text style={styles.date_1}>{this.state.tpd}</Text>시간
                동안{" "}
                <Text style={styles.date_1}>
                  {Number(this.state.dist).toFixed(1)}
                </Text>
                km를 뛰어볼까요?
              </Text>
              <Text style={styles.question_a}>
                {"\n"}오늘의 체중을 토대로 인공지능이{"\n"}
                <Text style={styles.plan_text_3_a_1}>
                  {this.state.name}
                </Text>{" "}
                님에 맞춰 진화합니다.
              </Text>
            </View>
          </View>
          <View style={styles.middle}>
            <View style={styles.ask}>
              <Text style={styles.question}>오늘의 체중은? {"   "}</Text>
              <TextInput
                ref={(input) => {
                  this.textInput = input;
                }}
                style={styles.nameinput}
                placeholder=""
                onChangeText={this.handleChangename}
                onSubmitEditing={Keyboard.dismiss}
                keyboardType="numeric"
              ></TextInput>
              <TouchableOpacity>
                <Text
                  style={styles.audio}
                  onPress={() => {
                    this.changeweight();
                  }}
                >
                  입력
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}>
            <Swiper
              showsButtons={true}
              autoplay={true}
              activeDotColor="#cae8d5"
              autoplayTimeout={4}
            >
              <View style={styles.planbox_c}>
                <Text style={styles.plan_text_3}>
                  <Text style={styles.plan_text_3_a_2}>{this.state.name}</Text>{" "}
                  님, 이것도 확인해보세요{"\n"}
                </Text>
                <Text style={styles.plan_text_3_a}>
                  <Text style={styles.plan_text_3_a_1}>{this.state.name}</Text>{" "}
                  님과 체형이 비슷했던{"\n"} 회원님들의 다이어트 성공기{"\n"}
                  {"\n"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressOverlay();
                  }}
                >
                  <Text style={styles.plan_text_3_b}>눌러서 확인하기</Text>
                </TouchableOpacity>
                <Overlay
                  isVisible={this.state.visible}
                  onBackdropPress={() => {
                    this.onPressOverlay();
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.3 }}
                    colors={["white", "white"]}
                    style={styles.modal}
                  >
                    <Text style={styles.modal_title}>
                      라이언님의 플랜{"\n"}
                    </Text>
                    <Text style={styles.modal_subtitle}>
                      {Number(this.state.weigth_height) - 1.3}cm /{" "}
                      {Number(this.state.weight_modal) + 1.8}kg 에서{" "}
                      {Number(this.state.weight) - 0.9}kg 로{"\n"} {"\n"} 3달
                      동안 감량에 성공하셨어요!{"\n"}
                      {"\n"}
                    </Text>
                    <Text style={styles.modal_title}>엘사님의 플랜{"\n"}</Text>
                    <Text style={styles.modal_subtitle}>
                      {Number(this.state.weigth_height) + 0.2}cm /{" "}
                      {(Number(this.state.weight_modal) + 0.6).toFixed(1)}kg
                      에서 {Number(this.state.weight) - 0.2}kg 로{"\n"} {"\n"}{" "}
                      4달 동안 감량에 성공하셨어요!
                    </Text>
                    <Text style={styles.modal_content}></Text>
                  </LinearGradient>
                </Overlay>
              </View>
              <View style={styles.planbox_a}>
                <View style={styles.weather}>
                  <Image
                    source={randomImages[Number(this.state.sibal)]}
                    style={styles.logo}
                  ></Image>
                  <View style={styles.weather_box}>
                    <Text style={styles.plan_text}>
                      현재 온도 : {this.state.tempature_high}도{"\n"}
                    </Text>
                    <Text style={styles.plan_text}>
                      현재 습도 : {this.state.humidity}%{"\n"}
                    </Text>
                    <Text style={styles.plan_text}>
                      날씨 정보 : {this.state.weather_description}
                      {"\n"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.planbox_b}>
                <ImageBackground
                  source={require("../../images/15.jpeg")}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                    overflow: "hidden",
                    alignSelf: "center",
                    justifyContent: "center",
                    opacity: 0.7,
                  }}
                >
                  <View style={styles.planbox_test}>
                    <Text style={styles.plan_text_2}>
                      브랜드 별 런닝화 추천 5
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </Swiper>
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
                <Text style={styles.button_text}>운동 시작</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  title: {
    marginTop: RFValue(15, 812),
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
    marginLeft: RFValue(30, 812),
    marginBottom: RFValue(5, 812),
  },

  top: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  plan: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
    lineHeight: RFValue(35, 812),
  },
  date_1: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
    fontWeight: "500",
    color: "#0b409c",
  },
  weather_box: {
    height: "100%",
    marginTop: RFValue(10, 812),
  },

  plan_title: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
    marginBottom: RFValue(10, 812),
    fontWeight: "500",
  },
  date: {
    textAlign: "center",
    fontSize: RFValue(30, 812),
    marginBottom: RFValue(10, 812),
    fontWeight: "bold",
    color: "#0b409c",
  },
  planbox_2: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eeeeee",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  middle: {
    flex: 3,
    justifyContent: "center",
  },
  ask: {
    flexDirection: "row",
    justifyContent: "center",
  },
  question: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
  },
  question_a: {
    textAlign: "center",
    fontSize: RFValue(17, 812),
  },
  audio: {
    textAlign: "center",
    fontSize: RFValue(20, 812),
    color: "#0b409c",
    fontWeight: "600",
  },
  nameinput: {
    marginHorizontal: RFValue(10, 812),
    borderColor: "gray",
    borderBottomWidth: 1,
    width: RFValue(100, 812),
    fontSize: RFValue(20, 812),
    textAlign: "center",
    alignSelf: "center",
  },

  bottom: {
    flex: 7,
  },
  plan_text: {
    fontSize: RFValue(20, 812),
    fontWeight: "600",
    color: "white",
  },
  plan_text_2: {
    textAlign: "center",

    fontSize: RFValue(25, 812),
    fontWeight: "600",
    color: "white",
  },
  plan_text_3: {
    textAlign: "center",
    fontSize: RFValue(23, 812),
    fontWeight: "600",
    color: "white",
  },
  plan_text_3_a: {
    textAlign: "center",
    fontSize: RFValue(17, 812),
    fontWeight: "600",
    color: "white",
  },
  plan_text_3_a_1: {
    color: "#76B4FF",
    fontSize: RFValue(20, 812),
    fontWeight: "600",
  },
  plan_text_3_a_2: {
    color: "#76B4FF",
    fontSize: RFValue(28, 812),
    fontWeight: "600",
  },
  plan_text_3_b: {
    textAlign: "center",
    fontSize: RFValue(15, 812),
    color: "#eeeeee",
  },
  weather: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modal: {
    height: RFValue(450, 812),
    width: RFValue(300, 812),
    justifyContent: "center",
  },
  modal_title: {
    textAlign: "center",
    fontSize: RFValue(23, 812),
    fontWeight: "600",
  },
  modal_subtitle: {
    textAlign: "center",
    fontSize: RFValue(17, 812),
    fontWeight: "600",
  },
  logo: {
    marginTop: RFValue(20, 812),
  },
  planbox_a: {
    width: "90%",
    height: "90%",
    backgroundColor: "#408ab4",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#87a8d0",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  planbox_b: {
    width: "90%",
    height: "90%",

    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "gray",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "flex-end",
  },
  planbox_c: {
    width: "90%",
    height: "90%",
    backgroundColor: "#283e56",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#9692af",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  planbox_test: {
    width: "100%",
    height: "100%",
    backgroundColor: (255, 255, 255, 1),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    alignSelf: "center",
    justifyContent: "center",
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
