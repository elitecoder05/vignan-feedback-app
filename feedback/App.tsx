import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import HomeScreen from './screens/FeedbackScreen';
import AboutScreen from './screens/AboutScreen';
import Login from './screens/Login';
import HeaderCombined from './screens/components/HeaderCombined';
import SignInDialog from './screens/components/StudentLogin';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        <Stack.Screen name="Login" component={Login} />




        {/* //components */}
        <Stack.Screen name="HeaderCombined" component={HeaderCombined} />
        <Stack.Screen name="SignInDialog" component={SignInDialog} />
        



      </Stack.Navigator>
    </NavigationContainer>
  );
}
