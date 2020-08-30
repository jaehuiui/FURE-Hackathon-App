import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Input } from "react-native-elements";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uid: "",
      weight: "",
      goal: "",
      dayperweek: 0,
      hourperday: 0,
    };
    this.handleChange_dpw = this.handleChange_dpw.bind(this);
    this.handleChange_hpd = this.handleChange_hpd.bind(this);
  }
  componentDidMount() {
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
        });
      });
  }
  handleChange_dpw(newText) {
    this.setState({
      dayperweek: newText,
    });
    console.log(this.state.dayperweek);
  }
  handleChange_hpd(newText) {
    this.setState({
      hourperday: newText,
    });
    console.log(this.state.hourperday);
  }
  selecttime() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        days: this.state.dayperweek,
        time: this.state.hourperday,
      })
      .then(() => {
        this.props.navigation.navigate("Register_8", {
          username: this.state.name,
          uid: this.state.uid,
          interval: this.state.dayperweek,
          time: this.state.hourperday,
          weight_pre: this.state.weight,
          weight_goal: this.state.goal,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.3 }}
          colors={["#bbe1fa", "white"]}
          style={styles.container}
        >
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.header}>
              <Text style={styles.stage}>4/4</Text>
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>
                {this.state.name} 님,{"\n"}
                운동에 얼마나 시간을 내실 수 있나요?
              </Text>
            </View>

            <View style={styles.middle}>
              <View style={styles.inputinfo}>
                <Text style={styles.question}>
                  일주일에 며칠 정도 운동하실 수 있나요?{"\n"}
                </Text>
                <TextInput
                  placeholder=""
                  style={styles.inputbox}
                  onChangeText={this.handleChange_dpw}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputinfo}>
                <Text style={styles.question}>
                  하루에 몇시간 정도 운동하세요?{"\n"}
                </Text>
                <TextInput
                  placeholder=""
                  style={styles.inputbox}
                  onChangeText={this.handleChange_hpd}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => {
                  if (Number(this.state.hourperday) > 24) {
                    alert("하루는 24시간인거 잊지 않으셨죠?");
                  } else if (Number(this.state.dayperweek) > 7) {
                    alert("일주일은 7일인거 잊지 않으셨죠?");
                  } else {
                    this.selecttime();
                  }
                }}
              >
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
            <KeyboardSpacer topSpacing={RFValue(0, 812)} />
          </ScrollView>
          <View style={styles.footer}>
            <Image
              source={require("../../images/logo_new.png")}
              style={styles.logo}
            ></Image>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
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
  stage: {
    textAlign: "center",
    fontSize: RFValue(18, 812),
  },

  top: {
    flex: 2,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
    marginBottom: RFValue(30, 812),
  },

  middle: {
    flex: 5.5,
    justifyContent: "center",
  },
  inputinfo: {
    marginVertical: RFValue(10, 812),
    flexDirection: "column",
    justifyContent: "center",
  },
  question: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(23, 812),
    top: RFValue(10, 812),
  },
  inputbox: {
    marginVertical: RFValue(20, 812),
    width: RFValue(150, 812),
    borderBottomWidth: 1,
    borderColor: "black",
    fontSize: RFValue(20, 812),
    alignSelf: "center",
    textAlign: "center",
    paddingBottom: 5,
  },
  inputtext: {
    fontSize: RFValue(20, 812),
    textAlign: "center",
  },

  bottom: {
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
