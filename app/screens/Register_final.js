import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export default class Register_second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uid: "",
      numperweek: null,
      timepernum: null,
      modalVisible: false,
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        var user = firebase.auth().currentUser;
        if (user != null) {
          firebase
            .firestore()
            .collection("users")
            .doc("App")
            .collection("info")
            .doc(user.uid)
            .onSnapshot((doc) => {
              var name_test = doc.data().name;
              var npw = doc.data().numperweek;
              var tpn = doc.data().timepernum;
              console.log(name_test);
              this.setState({
                name: name_test,
                uid: user.uid,
                numperweek: npw,
                timepernum: tpn,
              });
            });
        }
      }
    );
  }
  onPressModal() {
    this.setState({
      modalVisible: true,
    });
  }
  oncloseModal() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          animationDuration={200}
          animationTension={40}
          closeOnTouchOutside={true}
          modalStyle={{
            borderRadius: 2,
            margin: 20,
            padding: 10,
            backgroundColor: "#F4F5F6",
            height: "80%",
          }}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalfirst}>
            <Text style={styles.ModalTitle}>PLAN 설명</Text>
            <Text style={styles.ModalSubTitle}>하나도 안빡세요!</Text>
          </View>
          <View style={styles.modalsecond}></View>
          <View style={styles.modalthird}>
            <TouchableOpacity
              onPress={() => {
                this.oncloseModal();
              }}
            >
              <Text style={styles.selecttext}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.toplayer}>
          <Text style={styles.title}>
            FU:RE가 제안하는{"\n"}
            {this.state.name} 님의 운동 계획이예요.
          </Text>
        </View>
        <View style={styles.middlelayer}>
          <View style={styles.managerbox}>
            <Text style={styles.boxtitle}>3개월 PLAN</Text>
            <Text style={styles.boxtext}>
              {"\n"}1주차에는 일주일에 {this.state.numperweek}번,{"\n"}3km를{" "}
              {this.state.timepernum}시간 동안 뛰어볼까요?
            </Text>
          </View>
          <Text
            style={styles.selecttext}
            onPress={() => {
              this.onPressModal();
            }}
          >
            PLAN 자세히
          </Text>
        </View>
        <View style={styles.bottomlayer}>
          <Image
            source={require("../images/running.png")}
            style={styles.logo}
          ></Image>
          <Text
            style={styles.selecttext}
            onPress={() => {
              this.props.navigation.navigate("Mainpage");
            }}
          >
            {" "}
            메인화면으로 돌아가기{" "}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  toplayer: {
    flex: 3,
    justifyContent: "center",
  },
  middlelayer: {
    flex: 4,
    justifyContent: "center",
  },
  bottomlayer: {
    flex: 4,
    justifyContent: "center",
  },

  title: {
    fontSize: RFValue(25, 812),
    lineHeight: RFValue(40, 812),
    textAlign: "center",
  },
  inputinfo: {
    marginVertical: RFValue(20, 812),
    flexDirection: "row",
    justifyContent: "center",
  },
  question: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(20, 812),
    fontWeight: "bold",
  },

  managerbox: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "white",
    height: "60%",
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },

  boxtitle: {
    fontSize: RFValue(25, 812),
    fontWeight: "bold",
    textAlign: "center",
  },
  boxtext: {
    fontSize: RFValue(20, 812),
    textAlign: "center",
    lineHeight: RFValue(40, 812),
  },

  selecttext: {
    marginTop: RFValue(70, 812),
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f4c75",
    marginBottom: RFValue(30, 812),
  },
  logo: {
    alignSelf: "center",
    transform: [{ scale: 1.4 }],
    resizeMode: "center",
    aspectRatio: 1,
  },

  ModalTitle: {
    marginTop: 60,
    textAlign: "center",
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginBottom: 15,
  },
  ModalSubTitle: {
    fontSize: 15,
    textAlign: "center",
  },
  modalfirst: {
    flex: 1,
    paddingVertical: 30,
  },
  modalsecond: {
    flex: 3,
  },
  modalthird: {
    flex: 1,
  },
});
