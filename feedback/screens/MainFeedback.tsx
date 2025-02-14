import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  ScrollView,                         
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import HeaderCombined from "./components/HeaderCombined";





const MainFeedback = () => {
  const route = useRoute();
  const { subjects } = route.params || { subjects: [] };

  const [userData, setUserData] = useState({
    username: "",
    name: "",
    branch: "CSE",
    semester: "VI Semester",
  });

  const [ratings, setRatings] = useState({});

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

  const handleSubmit = async () => {
    // Convert the ratings object to an array of rating objects
    const ratingsArray = Object.keys(ratings).map((subjectId) => ({
      subjectId,
      rating: ratings[subjectId],
    }));

    // Build the payload according to the new API specification
    const payload = {
      ratings: ratingsArray,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await fetch("https://academic-rating.onrender.com/api/feedback/rating", {
        method: "POST",
        headers: {
          Accept: "/",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWRlODI1NTkxNDk2YzY5MTcyMmM0ZSIsImlhdCI6MTczOTQ1OTQ4NiwiZXhwIjoxNzM5NDYwMzg2fQ.YuwKHHI6NCGgm3ekXAmIBzStrel9gPYZ7pgCl7VWZWk",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      const resultText = await response.text();
      console.log("Response text:", resultText);

      if (response.ok) {
        Alert.alert("Success", "Ratings submitted successfully!");
        // Optionally, reset ratings after successful submission
        setRatings({});
      } else {
        let errorDetails;
        try {
          errorDetails = JSON.parse(resultText);
        } catch (e) {
          errorDetails = resultText;
        }
        Alert.alert("Error", `Failed to submit feedback. ${JSON.stringify(errorDetails)}`);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert("Error", "Something went wrong. Please check your network and try again.");
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 !== 0 && styles.alternateRow]}>
      <Text style={styles.subject}>{item.name}</Text>
      <Text style={styles.colon}>:</Text>
      {[4, 3, 2, 1].map((value) => (
        <Pressable
          key={value}
          onPress={() => handleRatingChange(item.id, value)}
          style={styles.radioButtonContainer}
        >
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

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
    width: 130,
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
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
    alignSelf: "center",
    width: "50%",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MainFeedback;
