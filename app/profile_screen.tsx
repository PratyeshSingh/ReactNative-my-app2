
import { useLocalSearchParams } from 'expo-router';
import { useDI } from '../src/core-di/DIContext';
import { ErrorView } from '../src/user-profile/presenter/ui-components/ErrorView';
import { LoadingSpinner } from '../src/user-profile/presenter/ui-components/LoadingSpinner';
import { ProfileView } from '../src/user-profile/presenter/ui-components/ProfileView';
import { useUserProfile } from '../src/user-profile/presenter/viewmodels/useUserProfile';

interface ProfileScreenProps {
  userId?: string;
  user?: any;
}

//{ userId, user: userProp }: { userId?: string; user?: any }
export default function ProfileScreen({ user: userProp }: ProfileScreenProps) {
  const { getUserProfile } = useDI();

  const { userId } = useLocalSearchParams<{ userId?: string | undefined }>();

  // Call hook unconditionally to preserve hooks order
  const { user, loading, error } = useUserProfile(userId, getUserProfile, userProp);

  // If a user object is provided directly, render it immediately (useful for auth flow demos)
  if (userProp) {
    const mapped = { id: userProp.id, name: userProp.name ?? `${userProp.firstName ?? ''} ${userProp.lastName ?? ''}`, email: userProp.email };
    return <ProfileView user={mapped} />;
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message={(error ?? '') + (userId ?? '')} />;
  return <ProfileView user={user} />;
}