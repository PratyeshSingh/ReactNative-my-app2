import { Link } from "expo-router";
import { Text, View } from "react-native";

import styles from "./style";


type Product = {
  id: string;
  name: string;
  price: number;
};

// we can keep sample data here, but it could come from an API
const PRODUCTS: Product[] = [
  { id: '1', name: 'Apple', price: 0.5 },
  { id: '2', name: 'Banana', price: 0.3 },
  { id: '3', name: 'Cherry', price: 1.2 },
  { id: '4', name: 'Date', price: 1.5 },
  { id: '5', name: 'Elderberry', price: 2.0 },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.textViewStyle}>Hello there is Pratyesh calling you</Text>
      <Link href="/about_me"> View about me </Link>
      {/* pass PRODUCTS as a JSON string in the query params */}
      <Link
        href={{
          pathname: '/product_list',
          params: { data: JSON.stringify(PRODUCTS) },
        }}
      >
        View product list
      </Link>
      
      <Link 
      href={{
        pathname: '/user-profile/user-screen',
        params: { data: JSON.stringify("123") },
      }}
      > 
      View user profile 
      </Link>
    </View>
  );
}

