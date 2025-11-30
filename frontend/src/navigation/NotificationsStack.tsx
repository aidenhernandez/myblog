import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationsStackParamList } from './types';
import NotificationsListScreen from '../screens/NotificationsListScreen';

const Stack = createNativeStackNavigator<NotificationsStackParamList>();

export default function NotificationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationsList"
        component={NotificationsListScreen}
        options={{
          title: 'Notifications',
        }}
      />
    </Stack.Navigator>
  );
}
