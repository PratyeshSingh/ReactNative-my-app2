import { Image, ScrollView, Text } from 'react-native';
import styles from '../../style';
import { Product } from '../domain/entities/Product';

export function ProductDetailView({ product }: { product: Product }) {
  const imageUri = (product as Product & { images?: string[] }).images?.[0] || '';

  return (
    <ScrollView contentContainerStyle={styles.detailContainer}>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.detailImage} /> : null}
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productSubtitle}>{product.brand}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.productCategory}>Category: {product.category}</Text>
      <Text style={styles.detailDescription}>{product.description}</Text>
      <Text style={styles.detailRating}>Rating: {product.rating.toFixed(1)}</Text>
    </ScrollView>
  );
}
