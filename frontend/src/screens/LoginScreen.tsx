import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthStackScreenProps } from '../navigation/types';

type Props = AuthStackScreenProps<'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back to Blog Social</Text>

      {/* TODO: Add login form with email/password inputs */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Login form will go here</Text>
        <Text style={styles.placeholderText}>• Email input</Text>
        <Text style={styles.placeholderText}>• Password input</Text>
        <Text style={styles.placeholderText}>• Login button</Text>
      </View>

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerLinkText}>
          Don't have an account? <Text style={styles.registerLinkBold}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  placeholder: {
    backgroundColor: '#f5f5f5',
    padding: 30,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  registerLink: {
    marginTop: 20,
  },
  registerLinkText: {
    fontSize: 14,
    color: '#666',
  },
  registerLinkBold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
