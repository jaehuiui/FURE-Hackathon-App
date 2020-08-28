import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, CheckBox } from "react-native-elements";

export default class Register_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uid: "",
      purpose: "",
      checked: "",
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
    };
    this.selectpurpose = this.selectpurpose.bind(this);
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

  selectpurpose() {
    const user = firebase.auth().currentUser;
    const data = firebase.firestore();
    data
      .collection("users")
      .doc("App")
      .collection("info")
      .doc(user.uid)
      .update({
        purpose: this.state.checked,
      })
      .then(() => {
        this.props.navigation.navigate("Register_4", {
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            type="material-community"
            style={styles.backicon}
            onPress={() => {
              this.props.navigation.navigate("Register_1");
            }}
          />
        </View>
        <View style={styles.top}>
          <View style={styles.textbox}>
            <Text style={styles.title}>
              {this.state.name} 님, 반갑습니다.{"\n"}
              {this.state.name} 님의 러닝 목적은 무엇인가요?
            </Text>
          </View>
        </View>
        <View style={styles.middle}>
          <View style={styles.test}>
            <ImageBackground
              source={require("../../images/1.png")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                overflow: "hidden",
                alignSelf: "center",
                justifyContent: "center",
                opacity: this.state.checked === "opt1" ? 0.8 : 0.3,
              }}
            >
              <CheckBox
                title="체중 감량"
                checked={this.state.checked === "opt1"}
                containerStyle={styles.box}
                textStyle={styles.check_text}
                onPress={() => {
                  this.setState({
                    checked: "opt1",
                    count1: this.state.count1 + 1,
                  });
                  if (this.state.count1 > 1) {
                    this.selectpurpose();
                  }
                }}
              ></CheckBox>
            </ImageBackground>
          </View>
          <View style={styles.test}>
            <ImageBackground
              source={require("../../images/2.png")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                overflow: "hidden",
                alignSelf: "center",
                justifyContent: "center",
                opacity: this.state.checked === "opt2" ? 0.8 : 0.3,
              }}
            >
              <CheckBox
                title="건강 증진"
                checked={this.state.checked === "opt2"}
                containerStyle={styles.box}
                textStyle={styles.check_text}
                onPress={() => {
                  this.setState({
                    checked: "opt2",
                    count2: this.state.count2 + 1,
                  });
                  if (this.state.count2 > 1) {
                    this.selectpurpose();
                  }
                }}
              ></CheckBox>
            </ImageBackground>
          </View>
          <View style={styles.test}>
            <ImageBackground
              source={require("../../images/3.png")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                overflow: "hidden",
                alignSelf: "center",
                justifyContent: "center",
                opacity: this.state.checked === "opt3" ? 0.8 : 0.3,
              }}
            >
              <CheckBox
                title="근력 운동 전후 루틴"
                checked={this.state.checked === "opt3"}
                containerStyle={styles.box}
                textStyle={styles.check_text}
                onPress={() => {
                  this.setState({
                    checked: "opt3",
                    count3: this.state.count3 + 1,
                  });
                  if (this.state.count3 > 1) {
                    this.selectpurpose();
                  }
                }}
              ></CheckBox>
            </ImageBackground>
          </View>
          <View style={styles.test}>
            <ImageBackground
              source={require("../../images/4.png")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                overflow: "hidden",
                alignSelf: "center",
                justifyContent: "center",
                opacity: this.state.checked === "opt4" ? 0.8 : 0.3,
              }}
            >
              <CheckBox
                title="체중 유지"
                checked={this.state.checked === "opt4"}
                containerStyle={styles.box}
                textStyle={styles.check_text}
                onPress={() => {
                  this.setState({
                    checked: "opt4",
                    count4: this.state.count4 + 1,
                  });
                  if (this.state.count4 > 1) {
                    this.selectpurpose();
                  }
                }}
              ></CheckBox>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.footer}>
          <Image
            source={require("../../images/logo_new.png")}
            style={styles.logo}
          ></Image>
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

  // header
  header: {
    flex: 1.5,
    justifyContent: "center",
  },
  backicon: {
    alignSelf: "flex-start",
    left: 30,
  },

  //top
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
    fontSize: RFValue(23, 812),
  },

  //middle
  middle: {
    flex: 7,
    justifyContent: "center",
  },
  test: {
    width: "90%",
    height: "20%",
    alignSelf: "center",
    marginBottom: RFValue(20, 812),
  },
  backimage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "gray",
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "center",
    opacity: 0.3,
  },
  box: {
    height: "105%",
    width: "105%",
    right: 10,
    backgroundColor: (255, 255, 255, 1),
    justifyContent: "center",
  },
  check_text: {
    fontSize: RFValue(20, 812),
    color: "black",
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
