import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export function useProfileImagePicker(initialImage?: string) {
  const [imageUri, setImageUri] = useState(initialImage);
  const [isSelecting, setIsSelecting] = useState(false);

  async function selectImage(): Promise<string | undefined> {
    setIsSelecting(true);
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) return undefined;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return undefined;

      const selectedUri = result.assets[0]?.uri;
      if (selectedUri) setImageUri(selectedUri);
      return selectedUri;
    } finally {
      setIsSelecting(false);
    }
  }

  return { imageUri, isSelecting, selectImage };
}
