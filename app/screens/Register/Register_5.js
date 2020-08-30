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

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uid: "",
      gender: "",
      height: null,
      weight: null,
      age: null,
      real_gender: "",
    };
    this.handleChange_gender = this.handleChange_gender.bind(this);
    this.handleChange_height = this.handleChange_height.bind(this);
    this.handleChange_weight = this.handleChange_weight.bind(this);
    this.handleChange_age = this.handleChange_age.bind(this);
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

  handleChange_gender(newText) {
    if (newText === "남자") {
      this.setState({
        gender: "M",
      });
    } else if (newText === "여자") {
      this.setState({
        gender: "W",
      });
    }
  }
  handleChange_height(newText) {
    this.setState({
      height: newText,
    });
  }
  handleChange_weight(newText) {
    this.setState({
      weight: newText,
    });
  }
  handleChange_age(newText) {
    this.setState({
      age: newText,
    });
  }

  getbodyData() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();

    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        gender: this.state.gender,
        height: this.state.height,
        weight_today: this.state.weight,
        weight: this.state.weight,
        age: this.state.age,
      })
      .then(() => {
        this.props.navigation.navigate("Register_6", {
          username: this.state.name,
          uid: this.state.uid,
          weight_pre: this.state.weight,
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
              <Text style={styles.stage}>2/4</Text>
            </View>

            <View style={styles.top}>
              <Text style={styles.title}>
                {this.state.name} 님에 대해 알아볼까요?
              </Text>
            </View>
            <View style={styles.middle}>
              <View style={styles.inputinfo}>
                <Text style={styles.question}>
                  성별{"    "}:{"      "}
                </Text>
                <TextInput
                  placeholder="남자/여자"
                  style={styles.inputbox}
                  onChangeText={this.handleChange_gender}
                />
                <Text style={styles.question}>{"       "} </Text>
              </View>
              <View style={styles.inputinfo}>
                <Text style={styles.question}>
                  신장{"    "}:{"      "}
                </Text>
                <TextInput
                  placeholder=""
                  style={styles.inputbox}
                  onChangeText={this.handleChange_height}
                  keyboardType="numeric"
                />
                <Text style={styles.question}>{"  "}cm</Text>
              </View>
              <View style={styles.inputinfo}>
                <Text style={styles.question}>
                  체중{"    "}:{"      "}
                </Text>
                <TextInput
                  placeholder=""
                  style={styles.inputbox}
                  onChangeText={this.handleChange_weight}
                  keyboardType="numeric"
                />
                <Text style={styles.question}>{"   "}kg</Text>
              </View>
              <View style={styles.inputinfo}>
                <Text style={styles.question}>
                  나이{"    "}:{"      "}
                </Text>
                <TextInput
                  placeholder=""
                  style={styles.inputbox}
                  onChangeText={this.handleChange_age}
                  keyboardType="numeric"
                />
                <Text style={styles.question}>{"    "}세</Text>
              </View>
            </View>

            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => {
                  this.getbodyData();
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

  //top
  top: {
    flex: 2,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: RFValue(25, 812),
  },

  //middle
  middle: {
    flex: 5.5,
  },
  inputinfo: {
    marginVertical: RFValue(20, 812),
    flexDirection: "row",
    justifyContent: "center",
  },
  question: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(23, 812),
    fontWeight: "bold",
  },
  inputbox: {
    width: RFValue(150, 812),
    fontSize: RFValue(23, 812),
    borderBottomWidth: 1,
    textAlign: "center",
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
