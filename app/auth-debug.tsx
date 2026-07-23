import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { container } from '../src/core-di/container';
import styles from '../src/style';

export default function AuthDebugScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [output, setOutput] = useState<string>('');

  async function doLogin() {
    setOutput('Logging in...');
    try {
      const resp = await container.login.execute(username, password);
      setOutput(JSON.stringify(resp, null, 2));
    } catch (e: any) {
      setOutput(String(e?.message ?? e));
    }
  }

  async function doMe() {
    setOutput('Fetching current user...');
    try {
      const user = await container.getCurrentUser.execute();
      setOutput(JSON.stringify(user, null, 2));
    } catch (e: any) {
      setOutput(String(e?.message ?? e));
    }
  }

  async function doRefresh() {
    setOutput('Refreshing session...');
    try {
      const resp = await container.refreshSession.execute();
      setOutput(JSON.stringify(resp, null, 2));
    } catch (e: any) {
      setOutput(String(e?.message ?? e));
    }
  }

  async function showStoredToken() {
    setOutput('Reading stored token...');
    try {
      const t = await container.authRepository.getToken();
      setOutput(JSON.stringify(t, null, 2));
    } catch (e: any) {
      setOutput(String(e?.message ?? e));
    }
  }

  async function clearToken() {
    setOutput('Clearing token...');
    try {
      await container.authRepository.clearToken();
      setOutput('Cleared');
    } catch (e: any) {
      setOutput(String(e?.message ?? e));
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Auth Debug</Text>
      <Text style={styles.subTitle}>Quick debug UI for auth flows</Text>

      <Text>Username</Text>
      <TextInput value={username} onChangeText={setUsername} style={{ width: '100%', padding: 8, borderWidth: 1, marginBottom: 8 }} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ width: '100%', padding: 8, borderWidth: 1, marginBottom: 8 }} />

      <Button title="Login (auth/login)" onPress={doLogin} />
      <View style={{ height: 8 }} />
      <Button title="Get current user (auth/me)" onPress={doMe} />
      <View style={{ height: 8 }} />
      <Button title="Refresh session (auth/refresh)" onPress={doRefresh} />
      <View style={{ height: 8 }} />
      <Button title="Show stored token" onPress={showStoredToken} />
      <View style={{ height: 8 }} />
      <Button title="Clear token" onPress={clearToken} />

      <View style={{ height: 16 }} />
      <Text style={{ fontWeight: 'bold' }}>Output</Text>
      <Text style={{ fontFamily: 'monospace', marginTop: 8 }}>{output}</Text>

      <View style={{ height: 24 }} />
      <Link href="/">Back home</Link>
    </ScrollView>
  );
}
