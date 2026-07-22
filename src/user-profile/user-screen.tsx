import { useLocalSearchParams } from "expo-router";
import { DIProvider } from "../di/DIContext";
import { ProfileScreen } from "./profile_screen";


// export default function UserScreen() {
export default function UserScreen() {

  const { data } = useLocalSearchParams();
  const userId = JSON.parse(data as string);
  return (
    <DIProvider>
      <ProfileScreen userId={userId} />
    </DIProvider>
  );
}