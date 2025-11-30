import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NotificationsStackScreenProps } from '../navigation/types';

type Props = NotificationsStackScreenProps<'NotificationsList'>;

export default function NotificationsListScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Stay updated with your activity</Text>
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Notifications list will go here</Text>
        <Text style={styles.placeholderText}>• New followers</Text>
        <Text style={styles.placeholderText}>• Post likes</Text>
        <Text style={styles.placeholderText}>• New comments</Text>
        <Text style={styles.placeholderText}>• Comment replies</Text>
        <Text style={styles.placeholderText}>• Mark as read functionality</Text>
      </View>

      {/* Example placeholder notifications */}
      {[
        { type: 'like', text: 'Someone liked your post', time: '2h ago' },
        { type: 'comment', text: 'New comment on your post', time: '5h ago' },
        { type: 'follow', text: 'Someone started following you', time: '1d ago' },
      ].map((notification, index) => (
        <View key={index} style={styles.notificationCard}>
          <View style={styles.notificationIcon}>
            <Text style={styles.notificationIconText}>
              {notification.type === 'like' ? '❤️' : notification.type === 'comment' ? '💬' : '👤'}
            </Text>
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>{notification.text}</Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  placeholder: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIconText: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});
