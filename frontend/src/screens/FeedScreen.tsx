import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'Feed'>;

export default function FeedScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Feed</Text>
        <Text style={styles.subtitle}>Latest posts from people you follow</Text>
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Feed will display here</Text>
        <Text style={styles.placeholderText}>• Post cards with author info</Text>
        <Text style={styles.placeholderText}>• Like and comment counts</Text>
        <Text style={styles.placeholderText}>• Tap to view post details</Text>
        <Text style={styles.placeholderText}>• Infinite scroll pagination</Text>
      </View>

      {/* Example placeholder posts */}
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.postCard}>
          <Text style={styles.postTitle}>Post Title {item}</Text>
          <Text style={styles.postExcerpt}>This is a placeholder for post content...</Text>
          <View style={styles.postMeta}>
            <Text style={styles.postMetaText}>👤 Author Name</Text>
            <Text style={styles.postMetaText}>❤️ 0</Text>
            <Text style={styles.postMetaText}>💬 0</Text>
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
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  postExcerpt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  postMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  postMetaText: {
    fontSize: 12,
    color: '#999',
  },
});
