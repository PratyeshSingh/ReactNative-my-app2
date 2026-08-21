import { Text, View } from "react-native";
import styles from "../src/style";

const About = () => {
    const isFabric = !!(globalThis as any).nativeFabricUIManager;
    const architectureDetails = "Is Fabric & Hermes / New Arch Enabled? " + (isFabric ? "Yes ✅" : "No ❌");

    return (
        <View style={styles.textViewStyle}>
            <Text style={styles.detailDescription}>This is About me</Text>
            <Text style={styles.detailDescription}>1. Architecture {architectureDetails}</Text>
        </View>
    )
}

export default About;