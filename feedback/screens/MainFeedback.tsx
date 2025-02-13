import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import HeaderCombined from './components/HeaderCombined';

const MainFeedback = () => {
  const [userData, setUserData] = useState({
    username: '22L31A0525',
    name: 'B Srinivasa Ashrith',
    course: 'B.Tech',
    branch: 'CSE',
    semester: 'VI Semester',
  });

  return (
    <View style={styles.container}>
      <HeaderCombined />
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
          <Text style={styles.label}>Course</Text>
          <Text style={styles.value}>: {userData.course}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 130, // Adjust width to align properly
  },
  value: {
    fontSize: 16,
  },
});

export default MainFeedback;
