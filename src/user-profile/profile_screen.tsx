

import { useDI } from '../core-di/DIContext';
import { ErrorView } from './presenter/ui-components/ErrorView';
import { LoadingSpinner } from './presenter/ui-components/LoadingSpinner';
import { ProfileView } from './presenter/ui-components/ProfileView';
import { useUserProfile } from './presenter/viewmodels/useUserProfile';


export function ProfileScreen({ userId, user: userProp }: { userId?: string; user?: any }) {
  const { getUserProfile } = useDI();

  // If a user object is provided directly, render it immediately (useful for auth flow demos)
  if (userProp) {
    const mapped = { id: userProp.id, name: userProp.name ?? `${userProp.firstName ?? ''} ${userProp.lastName ?? ''}`, email: userProp.email };
    return <ProfileView user={mapped} />;
  }

  const { user, loading, error } = useUserProfile(userId as string, getUserProfile);

  console.log('userId: %s,', userId);
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message={error + userId} />;
  return <ProfileView user={user} />;
}