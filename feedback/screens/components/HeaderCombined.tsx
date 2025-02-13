import { View, Text , Image , StyleSheet } from 'react-native'
import React from 'react'

import TabMenu from './TabMenu'

const HeaderCombined = () => {
  return (
    <View>
       <Image
              source={{ uri: "https://webprosindia.com/vignanit/collegeimages/title_head.jpg" }}
              style={styles.headerImage}
            />
      
            <View style={styles.welcomeHeader}>
              <Text style={styles.welcomeText}>HEY THERE!!</Text>
            </View>
      
            <Text style={styles.feedbackTitle}>FEEDBACK</Text>
            <View style={styles.dottedLine}></View>


    </View>

  )
}






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
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});




export default HeaderCombined