import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, CheckBox } from "react-native-elements";

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.username,
      ability: "",
      checked: "",
    };
    this.selectability = this.selectability.bind(this);
  }
  selectability() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        ability: this.state.checked,
      })
      .then(() => {
        this.props.navigation.navigate("Register_4", {
          username: this.state.name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
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
              this.props.navigation.navigate("Register_2");
            }}
          />
          <Text style={styles.stage}>1/5</Text>
        </View>
        <View style={styles.top}>
          <Text style={styles.title}>
            {this.state.name} 님,{"\n"}한 번에 얼마나 달리실 수 있나요?
          </Text>
        </View>
        <View style={styles.middle}>
          <View style={styles.test}>
            <CheckBox
              title="최대 1km"
              checked={this.state.checked === "opt1"}
              containerStyle={styles.box}
              textStyle={styles.check_text}
              onPress={() => {
                this.setState({
                  checked: "opt1",
                });
              }}
            ></CheckBox>
          </View>
          <View style={styles.test}>
            <CheckBox
              title="최대 3km"
              checked={this.state.checked === "opt2"}
              containerStyle={styles.box}
              textStyle={styles.check_text}
              onPress={() => {
                this.setState({
                  checked: "opt2",
                });
              }}
            ></CheckBox>
          </View>
          <View style={styles.test}>
            <CheckBox
              title="3km 이상"
              checked={this.state.checked === "opt3"}
              containerStyle={styles.box}
              textStyle={styles.check_text}
              onPress={() => {
                this.setState({
                  checked: "opt3",
                });
              }}
            ></CheckBox>
          </View>
          <View style={styles.test}>
            <CheckBox
              title="잘 모르겠어요"
              checked={this.state.checked === "opt4"}
              containerStyle={styles.box}
              textStyle={styles.check_text}
              onPress={() => {
                this.setState({
                  checked: "opt4",
                });
              }}
            ></CheckBox>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              this.selectability();
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
    flex: 1.5,
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
  test: {
    width: "90%",
    height: "20%",
    alignSelf: "center",
    marginBottom: RFValue(15, 812),
  },
  box: {
    height: "100%",
    width: "100%",
    right: 10,
    backgroundColor: (255, 255, 255, 1),
    justifyContent: "center",
  },
  check_text: {
    fontSize: RFValue(20, 812),
    color: "black",
  },

  //bottom
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
