
import { container } from '@/src/core-di/container';
import { useEffect, useState } from 'react';
import { LoginResponse } from '../../data/api/AuthApi';
import { useAuth } from './useAuth';


export const putDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for 2 seconds
  return {
    message: "Data loaded successfully!"
  };
};

export function useUserProfile(
  userId: string | undefined,
  initialUser?: any
) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token, me } = useAuth(
    container.login,
    container.refreshSession,
    container.getSavedToken,
    container.getCurrentUser
  );

  useEffect(() => {

    // 🛑 BYPASS FETCHING: If initialUser is provided, don't trigger the API call!
    if (initialUser) {
      return;
    }

    // don't attempt to load when no userId or getUserProfile provided
    if (!userId || !me) {
      return;
    }

    let isMounted = true;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const savedToken = await token();
        if (!isMounted) return;

        if (savedToken?.accessToken) {
          const response = await me(savedToken?.accessToken);
          if (isMounted) {
            setUser(response);
          }
        } else {
          // router.replace('/');
          setError(null);
          return;
        }
      } catch {
        // Ignore and continue showing the screen.
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };

  }, [userId, me, initialUser]);

  return {
    user: initialUser ?? user,
    loading: initialUser || !userId || !me ? false : loading,
    error,
  };
}
