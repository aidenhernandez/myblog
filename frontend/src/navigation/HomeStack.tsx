import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import FeedScreen from '../screens/FeedScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Home',
        }}
      />
      {/* TODO: Add PostDetail and UserProfile screens when implemented */}
    </Stack.Navigator>
  );
}
