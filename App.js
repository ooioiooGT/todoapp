import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Home from './screens/home';
import Login from './screens/Login';
import { FIREBASE_AUTH } from './firebaseConfig';

const auth = getAuth();
const Stack = createNativeStackNavigator();


export default function App () {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUser(user);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // User is logged in
          <Stack.Screen name="Home" component={Home} />
        ) : (
          // No user is logged in
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

