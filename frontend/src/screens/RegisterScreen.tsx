import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthStackScreenProps } from '../navigation/types';

type Props = AuthStackScreenProps<'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create your Blog Social account</Text>

      {/* TODO: Add registration form */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Registration form will go here</Text>
        <Text style={styles.placeholderText}>• Username input</Text>
        <Text style={styles.placeholderText}>• Email input</Text>
        <Text style={styles.placeholderText}>• Password input</Text>
        <Text style={styles.placeholderText}>• Display name input</Text>
        <Text style={styles.placeholderText}>• Register button</Text>
      </View>

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginLinkText}>
          Already have an account? <Text style={styles.loginLinkBold}>Login</Text>
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
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    fontSize: 14,
    color: '#666',
  },
  loginLinkBold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
