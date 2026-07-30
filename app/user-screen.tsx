import { useAuth } from '@/src/user-profile/presenter/viewmodels/useAuth';
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
  const { signIn, refresh, token, me } = useAuth(
    container.login, 
    container.refreshSession, 
    container.getSavedToken, 
    container.getCurrentUser
  );

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


  const { userId, password } = parseUserData(data);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const savedToken = await token();
        if (!isMounted) return;

        if (savedToken?.accessToken) {
          const response = await me(savedToken?.accessToken);
          setLoginResponse(response);
        } else {
          // router.replace('/');
          setLoginResponse(null);
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
  }, [router, token]);

  async function loadUserDetails({ userName, pwd }: { userName: string, pwd: string }) {
    console.log(`[UserScreen] ${userName} ${pwd}`);
    try {
      const response = await signIn(userName, pwd);
      setLoginResponse(response);
    } catch (e: any) {
      setLoginResponse(null);
    }
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
            router.push({ pathname: '/profile_screen', params: { userId: userId } })
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
            loadUserDetails({ userName: userId, pwd: password })
          }}
        />
        <View style={{ height: 12 }} />
      </View>
    );
  })();

  return <DIProvider>{content}</DIProvider>;
}
