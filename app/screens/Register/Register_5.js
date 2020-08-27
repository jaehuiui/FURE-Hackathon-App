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
      gender: "",
      height: null,
      weight: null,
      age: null,
    };
    this.handleChange_gender = this.handleChange_gender.bind(this);
    this.handleChange_height = this.handleChange_height.bind(this);
    this.handleChange_weight = this.handleChange_weight.bind(this);
    this.handleChange_age = this.handleChange_age.bind(this);
  }

  handleChange_gender(newText) {
    this.setState({
      gender: newText,
    });
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
        weight: this.state.weight,
        age: this.state.age,
      })
      .then(() => {
        this.props.navigation.navigate("Register_6", {
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
                this.props.navigation.navigate("Register_4");
              }}
            />
            <Text style={styles.stage}>2/4</Text>
          </View>
          <View style={styles.top}>
            <Text style={styles.title}>
              {this.state.name} 님에 대해 알아볼까요?
            </Text>
          </View>
          <View style={styles.middle}>
            <View style={styles.inputinfo}>
              <Text style={styles.question}>성별 : </Text>
              <Input
                placeholder=""
                containerStyle={styles.inputbox}
                inputStyle={styles.inputtext}
                onChangeText={this.handleChange_gender}
              />
            </View>
            <View style={styles.inputinfo}>
              <Text style={styles.question}>신장 : </Text>
              <Input
                placeholder=""
                containerStyle={styles.inputbox}
                inputStyle={styles.inputtext}
                onChangeText={this.handleChange_height}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputinfo}>
              <Text style={styles.question}>체중 : </Text>
              <Input
                placeholder=""
                containerStyle={styles.inputbox}
                inputStyle={styles.inputtext}
                onChangeText={this.handleChange_weight}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputinfo}>
              <Text style={styles.question}>나이 : </Text>
              <Input
                placeholder=""
                containerStyle={styles.inputbox}
                inputStyle={styles.inputtext}
                onChangeText={this.handleChange_age}
                keyboardType="numeric"
              />
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
    marginVertical: RFValue(10, 812),
    flexDirection: "row",
    justifyContent: "center",
  },
  question: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(23, 812),
    top: RFValue(10, 812),
    fontWeight: "bold",
  },
  inputbox: {
    width: RFValue(150, 812),
  },
  inputtext: {
    fontSize: RFValue(20, 812),
    marginLeft: RFValue(10, 812),
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
