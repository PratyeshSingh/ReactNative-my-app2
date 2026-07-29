import { ProfileScreen } from '@/src/user-profile/profile_screen';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { container } from '../src/core-di/container';
import { DIProvider } from '../src/core-di/DIContext';
import styles from '../src/style';
import { LoginResponse } from '../src/user-profile/data/api/AuthApi';

export default function UserScreen() {
  const { data } = useLocalSearchParams<{ data?: string | string[] }>();

  const router = useRouter();
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(null);
  const [checking, setChecking] = useState(true);

  const parseUserData = (params?: string | string[]) => {
    if (typeof params === 'string') {
      try {
        const parsed = JSON.parse(params);
        return {
          userId: parsed?.userId ?? undefined,
          password: parsed?.password ?? undefined,
        };
      } catch {
        // handle JSON parse error if needed
      }
    }
    return { userId: undefined, password: undefined };
  };

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const token = await container.authRepository.getToken();
        if (!isMounted) return;

        if (token?.accessToken) {
          router.replace('/');
          return;
        }
      } catch {
        // Ignore and continue showing the screen.
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    };

    void checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function loadUserDetails({ userName, pwd }: { userName: string, pwd: string }) {
    console.log(`[UserScreen] ${userName} ${pwd}`);
    try {
      const response = await container.login.execute(userName, pwd);
      setLoginResponse(response);
    } catch (e: any) {
      setLoginResponse(null);
    }

    await container.authRepository.saveToken({
      accessToken: loginResponse?.accessToken,
      refreshToken: loginResponse?.refreshToken,
      expiresAt: loginResponse?.expiresAt,
    });
  }

  const [showProfile, setShowProfile] = useState(false);
  if (showProfile) {
    return (
      <ProfileScreen
        userId={parseUserData(data).userId}
      />
    );
  }

  const content = (() => {

    if (checking) {
      return (
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Checking session…</Text>
        </View>
      );
    }

    if (loginResponse) {
      return (
        <View style={styles.container}>
          <Text style={styles.pageTitle}>User (Auth demo)</Text>
          <Image
            source={{ uri: loginResponse.image }}
            style={{ width: 128, height: 128, borderRadius: 64, marginBottom: 12 }}
          />
          <Text style={styles.subTitle}>{loginResponse.username}</Text>
          <Text>{loginResponse.email}</Text>
          <View style={{ height: 12 }} />
          <Button title="Open Profile View" onPress={() => {
            setShowProfile(true);
          }} />
          <View style={{ height: 12 }} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>User Profile</Text>
        <Text style={styles.subTitle}>No active session</Text>
        <View style={{ height: 12 }} />
        <Button
          title="Seed Dynamic and view profile"
          onPress={() => {
            const { userId, password } = parseUserData(data);
            loadUserDetails({ userName: userId, pwd: password })
          }}
        />
        <View style={{ height: 12 }} />
      </View>
    );
  })();

  return <DIProvider>{content}</DIProvider>;
}
