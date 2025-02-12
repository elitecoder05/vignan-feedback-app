import { View, Text , StyleSheet } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View>
      <Text style = {styles.title}>Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({


    title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
});

export default Login