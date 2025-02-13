import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Dimensions, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import HeaderCombined from "./components/HeaderCombined";

const MainFeedback = () => {
  const route = useRoute();
  const { subjects } = route.params || { subjects: [] }; // Get subjects from navigation params

  const [userData, setUserData] = useState({
    username: "",
    name: "",
    branch: "CSE",
    semester: "VI Semester",
  });

  const [ratings, setRatings] = useState({});

  // Fetch stored user details from Secure Storage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await SecureStore.getItemAsync("studentUsername");
        const storedName = await SecureStore.getItemAsync("studentName");

        setUserData((prev) => ({
          ...prev,
          username: storedUsername || "N/A",
          name: storedName || "N/A",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleRatingChange = (subjectId, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [subjectId]: value,
    }));
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 !== 0 && styles.alternateRow]}>
      <Text style={styles.subject}>{item.name}</Text>
      <Text style={styles.colon}>:</Text>
      {[4, 3, 2, 1].map((value) => (
        <Pressable key={value} onPress={() => handleRatingChange(item.id, value)} style={styles.radioButtonContainer}>
          <View style={[styles.radioButton, ratings[item.id] === value && styles.radioSelected]} />
        </Pressable>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <HeaderCombined />

      {/* Student Information */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Roll No</Text>
          <Text style={styles.value}>: {userData.username}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Student Name</Text>
          <Text style={styles.value}>: {userData.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Branch</Text>
          <Text style={styles.value}>: {userData.branch}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Semester</Text>
          <Text style={styles.value}>: {userData.semester}</Text>
        </View>
      </View>

      {/* Rating Legend */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Excellent - 4</Text>
        <Text style={styles.ratingText}>Good - 3</Text>
        <Text style={styles.ratingText}>Average - 2</Text>
        <Text style={styles.ratingText}>Poor - 1</Text>
      </View>

      {/* Subjects Feedback Table */}
      <View style={styles.subjectsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Subjects</Text>
          <Text style={styles.headerText}>4</Text>
          <Text style={styles.headerText}>3</Text>
          <Text style={styles.headerText}>2</Text>
          <Text style={styles.headerText}>1</Text>
        </View>

        {subjects.length > 0 ? (
          <FlatList data={subjects} keyExtractor={(item) => item.id} renderItem={renderItem} />
        ) : (
          <Text style={styles.noSubjectsText}>No subjects available. Please try again.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  infoContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  alternateRow: {
    backgroundColor: "#f2f2f2",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    width: 130, // Ensures alignment
  },
  value: {
    fontSize: 16,
  },
  ratingContainer: {
    marginTop: 15,
    backgroundColor: "#e6f2f7",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    borderRadius: 5,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  subjectsContainer: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#777",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  subject: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 2,
  },
  colon: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  radioButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  noSubjectsText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
});

export default MainFeedback;
