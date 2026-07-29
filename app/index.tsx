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
      <Link
        style={styles.linkText}
        href={{
          pathname: '/user-screen',
          params: {
            // userId: 'emilys', password: 'emilyspass' ,
            data: JSON.stringify({ userId: 'emilys', password: 'emilyspass' }),
          },
        }
        }
      >View user profile</Link>
      <Link href="/auth-debug" style={styles.linkText}>Auth debug</Link>
    </View>
  );
}

