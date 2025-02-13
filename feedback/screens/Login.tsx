import React from "react";
import { View, StyleSheet , Text } from "react-native";
import HeaderCombined from "./components/HeaderCombined";
import StudentLogin from "./components/StudentLogin"; // Importing StudentLogin component

const Login = () => {
  return (
    <View style={styles.container}>
      <HeaderCombined />
      <StudentLogin />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
