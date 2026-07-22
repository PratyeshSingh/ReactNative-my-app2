
import { useEffect, useState } from 'react';
import { User } from '../../domain/entities/User';
import { GetUserProfile } from '../../domain/usecases/GetUserProfile';


export const putDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for 2 seconds
  return {
    message: "Data loaded successfully!"
  };
};

export function useUserProfile(userId: string, getUserProfile: GetUserProfile) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    putDelay().then(res => { // Simulate a delay
      getUserProfile.execute(userId)
        .then(setUser)
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    });

  }, [userId]);

  return { user, loading, error };
}
