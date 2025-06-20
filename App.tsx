// App.tsx
import AppNavigator from "./src/components/navigation/AppNavigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {UserProvider} from "./src/components/services/UserContext";
import {initializeLanguage} from "./src/components/services/LanguageUtils"; // ✅ Destrukturovaný import

// ✅ Inicializace jazyka při startu aplikace
initializeLanguage();

export default function App() {
    return (
        <UserProvider>
            <SafeAreaProvider>
                <AppNavigator/>
                <Toast/>
            </SafeAreaProvider>
        </UserProvider>
    );
}