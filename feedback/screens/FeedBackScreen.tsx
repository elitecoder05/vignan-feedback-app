import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import TabMenu from "./components/TabMenu";
import { useNavigation } from "@react-navigation/native";

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for API call

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

    const apiUrl = `https://feedbackk.onrender.com/api/subjects?branch=${branch}&semester=${semester}&btechYear=${year}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Content-Type": "application/json",
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
        source={{ uri: "https://webprosindia.com/vignanit/collegeimages/title_head.jpg" }}
        style={styles.headerImage}
      />

      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeText}>HEY THERE!!</Text>
      </View>

      <Text style={styles.feedbackTitle}>FEEDBACK</Text>
      <View style={styles.dottedLine}></View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Select Branch :</Text>
        <SelectList setSelected={setBranch} data={branchData} placeholder="Select Branch" />

        <Text style={styles.label}>Select Year :</Text>
        <SelectList setSelected={setYear} data={yearData} placeholder="Select Year" />

        <Text style={styles.label}>Select Semester :</Text>
        <SelectList setSelected={setSemester} data={semesterData} placeholder="Select Semester" />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitButtonText}>SUBMIT</Text>}
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
    height: 60,
  },
  welcomeHeader: {
    backgroundColor: "#3885D5",
    padding: 10,
    borderRadius: 6,
  },
  welcomeText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  feedbackTitle: {
    fontWeight: "bold",
    padding: 10,
    fontSize: 16,
  },
  dottedLine: {
    borderStyle: "dotted",
    borderWidth: 1,
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
    marginTop: 20,
    height: 40,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FeedbackScreen;
