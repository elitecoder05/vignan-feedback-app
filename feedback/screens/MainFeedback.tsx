import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import HeaderCombined from "./components/HeaderCombined";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";

const MainFeedback = () => {
  const route = useRoute();
  const { subjects, branch: selectedBranch } = route.params || { subjects: [] };

  console.log("Branch from previous screen:", selectedBranch);

  const [userData, setUserData] = useState({
    username: "",
    name: "",
    branch: "CSE",
    semester: "VI Semester",
  });
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

  useEffect(() => {
    const checkSubmissionForSubject = async () => {
      if (!selectedSubject) {
        setHasSubmitted(false);
        return;
      }
      try {
        const alreadySubmitted = await SecureStore.getItemAsync(
          `feedbackSubmitted_${selectedSubject}`
        );
        setHasSubmitted(!!alreadySubmitted);
      } catch (error) {
        console.error("Error checking submission for subject:", error);
      }
    };

    checkSubmissionForSubject();
  }, [selectedSubject]);

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handleSubmit = async () => {
    if (!selectedSubject) {
      Alert.alert("Error", "Please select a subject.");
      return;
    }
    if (!selectedRating) {
      Alert.alert("Error", "Please select a rating.");
      return;
    }

    // Extra precaution: if this subject's feedback has been submitted, stop here.
    if (hasSubmitted) {
      Alert.alert("Error", "Feedback for this subject has already been submitted.");
      return;
    }

    setIsSubmitting(true);

    // Construct payload based on the latest API structure
    const payload = {
      branch: selectedBranch || userData.branch,
      ratings: [
        {
          subjectId: selectedSubject,
          rating: selectedRating,
          message: feedbackText, // Renamed key from "feedback" to "message"
        },
      ],
    };

    // Debugging: log the payload being sent to the API
    console.log("Sending payload to API:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch("https://academic-rating.onrender.com/api/feedback/rating", {
        method: "POST",
        headers: {
          Accept: "/",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWVlNTJjYzUxYzlkNTVjODgwNTdjZiIsImlhdCI6MTczOTUxNTM3NywiZXhwIjoxNzM5NTE2Mjc3fQ.Brvrn84sHukooHV4YHP_TyPYucNvuakiuN8LGMjENxo",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      const resultText = await response.text();
      console.log("Response text:", resultText);

      if (response.ok) {
        Alert.alert("Success", "Rating submitted successfully!");
        // Save the submission timestamp for this subject.
        await SecureStore.setItemAsync(`feedbackSubmitted_${selectedSubject}`, Date.now().toString());
        setHasSubmitted(true);
        // Optionally reset the rating and feedback text (keeping the subject selected so the user sees it was submitted)
        setSelectedRating(null);
        setFeedbackText("");
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitPress = () => {
    // Instead of a global check, we now rely on per-subject check (hasSubmitted is updated in the useEffect above)
    handleSubmit();
  };

  // Convert your subjects array to the key/value format needed for SelectList.
  const subjectOptions = subjects.map((subject) => ({
    key: subject.id,
    value: subject.name,
  }));

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <HeaderCombined />

        {/* Student Information */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Roll No</Text>
            <Text style={styles.infoValue}>: {userData.username}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Student Name</Text>
            <Text style={styles.infoValue}>: {userData.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Branch</Text>
            <Text style={styles.infoValue}>: {selectedBranch || userData.branch}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Semester</Text>
            <Text style={styles.infoValue}>: {userData.semester}</Text>
          </View>
        </View>

        {/* Subject Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Select Subject:</Text>
          <SelectList
            setSelected={setSelectedSubject}
            data={subjectOptions}
            placeholder="Select Subject"
            boxStyles={styles.dropdownBox}
            inputStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdown}
          />
        </View>

        {/* Rating Options */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingQuestion}>Please provide feedback for the subject:</Text>
          <View style={styles.radioGroup}>
            {[4, 3, 2, 1].map((value) => (
              <Pressable
                key={value}
                onPress={() => handleRatingChange(value)}
                style={styles.radioButtonContainer}
                disabled={hasSubmitted} // Optionally disable if already submitted.
              >
                <View style={[styles.radioButton, selectedRating === value && styles.radioSelected]} />
                <Text style={styles.radioLabel}>{value}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Feedback Textbox */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>Your Feedback:</Text>
          <TextInput
            style={styles.feedbackInput}
            multiline
            numberOfLines={4}
            placeholder="Enter your feedback here..."
            value={feedbackText}
            onChangeText={setFeedbackText}
            editable={!hasSubmitted} // Optionally disable editing if already submitted.
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]}
          onPress={handleSubmitPress}
          disabled={isSubmitting || hasSubmitted} // Disable if already submitted.
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>
              {hasSubmitted ? "Feedback Submitted" : "Submit"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  infoContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  infoLabel: {
    fontWeight: "bold",
    fontSize: 16,
    width: 130,
  },
  infoValue: {
    fontSize: 16,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdownBox: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  dropdownInput: {
    fontSize: 16,
    color: "#000",
  },
  dropdown: {
    marginTop: 5,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  ratingQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  radioSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  feedbackContainer: {
    marginBottom: 20,
  },
  feedbackLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  feedbackInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
    height: 100,
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
