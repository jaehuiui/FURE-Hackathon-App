import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class Intro extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top_layer_1}>
          <View style={styles.logo_box}>
            <Image
              source={require("../../images/new_logo.png")}
              style={styles.logo}
            ></Image>
          </View>
        </View>
        <View style={styles.middle_layer_1}>
          <Text>
            <Text style={styles.explanation_1}>Aim</Text>
            <Text style={styles.explanation}> your </Text>
            <Text style={styles.explanation_1}>Fit</Text>
            {"\n"}
            <Text style={styles.explanation_1}>Run</Text>
            <Text style={styles.explanation}> to your future</Text>
          </Text>
        </View>
        <View style={styles.bottom_layer_1}>
          <Text
            style={styles.skip}
            onPress={() => {
              this.props.navigation.navigate("SignIn");
            }}
          >
            시작하기
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
  },
  //Page 1
  top_layer_1: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  middle_layer_1: {
    flex: 4,
  },
  bottom_layer_1: {
    flex: 2,
    justifyContent: "center",

    marginBottom: RFValue(50, 812),
  },
  logo_box: {
    justifyContent: "center",
    alignItems: "center",
  },
  //Inner Layer 1
  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.6 }],
    resizeMode: "center",
    aspectRatio: 1,
  },
  explanation: {
    fontSize: RFValue(25, 812),
    textAlign: "center",
    color: "gray",
  },
  explanation_1: {
    fontSize: RFValue(25, 812),
    textAlign: "center",
    color: "#76B4FF",
  },
  skip: {
    fontSize: RFValue(18, 812),
    color: "gray",
    textAlign: "center",
  },

  //Page 2
  top_layer_2: {
    flex: 15,
    justifyContent: "center",
  },
  middle_layer_2: {
    flex: 4,
  },
  bottom_layer_2: {
    flex: 2,
    justifyContent: "flex-start",
    flexDirection: "row-reverse",
    marginBottom: RFValue(50, 812),
  },

  top_layer_3: {
    flex: 15,
    justifyContent: "center",
  },
  middle_layer_3: {
    flex: 4,
  },
  bottom_layer_3: {
    flex: 2,
    justifyContent: "flex-start",
    flexDirection: "row-reverse",
    marginBottom: RFValue(50, 812),
  },
});
