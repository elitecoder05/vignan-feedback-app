import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import TabMenu from "./components/TabMenu";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const branchData = [
    { key: "CSE", value: "CSE" },
    { key: "ECE", value: "ECE" },
    { key: "EEE", value: "EEE" },
  ];

  const yearData = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4", value: "4" },
  ];

  const semesterData = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
  ];

  const handleSubmit = async () => {
    if (!branch || !year || !semester) {
      Alert.alert("Error", "Please select all fields.");
      return;
    }

    setLoading(true);

    // Updated API endpoint and query parameters
    const apiUrl = `https://academic-rating.onrender.com/api/subjects?branch=${branch}&semester=${semester}&year=${year}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWRlODI1NTkxNDk2YzY5MTcyMmM0YiIsImlhdCI6MTczOTQ1MTkwNSwiZXhwIjoxNzM5NDUyODA1fQ.1Kdha87HvPrbGIeGA7nn_x-r7E6HC26y-IHpzm897tc",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subjects.");
      }

      const data = await response.json();

      // Extract subject names and IDs
      const subjects = data.map((subject) => ({
        id: subject._id,
        name: subject.name,
      }));

      console.log("Subjects:", subjects);

      // Navigate to MainFeedback and pass subject data
      navigation.navigate("MainFeedback", { subjects });
    } catch (error) {
      console.error("Error fetching subjects:", error);
      Alert.alert("Error", "Failed to fetch subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://webprosindia.com/vignanit/collegeimages/title_head.jpg",
        }}
        style={styles.headerImage}
      />

      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeText}>HEY THERE!!</Text>
      </View>

      <Text style={styles.feedbackTitle}>FEEDBACK</Text>
      <View style={styles.dottedLine}></View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Select Branch :</Text>
        <SelectList
          setSelected={setBranch}
          data={branchData}
          placeholder="Select Branch"
        />

        <Text style={styles.label}>Select Year :</Text>
        <SelectList
          setSelected={setYear}
          data={yearData}
          placeholder="Select Year"
        />

        <Text style={styles.label}>Select Semester :</Text>
        <SelectList
          setSelected={setSemester}
          data={semesterData}
          placeholder="Select Semester"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          )}
        </TouchableOpacity>
      </View>

      <TabMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  headerImage: {
    width: "100%",
    height: height * 0.1, // Responsive height based on device height
  },
  welcomeHeader: {
    backgroundColor: "#3885D5",
    padding: height * 0.015,
    borderRadius: 6,
  },
  welcomeText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: width * 0.05, // Responsive font size
  },
  feedbackTitle: {
    fontWeight: "bold",
    padding: width * 0.03,
    fontSize: width * 0.045, // Responsive font size
  },
  dottedLine: {
    borderStyle: "dotted",
    borderWidth: 1,
    marginBottom: height * 0.01,
  },
  formContainer: {
    paddingHorizontal: width * 0.05,
  },
  label: {
    fontSize: width * 0.035, // Responsive font size
    fontWeight: "500",
    marginBottom: height * 0.005,
    marginTop: height * 0.01,
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    padding: height * 0.015,
    alignSelf: "center",
    borderRadius: 5,
    marginTop: height * 0.03,
    height: height * 0.06,
    width: width * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: width * 0.04,
  },
});

export default FeedbackScreen;
