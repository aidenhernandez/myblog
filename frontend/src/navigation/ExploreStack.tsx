import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreStackParamList } from './types';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Explore',
        }}
      />
      {/* TODO: Add TagPosts screen when implemented */}
    </Stack.Navigator>
  );
}
