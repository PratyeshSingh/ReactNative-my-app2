import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from '../../../style';
import { productContainer } from '../../di/productContainer';
import { Product } from '../../domain/entities/Product';
import { ProductDetailView } from '../../ui/ProductDetailView';

export function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const item = await productContainer.getProductDetail.execute(id as string);
        setProduct(item);
      } catch (e: any) {
        setError(e?.message ?? 'Unable to load product detail');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Text style={styles.loadingText}>Loading product details...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (!product) return <Text style={styles.errorText}>Product not found</Text>;

  return (
    <View style={styles.appContainer}>
      <ProductDetailView product={product} />
    </View>
  );
}
