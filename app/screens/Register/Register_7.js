import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Input } from "react-native-elements";

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.username,
      dayperweek: null,
      hourperday: null,
    };
    this.handleChange_dpw = this.handleChange_dpw.bind(this);
    this.handleChange_hpd = this.handleChange_hpd.bind(this);
  }
  handleChange_dpw(newText) {
    this.setState({
      dayperweek: newText,
    });
  }
  handleChange_hpd(newText) {
    this.setState({
      hourperday: newText,
    });
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
        dayperweek: this.state.dayperweek,
        hourperday: this.state.hourperday,
      })
      .then(() => {
        this.props.navigation.navigate("Register_8", {
          username: this.state.name,
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
          <View style={styles.header}>
            <Icon
              name="arrow-left"
              size={30}
              type="material-community"
              style={styles.backicon}
              onPress={() => {
                this.props.navigation.navigate("Register_6");
              }}
            />
            <Text style={styles.stage}>5/5</Text>
          </View>
          <View style={styles.top}>
            <Text style={styles.title}>
              {this.state.name} 님,{"\n"}
              운동에 얼마나 시간을 내실 수 있나요?
            </Text>
          </View>
          <View style={styles.middle}>
            <View style={styles.inputinfo}>
              <Input
                placeholder=""
                containerStyle={styles.inputbox}
                inputStyle={styles.inputtext}
                onChangeText={this.handleChange_age}
                keyboardType="numeric"
              />
              <Text style={styles.question}> 회 / 일주일 </Text>
            </View>

            <View style={styles.inputinfo}>
              <Input
                placeholder=""
                containerStyle={styles.inputbox}
                inputStyle={styles.inputtext}
                onChangeText={this.handleChange_age}
                keyboardType="numeric"
              />
              <Text style={styles.question}> 시간 / 회 </Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => {
                this.selecttime();
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
  },

  middle: {
    flex: 5.5,
    justifyContent: "center",
  },
  inputinfo: {
    marginVertical: RFValue(10, 812),
    flexDirection: "row",
    justifyContent: "center",
  },
  question: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(23, 812),
    top: RFValue(10, 812),
  },
  inputbox: {
    width: RFValue(150, 812),
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
