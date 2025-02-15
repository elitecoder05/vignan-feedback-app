import { View, Text , StyleSheet } from 'react-native'
import React from 'react'

import HeaderCombined from './components/HeaderCombined'
import StudentLogin from './components/StudentLogin'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  return (
    <SafeAreaView>
      <HeaderCombined />  
      <StudentLogin />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({


    title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
});

export default Login