
import { useEffect, useState } from 'react';
import { User } from '../../domain/entities/User';
import { GetUserProfile } from '../../domain/usecases/GetUserProfile';


export const putDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for 2 seconds
  return {
    message: "Data loaded successfully!"
  };
};

export function useUserProfile(userId: string | undefined, getUserProfile?: GetUserProfile) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // don't attempt to load when no userId or getUserProfile provided
    if (!userId || !getUserProfile) {
      setLoading(false);
      return;
    }

    putDelay().then(() => {  // Simulate a delay
      getUserProfile.execute(userId)
        .then(setUser)
        .catch((e: any) => setError(e?.message ?? String(e)))
        .finally(() => setLoading(false));
    });

  }, [userId, getUserProfile]);

  return { user, loading, error };
}
