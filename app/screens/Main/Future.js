import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      msg: "",
      i1: false,
      i2: false,
      i3: false,
      i4: false,
      i5: false,
      i6: false,
    };
    this.handleChangeemail = this.handleChangeemail.bind(this);
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
          plan2_dist: Number(doc.data().plan2) * Number(this.state.tpd),
          plan4_dist: Number(doc.data().plan4) * Number(this.state.tpd),
          plan6_dist: Number(doc.data().plan6) * Number(this.state.tpd),
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
  handleChangeemail(newText) {
    this.setState({
      msg: newText,
    });
  }
  changeweight() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("Feedback")
      .doc(user.uid)
      .set({
        feedback: this.state.msg,
      });
    this.textInput.clear();
    alert("감사합니다!");
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Future</Text>
          </View>
          <View style={styles.top}>
            <Text style={styles.plan_title}>PLAN 피드백</Text>
            <View style={styles.planbox}>
              <View style={styles.array}>
                <Icon
                  name="plus"
                  size={40}
                  color={this.state.i1 ? "#0074e4" : "black"}
                  type="material-community"
                  onPress={() => {
                    if (!this.state.i1 && !this.state.i2) {
                      this.setState({
                        i1: !this.state.i1,
                      });
                    } else if (this.state.i2 && !this.state.i1)
                      this.setState({
                        i1: !this.state.i1,
                        i2: !this.state.i2,
                      });
                    else if (!this.state.i2) {
                      this.setState({
                        i1: !this.state.i1,
                      });
                    }
                  }}
                />

                <View style={styles.feedbox}>
                  <Text style={styles.feed}>강도</Text>
                </View>
                <Icon
                  name="minus"
                  size={40}
                  color={this.state.i2 ? "#0074e4" : "black"}
                  type="material-community"
                  onPress={() => {
                    if (!this.state.i1 && !this.state.i2) {
                      this.setState({
                        i2: !this.state.i2,
                      });
                    } else if (this.state.i1 && !this.state.i2)
                      this.setState({
                        i1: !this.state.i1,
                        i2: !this.state.i2,
                      });
                    else if (!this.state.i1) {
                      this.setState({
                        i2: !this.state.i2,
                      });
                    }
                  }}
                />
              </View>
              <View style={styles.array}>
                <Icon
                  name="plus"
                  size={40}
                  color={this.state.i3 ? "#0074e4" : "black"}
                  type="material-community"
                  onPress={() => {
                    if (!this.state.i3 && !this.state.i4) {
                      this.setState({
                        i3: !this.state.i3,
                      });
                    } else if (this.state.i4 && !this.state.i3)
                      this.setState({
                        i3: !this.state.i3,
                        i4: !this.state.i4,
                      });
                    else if (!this.state.i4) {
                      this.setState({
                        i3: !this.state.i3,
                      });
                    }
                  }}
                />

                <View style={styles.feedbox}>
                  <Text style={styles.feed}>시간</Text>
                </View>
                <Icon
                  name="minus"
                  size={40}
                  color={this.state.i4 ? "#0074e4" : "black"}
                  type="material-community"
                  onPress={() => {
                    if (!this.state.i3 && !this.state.i4) {
                      this.setState({
                        i4: !this.state.i4,
                      });
                    } else if (this.state.i3 && !this.state.i4)
                      this.setState({
                        i3: !this.state.i3,
                        i4: !this.state.i4,
                      });
                    else if (!this.state.i3) {
                      this.setState({
                        i4: !this.state.i4,
                      });
                    }
                  }}
                />
              </View>
              <View style={styles.array}>
                <Icon
                  name="plus"
                  size={40}
                  color={this.state.i5 ? "#0074e4" : "black"}
                  type="material-community"
                  onPress={() => {
                    if (!this.state.i5 && !this.state.i6) {
                      this.setState({
                        i5: !this.state.i5,
                      });
                    } else if (this.state.i6 && !this.state.i5)
                      this.setState({
                        i5: !this.state.i5,
                        i6: !this.state.i6,
                      });
                    else if (!this.state.i6) {
                      this.setState({
                        i5: !this.state.i5,
                      });
                    }
                  }}
                />

                <View style={styles.feedbox}>
                  <Text style={styles.feed}>빈도</Text>
                </View>
                <Icon
                  name="minus"
                  size={40}
                  color={this.state.i6 ? "#0074e4" : "black"}
                  type="material-community"
                  onPress={() => {
                    if (!this.state.i5 && !this.state.i6) {
                      this.setState({
                        i6: !this.state.i6,
                      });
                    } else if (this.state.i5 && !this.state.i6)
                      this.setState({
                        i5: !this.state.i5,
                        i6: !this.state.i6,
                      });
                    else if (!this.state.i5) {
                      this.setState({
                        i6: !this.state.i6,
                      });
                    }
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  alert("준비중인 서비스입니다.");
                }}
              >
                <Text style={styles.feedtitle}>플랜 업데이트</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.feed_question}></Text>
            <Text style={styles.plan}></Text>
          </View>
          <View style={styles.middle}></View>

          <ScrollView scrollEnabled={false}>
            <View style={styles.bottom}>
              <View style={styles.form}>
                <Text style={styles.inputinfo}>FU:RE한테 전하는 메시지</Text>
                <View style={styles.input_box}>
                  <TextInput
                    style={styles.input_text}
                    ref={(input) => {
                      this.textInput = input;
                    }}
                    placeholder="어떤 내용이라도 환영합니다!"
                    onChangeText={this.handleChangeemail}
                  ></TextInput>
                </View>
              </View>
            </View>
            <KeyboardSpacer topSpacing={RFValue(-130, 812)} />
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                this.changeweight();
              }}
            >
              <LinearGradient
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#303966", "#c3cfe2"]}
                style={styles.next_button}
              >
                <Text style={styles.button_text}>피드백 보내기</Text>
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
    flex: 12,
    justifyContent: "center",
  },
  plan_title: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
    marginBottom: RFValue(10, 812),
    fontWeight: "500",
  },
  planbox: {
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
  feedtitle: {
    marginTop: RFValue(20, 812),
    textAlign: "center",
    fontSize: RFValue(20, 812),
    fontWeight: "700",
    color: "#1b3c68",
  },
  middle: {
    flex: 0,
  },
  array: {
    marginTop: RFValue(30, 812),
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "13%",
  },
  feedbox: {
    height: "70%",
    width: "30%",
    backgroundColor: "#78bbe6",
    borderRadius: 12,
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#eeeeee",
  },
  feed: {
    textAlign: "center",
    color: "white",
    fontSize: RFValue(20, 812),
    fontWeight: "600",
  },

  bottom: {
    flex: 4,
    justifyContent: "center",
  },
  form: {
    marginTop: RFValue(20, 812),
    height: "90%",
  },
  inputinfo: {
    marginLeft: RFValue(25, 812),
    fontSize: RFValue(18, 812),
    fontWeight: "500",
  },

  input_box: {
    flex: 1,
    height: RFValue(60, 812),
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#fdfbfb",
    marginVertical: 5,
    marginHorizontal: 20,
    alignSelf: "stretch",
    marginBottom: 30,
    justifyContent: "center",
  },

  input_text: {
    flex: 6,
    fontSize: RFValue(15, 812),
    color: "black",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
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
