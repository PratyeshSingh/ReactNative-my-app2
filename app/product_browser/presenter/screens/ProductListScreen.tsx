import { useRouter } from 'expo-router';
import { FlatList, Text, TextInput, View } from 'react-native';
import styles from '../../../style';
import { productContainer } from '../../di/productContainer';
import { ProductListItem } from '../../ui/ProductListItem';
import { useProductCatalog } from '../viewmodels/useProductCatalog';

export function ProductListScreen() {
  const { products, loading, error, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories } =
    useProductCatalog(productContainer.getProducts, productContainer.searchProducts);

  const router = useRouter();

  const renderProduct = ({ item }: { item: any }) => (
    <ProductListItem
      product={item}
      onPress={() => router.push({ pathname: '/product_detail', params: { id: item.id.toString() } })}
    />
  );

  return (
    <View style={styles.appContainer}>
      <View style={styles.pageContent}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.categoryContainer}>
          {categories.map((category) => {
            const active = category === selectedCategory;
            return (
              <Text
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryBadge,
                  active && styles.categoryBadgeActive,
                  active && styles.categoryTextActive,
                ]}
              >
                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{category}</Text>
              </Text>
            );
          })}
        </View>

        {loading && <Text style={styles.loadingText}>Loading products...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      </View>
    </View>
  );
}
