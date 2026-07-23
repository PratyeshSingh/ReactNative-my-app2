import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen name="index" options={{ title: 'Home' }} />;
    <Stack.Screen name="product_list" options={{ title: 'Products' }} />;
    <Stack.Screen name="product_detail" options={{ title: 'Product Detail' }} />;
    <Stack.Screen name="about_me" options={{ title: 'About Me' }} />;
    <Stack.Screen name="user-screen" options={{ title: 'Profile' }} />;
  </Stack>;
}
