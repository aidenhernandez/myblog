import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ExploreStackScreenProps } from '../navigation/types';

type Props = ExploreStackScreenProps<'Search'>;

export default function SearchScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover new posts and tags</Text>
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Search and explore features will go here</Text>
        <Text style={styles.placeholderText}>• Search bar for posts and users</Text>
        <Text style={styles.placeholderText}>• Trending tags</Text>
        <Text style={styles.placeholderText}>• Popular posts</Text>
        <Text style={styles.placeholderText}>• Recommended users to follow</Text>
      </View>

      {/* Example placeholder tags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Tags</Text>
        <View style={styles.tagsContainer}>
          {['Technology', 'Design', 'Travel', 'Food', 'Lifestyle'].map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      </View>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
