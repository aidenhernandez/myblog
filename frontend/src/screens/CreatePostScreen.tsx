import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CreateStackScreenProps } from '../navigation/types';

type Props = CreateStackScreenProps<'CreatePost'>;

export default function CreatePostScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Post</Text>
        <Text style={styles.subtitle}>Share your thoughts with the world</Text>
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Post creation form will go here</Text>
        <Text style={styles.placeholderText}>• Title input</Text>
        <Text style={styles.placeholderText}>• Content editor (rich text or markdown)</Text>
        <Text style={styles.placeholderText}>• Image upload</Text>
        <Text style={styles.placeholderText}>• Tag selection</Text>
        <Text style={styles.placeholderText}>• Draft/Publish buttons</Text>
        <Text style={styles.placeholderText}>• Preview option</Text>
      </View>

      <View style={styles.formPreview}>
        <View style={styles.inputPreview}>
          <Text style={styles.inputLabel}>Title</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputPlaceholder}>Enter post title...</Text>
          </View>
        </View>

        <View style={styles.inputPreview}>
          <Text style={styles.inputLabel}>Content</Text>
          <View style={[styles.inputBox, styles.contentBox]}>
            <Text style={styles.inputPlaceholder}>Write your post content...</Text>
          </View>
        </View>

        <View style={styles.inputPreview}>
          <Text style={styles.inputLabel}>Tags</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputPlaceholder}>Select tags...</Text>
          </View>
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
  formPreview: {
    padding: 20,
  },
  inputPreview: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fafafa',
  },
  contentBox: {
    minHeight: 150,
  },
  inputPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
});
