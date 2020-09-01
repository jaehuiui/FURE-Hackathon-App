import React from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default class CreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "email",
      password: "password",
      passwordconfirm: "confirm password",
    };
    this.handleChangeemail = this.handleChangeemail.bind(this);
    this.handleChangepassword = this.handleChangepassword.bind(this);
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(
      this
    );
  }

  handleChangeemail(newText) {
    this.setState({
      email: newText,
    });
  }
  handleChangepassword(newText) {
    this.setState({
      password: newText,
    });
  }
  handleChangePasswordConfirm(newText) {
    this.setState({
      passwordconfirm: newText,
    });
  }
  async OnSignUpPress() {
    this.setState({
      error: "",
      loading: true,
    });

    if (!(this.state.password === this.state.passwordconfirm)) {
      alert("비밀번호가 일치하지 않습니다!");
      await this.setState({
        password: "",
        passwordconfirm: "",
      });
      return;
    }

    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: "",
          loading: false,
        });
        this.props.navigation.navigate("SignIn");
      })
      .catch((e) => {
        this.setState({
          error: "Authentification failed",
          loading: false,
        });
        if (e.code == "invalid-email") {
          alert("이메일 정보를 확인해주세요");
        } else if (e.code == "auth/email-already-in-use") {
          alert("이미 존재하는 이메일입니다!");
        } else {
          alert("입력 정보를 다시 확인해주세요!");
        }
      });
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <ScrollView
            scrollEnabled={true}
            contentContainerStyle={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.Theme}>
              <Image
                source={require("../../images/logo.png")}
                style={styles.logo}
              ></Image>
            </View>

            <View style={styles.form}>
              <Text style={styles.inputinfo}>이메일</Text>
              <View style={styles.input_box}>
                <TextInput
                  style={styles.input_text}
                  autoCompleteType="email"
                  placeholder="fure@gmail.com"
                  onChangeText={this.handleChangeemail}
                  keyboardType={"email-address"}
                ></TextInput>
              </View>
              <Text style={styles.inputinfo}>비밀번호</Text>
              <View style={styles.input_box}>
                <TextInput
                  style={styles.input_text}
                  secureTextEntry
                  placeholder="********"
                  onChangeText={this.handleChangepassword}
                ></TextInput>
              </View>
              <Text style={styles.inputinfo}>비밀번호 확인</Text>
              <View style={styles.input_box}>
                <TextInput
                  style={styles.input_text}
                  secureTextEntry
                  placeholder="********"
                  onChangeText={this.handleChangePasswordConfirm}
                ></TextInput>
              </View>
            </View>
            <View style={styles.bottomlayer}>
              <View style={styles.signup_button}>
                <TouchableOpacity
                  onPress={() => {
                    this.OnSignUpPress();
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#303966", "#c3cfe2"]}
                    style={styles.buttonL}
                  >
                    <Text style={styles.signin}>회원 가입</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <KeyboardSpacer topSpacing={RFValue(-30, 812)} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  Theme: {
    flex: 2,
    justifyContent: "center",
  },

  form: {
    flex: 6,
    justifyContent: "center",
  },

  bottomlayer: {
    flex: 2,
    justifyContent: "center",
  },

  logo: {
    alignSelf: "center",
    top: RFValue(50, 812),
    height: RFValue(180, 812),
    aspectRatio: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignContent: "center",
  },

  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },
  inputinfo: {
    color: "gray",
    marginLeft: 25,
    fontSize: 15,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#FFF",
    paddingVertical: 12,
    width: 250,
    borderRadius: 12,
    alignItems: "center",
  },

  input_box: {
    fontSize: RFValue(15, 812),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#fdfbfb",
    marginVertical: RFValue(5, 812),
    marginHorizontal: 20,
    alignSelf: "stretch",
    marginBottom: RFValue(30, 812),
  },

  input_text: {
    marginVertical: 5,
    marginRight: 5,
    height: RFValue(50, 812),
    color: "black",
    borderRadius: 4,

    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  inputtogether: {
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#fdfbfb",
    marginVertical: 5,
    marginHorizontal: 20,
    alignSelf: "stretch",
    marginBottom: 30,
  },

  tinput: {
    marginVertical: 5,

    marginRight: 10,
    height: RFValue(50, 812),
    color: "black",
    borderRadius: 4,

    padding: 12,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  signin: {
    fontSize: 20,
    color: "white",
  },
  buttonS: {
    height: RFValue(50, 812),
    borderWidth: 1,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  buttonL: {
    borderWidth: 0.5,
    borderColor: "gray",
    height: RFValue(50, 812),
    //borderColor: colors.c3,
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
