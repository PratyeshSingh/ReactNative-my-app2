import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { container } from '../src/core-di/container';
import { DIProvider } from '../src/core-di/DIContext';
import styles from '../src/style';
import { ProfileScreen } from '../src/user-profile/profile_screen';

export default function UserScreen() {
  const { data } = useLocalSearchParams();
  const userId = data ? JSON.parse(data as string) : undefined;
  const [user, setUser] = useState<any | null>(null);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  // Provided sample /auth/me response (from your message)
  const sampleAuthResponse = {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3ODQ4MDU4NzcsImV4cCI6MTc4NDgwOTQ3N30.AJrYZHoJb28b2EHO0i6r0Q1j8vEWQyUMKstc711oGOs',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3ODQ4MDU4NzcsImV4cCI6MTc4NzM5Nzg3N30.0XCiFplXdpNPVtBqLJI1TQC_OVpqY0hAj3by-MHAgjM',
    id: 1,
    username: 'emilys',
    email: 'emily.johnson@x.dummyjson.com',
    firstName: 'Emily',
    lastName: 'Johnson',
    gender: 'female',
    image: 'https://dummyjson.com/icon/emilys/128',
  } as any;

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const tk = await container.authRepository.getToken();
        if (!mounted) return;
        if (tk && tk.accessToken) {
          // user already logged in — navigate back to home
          router.replace('/');
          return;
        }
      } catch {
        // ignore
      } finally {
        if (mounted) setChecking(false);
      }
    }
    check();
    return () => {
      mounted = false;
    };
  }, [router]);

  async function seedSampleAndShow() {
    await container.authRepository.saveToken({ accessToken: sampleAuthResponse.accessToken, refreshToken: sampleAuthResponse.refreshToken });
    setUser({ id: sampleAuthResponse.id, name: `${sampleAuthResponse.firstName} ${sampleAuthResponse.lastName}`, email: sampleAuthResponse.email, image: sampleAuthResponse.image });
  }

  if (checking) {
    return (
      <DIProvider>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Checking session…</Text>
        </View>
      </DIProvider>
    );
  }

  if (user) {
    return (
      <DIProvider>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>User (Auth demo)</Text>
          <Image source={{ uri: user.image }} style={{ width: 128, height: 128, borderRadius: 64, marginBottom: 12 }} />
          <Text style={styles.subTitle}>{user.name}</Text>
          <Text>{user.email}</Text>
          <View style={{ height: 12 }} />
          <Button title="Open Profile View" onPress={() => {}} />
          <View style={{ height: 12 }} />
          <ProfileScreen user={user} />
        </View>
      </DIProvider>
    );
  }

  return (
    <DIProvider>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>User Profile</Text>
        <Text style={styles.subTitle}>No active session</Text>
        <View style={{ height: 12 }} />
        <Button title="Seed sample session and view profile" onPress={seedSampleAndShow} />
        <View style={{ height: 12 }} />
        <ProfileScreen userId={userId} />
      </View>
    </DIProvider>
  );
}