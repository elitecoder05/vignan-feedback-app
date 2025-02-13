import { View, Text , StyleSheet } from 'react-native'
import React from 'react'

import HeaderCombined from './components/HeaderCombined'
import StudentLogin from './components/StudentLogin'

const Login = () => {
  return (
    <View>
      <HeaderCombined />  
      <StudentLogin />
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