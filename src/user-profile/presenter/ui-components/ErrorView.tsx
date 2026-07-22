
import styles from '@/src/style';
import { Text, View } from "react-native";

export const ErrorView = ({message}: {message: string}) => {
    return (
    <View style = {styles.textViewStyle}>
        <Text>This is {message} Error View</Text>
    </View>
    )
}