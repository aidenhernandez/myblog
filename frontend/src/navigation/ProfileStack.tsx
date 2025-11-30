import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import MyProfileScreen from '../screens/MyProfileScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      {/* TODO: Add EditProfile and Settings screens when implemented */}
    </Stack.Navigator>
  );
}
