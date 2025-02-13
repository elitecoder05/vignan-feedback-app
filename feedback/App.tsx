import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import FeedbackScreen from './screens/LoginScreen';
import AboutScreen from './screens/LoginScreen1';
import HeaderCombined from './screens/components/HeaderCombined';
import SignInDialog from './screens/components/StudentLogin';

import Login from './screens/LoginScreen1';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="LoginScreen" component={AboutScreen} />

        <Stack.Screen name="FeedBackScreen" component={FeedbackScreen} />




        {/* //components */}
        <Stack.Screen name="HeaderCombined" component={HeaderCombined} />
        <Stack.Screen name="SignInDialog" component={SignInDialog} />
        



      </Stack.Navigator>
    </NavigationContainer>
  );
}
