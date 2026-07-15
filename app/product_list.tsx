
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, View } from "react-native";
import styles from './style';

type Product = {
  id: string;
  name: string;
  price: number;
};

const renderItem = ({ item }: { item: Product }) => (
  <View style={styles.container}>
    <Text style={styles.textViewStyle}>{item.name}</Text>
    <Text style={styles.textViewStyle}>${item.price.toFixed(2)}</Text>
    <Image 
        source={{ uri: `https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png` }}  
        resizeMode="cover" />
  </View>
);

export default function ProductList() {
// export const ProductList = () => {
  const { data } = useLocalSearchParams();
  // data is a JSON string; parse it or default to an empty array
  const products: Product[] = data ? JSON.parse(data as string) : [];

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
    //   keyExtractor={(item) => item.id}
    //   contentContainerStyle={styles.list}
    //   ListHeaderComponent={<Text style={styles.header}>Product Catalog</Text>}
    //   ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}