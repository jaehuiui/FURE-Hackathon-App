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
import Swiper from "react-native-swiper";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

export default class Intro extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
        <Swiper showsButtons={false} autoplay={false}>
          <View style={{ width, height }}>
            <View style={styles.top_layer_1}>
              <Image
                source={require("../images/logo.png")}
                style={styles.logo}
              ></Image>
            </View>
            <View style={styles.middle_layer_1}>
              <Text style={styles.explanation}>
                Seeing is believing{"\n"}Let us show your future
              </Text>
            </View>
            <View style={styles.bottom_layer_1}>
              <Text
                style={styles.skip}
                onPress={() => {
                  this.props.navigation.navigate("Register_1");
                }}
              >
                Skip
              </Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <View style={styles.top_layer_2}>
              <Text style={{ textAlign: "center" }}>Top Layer</Text>
            </View>
            <View style={styles.middle_layer_2}>
              <Text style={{ textAlign: "center" }}>Second Page</Text>
            </View>
            <View style={styles.bottom_layer_2}>
              <Text
                style={styles.skip}
                onPress={() => {
                  this.props.navigation.navigate("SignIn");
                }}
              >
                Skip
              </Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <View style={styles.top_layer_3}>
              <Text style={{ textAlign: "center" }}>Top Layer</Text>
            </View>
            <View style={styles.middle_layer_3}>
              <Text style={{ textAlign: "center" }}>Third Page</Text>
            </View>
            <View style={styles.bottom_layer_3}>
              <Text
                style={styles.skip}
                onPress={() => {
                  this.props.navigation.navigate("SignIn");
                }}
              >
                Skip
              </Text>
            </View>
          </View>
        </Swiper>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  //Page 1
  top_layer_1: {
    flex: 15,
    justifyContent: "center",
  },
  middle_layer_1: {
    flex: 4,
  },
  bottom_layer_1: {
    flex: 2,
    justifyContent: "flex-start",
    flexDirection: "row-reverse",
    marginBottom: RFValue(50, 812),
  },

  //Inner Layer 1
  logo: {
    alignSelf: "center",
    transform: [{ scale: 0.6 }],
    resizeMode: "center",
    aspectRatio: 1,
  },
  explanation: {
    fontSize: RFValue(22, 812),
    textAlign: "center",
    color: "gray",
  },
  skip: {
    fontSize: RFValue(15, 812),
    color: "gray",
    marginRight: RFValue(30, 812),
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
