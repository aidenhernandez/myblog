import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import HomeStack from './HomeStack';
import ExploreStack from './ExploreStack';
import CreateStack from './CreateStack';
import NotificationsStack from './NotificationsStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStack}
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabIcon icon="🔍" color={color} />,
        }}
      />
      <Tab.Screen
        name="CreateTab"
        component={CreateStack}
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <TabIcon icon="➕" color={color} />,
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <TabIcon icon="🔔" color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Simple icon component using emojis as placeholder
// TODO: Replace with proper icon library (e.g., @expo/vector-icons)
function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <span style={{ fontSize: 24, opacity: color === '#007AFF' ? 1 : 0.5 }}>{icon}</span>;
}
