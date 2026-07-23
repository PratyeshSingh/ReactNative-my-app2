import { useRouter } from 'expo-router';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollView}
          contentContainerStyle={styles.categoryScrollContent}
        >
          <View style={styles.categoryContainer}>
            {categories.map((category) => {
              const active = category === selectedCategory;
              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  style={({ pressed }) => [
                    styles.categoryBadge,
                    active && styles.categoryBadgeActive,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Text 
                    numberOfLines={1}
                    style={[styles.categoryText, active && styles.categoryTextActive]}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {loading && <Text style={styles.loadingText}>Loading products...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          style={styles.productList}
          contentContainerStyle={styles.productListContent}
        />
      </View>
    </View>
  );
}
