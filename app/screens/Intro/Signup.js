import React from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

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
      alert("Password confirm failed!!");
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
      .catch(() => {
        this.setState({
          error: "Authentification failed",
          loading: false,
        });
        alert(this.state.error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Theme}>
          <Image
            source={require("../../images/logo.png")}
            style={styles.logo}
          ></Image>
        </View>
        <View style={styles.form}>
          <Text style={styles.inputinfo}>User Email</Text>
          <View style={styles.inputtogether}>
            <TextInput
              style={styles.tinput}
              autoCompleteType="email"
              placeholder=""
              onChangeText={this.handleChangeemail}
            ></TextInput>
          </View>
          <Text style={styles.inputinfo}>Password</Text>
          <View style={styles.inputtogether}>
            <TextInput
              style={styles.tinput}
              secureTextEntry
              placeholder=""
              onChangeText={this.handleChangepassword}
            ></TextInput>
          </View>
          <Text style={styles.inputinfo}>Confirm Password</Text>
          <View style={styles.inputtogether}>
            <TextInput
              style={styles.tinput}
              secureTextEntry
              placeholder=""
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
                colors={["#f5f7fa", "#c3cfe2"]}
                style={styles.buttonL}
              >
                <Text style={styles.signin}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Theme: {
    paddingTop: RFValue(50, 812),
    top: RFValue(80, 812),
    flex: 2.5,
    justifyContent: "center",
  },

  form: {
    flex: 5,
    justifyContent: "center",
  },

  bottomlayer: {
    flex: 2,
  },

  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.3 }],
    resizeMode: "center",
    aspectRatio: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignContent: "center",
    justifyContent: "space-evenly",
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
    flex: 6,
    marginVertical: 5,
    marginRight: 5,
    height: RFValue(40, 812),
    color: "black",
    borderRadius: 4,

    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  signin: {
    fontSize: 20,
    color: "white",
  },
  buttonS: {
    height: 50,
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
    borderWidth: 1,
    height: 50,
    //borderColor: colors.c3,
    marginTop: 15,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
});
