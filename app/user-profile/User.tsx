import { DIProvider } from "../di/DIContext";
import { ProfileScreen } from "./profile_screen";

export default function UserScreen() {
  return (
    <DIProvider>
      <ProfileScreen userId="123" />
    </DIProvider>
  );
}