

import { useDI } from '@/app/di/DIContext';
import { ErrorView } from './presenter/ui-components/ErrorView';
import { LoadingSpinner } from './presenter/ui-components/LoadingSpinner';
import { ProfileView } from './presenter/ui-components/ProfileView';
import { useUserProfile } from './presenter/viewmodels/useUserProfile';


export function ProfileScreen({ userId }: { userId: string }) {
  const { getUserProfile } = useDI();
  const { user, loading, error } = useUserProfile(userId, getUserProfile);

  console.log("userId: %s,", userId);
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message={error + userId} />;
  return <ProfileView user={user} />;
}