import { useEffect } from 'react';
import { Text, View } from "react-native";
import styles from "../src/style";

const About=()=> {

    // Inside your main App component or Root Layout:
    useEffect(() => {
    const isFabric = !!(globalThis as any).nativeFabricUIManager;
    console.log("Is Fabric / New Arch Enabled?", isFabric ? "Yes ✅" : "No ❌");
    }, []);

    return (
    <View style = {styles.textViewStyle}>
        <Text>This is under maintaince</Text>
    </View>
    )
}

export default About;