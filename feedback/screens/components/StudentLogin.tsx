import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const StudentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { username, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>STUDENT LOGIN</Text>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>User Name :</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password :</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loginBox: {
    marginTop: 100,
    width: 320,
    backgroundColor: "#73A9E2",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    height: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#000",
  },
  content: {
    backgroundColor: "#F8F9FA",
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  label: {
    width: 100,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default StudentLogin;
