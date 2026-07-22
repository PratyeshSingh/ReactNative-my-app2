
import styles from '@/src/style';
import { Text, View } from "react-native";

export const ProfileView = ({ user }: { user: any }) => {
    return (
    <View style = {styles.textViewStyle}>
        <Text>Welcome, {user.name}!</Text>
    </View>
    )
}