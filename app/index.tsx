import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import styles from '../src/style';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Product Browser Demo</Text>
      <Text style={styles.subTitle}>Explore a catalog powered by DummyJSON</Text>
      <Link href="/product_list" style={styles.linkText}>View product catalog</Link>
      <Link href="/about_me" style={styles.linkText}>View about me</Link>
      <Link href="/user-screen?data=%22123%22" style={styles.linkText}>View user profile</Link>
    </View>
  );
}

