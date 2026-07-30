
import { useEffect, useState } from 'react';
import { User } from '../../domain/entities/User';
import { GetUserProfile } from '../../domain/usecases/GetUserProfile';


export const putDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for 2 seconds
  return {
    message: "Data loaded successfully!"
  };
};

export function useUserProfile(
  userId: string | undefined,
  getUserProfile?: GetUserProfile,
  initialUser?: any
) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {

    // 🛑 BYPASS FETCHING: If initialUser is provided, don't trigger the API call!
    if (initialUser) {
      setUser(initialUser);
      setLoading(false);
      return;
    }

    // don't attempt to load when no userId or getUserProfile provided
    if (!userId || !getUserProfile) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getUserProfile.execute(userId);
        if (isMounted) {
          setUser(result);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message ?? 'Failed to load profile');
        }
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

  }, [userId, getUserProfile, initialUser]);

  return { user, loading, error };
}
