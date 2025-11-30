import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateStackParamList } from './types';
import CreatePostScreen from '../screens/CreatePostScreen';

const Stack = createNativeStackNavigator<CreateStackParamList>();

export default function CreateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: 'Create',
        }}
      />
      {/* TODO: Add PostPreview screen when implemented */}
    </Stack.Navigator>
  );
}
