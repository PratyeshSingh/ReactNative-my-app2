import { Image, Pressable, Text, View } from 'react-native';
import styles from '../../style';
import { Product } from '../domain/entities/Product';

export function ProductListItem({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.productItem} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productSubtitle}>{product.brand}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}
