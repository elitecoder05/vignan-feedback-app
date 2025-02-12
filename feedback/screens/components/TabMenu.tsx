import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const TabMenu = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "#E5E7EB",
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#3B82F6",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold" }}>📋 FEEDBACK</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#FFF",
          padding: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#3B82F6",
        }}
      >
        <Text style={{ color: "#3B82F6", fontWeight: "bold" }}>👤 PROFILE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabMenu;
