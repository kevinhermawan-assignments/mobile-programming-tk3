import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddSchoolScreen from './screens/AddSchoolScreen';
import SchoolDetailScreen from './screens/SchoolDetailScreen';
import SchoolListScreen from './screens/SchoolListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SchoolList"
        screenOptions={{
          statusBarColor: '#1976D2',
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
        }}>
        <Stack.Screen
          name="SchoolList"
          component={SchoolListScreen}
          options={{ title: 'Bantu Sekolah' }}
        />
        <Stack.Screen
          name="SchoolDetail"
          component={SchoolDetailScreen}
          options={{ title: 'Sekolah Detail' }}
        />
        <Stack.Screen
          name="AddSchool"
          component={AddSchoolScreen}
          options={{ title: 'Tambah Sekolah' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
