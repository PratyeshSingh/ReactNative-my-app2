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
        {/* Search Input */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories ScrollView - flexGrow: 0 keeps it compact */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={styles.categoryScrollContent}
        >
          <View style={styles.categoryContainer}>
            {categories.map((category) => {
              const active = category === selectedCategory;
              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryBadge,
                    active && styles.categoryBadgeActive,
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

        {/* Main List Area - style with flex: 1 to fill remaining space */}
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      </View>
    </View>
  );
}
