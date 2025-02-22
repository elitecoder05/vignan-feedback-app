import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FeedbackScreen from './screens/FeedBackScreen';
import HeaderCombined from './screens/components/HeaderCombined';
import SignInDialog from './screens/components/StudentLogin';
import Login from './screens/LoginScreen';
import MainFeedback from './screens/MainFeedback';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="FeedBackScreen" component={FeedbackScreen} />
        <Stack.Screen name="MainFeedback" component={MainFeedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
