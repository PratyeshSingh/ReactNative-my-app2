
import styles from '@/src/style';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useProfileImagePicker } from '../viewmodels/useProfileImagePicker';

export const ProfileView = ({
    user,
    onImageSelected,
}: {
    user: any;
    onImageSelected?: (uri: string) => Promise<void> | void;
}) => {
    const { imageUri, isSelecting, selectImage } = useProfileImagePicker(user.image);

    async function handleImageSelection() {
        const selectedUri = await selectImage();
        if (selectedUri) await onImageSelected?.(selectedUri);
    }

    return (
    <View style={styles.textViewStyle}>
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="Change profile image"
            disabled={isSelecting}
            onPress={() => void handleImageSelection()}
        >
            {imageUri ? (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 96, height: 96, borderRadius: 48 }}
                />
            ) : (
                <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: '#d9d9d9' }} />
            )}
        </Pressable>
        <Text>Welcome, {user.name}!</Text>
    </View>
    )
}