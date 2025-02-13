import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

const TabMenu = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Your content goes here */}
      </ScrollView>

      <View style={styles.tabMenu}>
        <TouchableOpacity style={styles.feedbackButton}>
          <Text style={styles.feedbackText}>📋 FEEDBACK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileText}>👤 PROFILE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flexGrow: 1,
    paddingBottom: 80, // Ensure space for the tab bar
  },
  tabMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#E5E7EB",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  feedbackButton: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 5,
  },
  feedbackText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  profileButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  profileText: {
    color: "#3B82F6",
    fontWeight: "bold",
  },
});

export default TabMenu;
