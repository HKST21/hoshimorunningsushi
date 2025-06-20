import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {User} from "../models/interfaces";
import {frontendClass} from "../services/FeClass";
import Toast from "react-native-toast-message";
import * as AppleAuthentication from 'expo-apple-authentication';
import {useEffect} from "react";
import {Animated, Vibration} from 'react-native';
import {useAnimatedScreenTransition} from "../services/useAnimatedScreenTransition";
import {useUser} from "../services/UserContext";
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {getText} from "../services/LanguageUtils"; // ✅ Import lokalizace
import designSystem from '../constants/globalStyles';

// Import obrázku pro background
const loginBackground = require('../../../assets/loginpic.png');

// Typy pro Stack Navigator
type RootStackParamList = {
    MainApp: undefined;
    Login: { returnTo?: string };
};

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

export default function Login() {
    const {loggedUser, setLoggedUser} = useUser();
    const navigation = useNavigation<LoginNavigationProp>();
    const route = useRoute<LoginRouteProp>();
    const animationStyles = useAnimatedScreenTransition();

    // Získání parametru kam se má uživatel vrátit po přihlášení
    const returnTo = route.params?.returnTo;

    // Vibrace při načtení komponenty pro taktilní zpětnou vazbu
    useEffect(() => {
        Vibration.vibrate();
    }, []);

    // Pokud je uživatel už přihlášen, přesměruj ho zpět
    useEffect(() => {
        if (loggedUser) {
            if (returnTo) {
                // Pokud máme kam se vrátit, naviguj na MainApp
                // (konkrétní screen se otevře automaticky v MainApp)
                navigation.navigate('MainApp');
            } else {
                navigation.navigate('MainApp');
            }
        }
    }, [loggedUser, navigation, returnTo]);

    /**
     * Funkce pro přihlášení přes Apple
     */
    const handleAppleSignIn = async () => {
        try {
            // Kontrola dostupnosti Apple Sign In
            const isAvailable = await AppleAuthentication.isAvailableAsync();

            if (!isAvailable) {
                Toast.show({
                    type: 'error',
                    text1: getText('login.unsupportedPlatform'),
                    text2: getText('login.appleSignInNotAvailable'),
                });
                return;
            }

            // Spuštění přihlášení přes Apple
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            // Sestavení jména (Apple může poskytnout pouze části)
            const firstName = credential.fullName?.givenName || `AppleFn${credential.user.substring(0, 5)}`;
            const lastName = credential.fullName?.familyName || `AppleLn${credential.user.substring(0, 5)}`;

            // Vytvoření objektu uživatele pro backend
            const user: User = {
                id: '', // ID bude přiřazeno na serveru
                providerId: credential.user,
                providerType: 'apple',
                email: credential.email || `user-${credential.user.substring(0, 10)}@example.com`, // Apple může skrýt email
                name: `${firstName} ${lastName}`, // Správná mezera mezi jménem a příjmením
                firstName,
                lastName,
                profilePicture: undefined, // Apple neposkytuje profilový obrázek
                tokens: 100,
                vouchers: [],
                createdAt: new Date(),
                lastLogin: new Date()
            };

            // Odeslání uživatele na server
            const registeredUser = await frontendClass.registerUser(user);
            if (!registeredUser) {
                throw new Error("User not found");
            }

            // Aktualizace stavu aplikace
            await setLoggedUser(registeredUser);

            // Zobrazení notifikace o úspěšném přihlášení s interpolací
            Toast.show({
                type: 'success',
                text1: getText('login.loginSuccessful'),
                text2: getText('login.welcomeBack', { name: registeredUser.firstName }),
            });

            // Navigace zpět na původní screen
            if (returnTo) {
                // Uložíme si kam se má uživatel vrátit do AsyncStorage nebo podobně
                // Pro jednoduchost teď navigujeme na MainApp a uživatel si může kliknout na správnou záložku
                navigation.navigate('MainApp');

                // Později můžeme přidat složitější logiku pro přesné vrácení na konkrétní tab screen
                // To by vyžadovalo složitější komunikaci mezi Stack a Tab navigátory
            } else {
                navigation.navigate('MainApp');
            }

        } catch (e) {
            Toast.show({
                type: 'error',
                text1: getText('login.loginError'),
                text2: getText('login.appleSignInFailed'),
            });
            console.error(e);
        }
    };

    const handleGoBack = () => {
        navigation.navigate('MainApp');
    };

    // Pokud je uživatel už přihlášen, zobrazíme loading nebo přesměrujeme
    if (loggedUser) {
        return (
            <Animated.View style={[{flex: 1}, animationStyles]}>
                <View style={styles.backgroundContainer}>
                    <Image
                        source={loginBackground}
                        style={styles.backgroundImage}
                        resizeMode="cover"
                    />
                    <View style={styles.overlay} />
                    <View style={styles.mainContainer}>
                        <Text style={styles.loadingText}>{getText('login.redirecting')}</Text>
                    </View>
                </View>
            </Animated.View>
        );
    }

    return (
        <Animated.View
            style={[
                {flex: 1},
                animationStyles
            ]}
        >
            {/* Background s obrázkem a overlay */}
            <View style={styles.backgroundContainer}>
                <Image
                    source={loginBackground}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
                <View style={styles.overlay} />
                <View style={styles.mainContainer}>
                    {/* Tlačítko zpět */}
                    <Pressable style={styles.backButton} onPress={handleGoBack}>
                        <Text style={styles.backButtonText}>{getText('login.back')}</Text>
                    </Pressable>

                    <View style={styles.loginContainer}>
                        <Text style={styles.welcomeText}>{getText('login.welcomeTitle')}</Text>
                        <Text style={styles.subtitle}>{getText('login.signInSubtitle')}</Text>

                        <View style={styles.buttonContainer}>
                            {/* Oficiální přihlašovací tlačítko Apple */}
                            <AppleAuthentication.AppleAuthenticationButton
                                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                                cornerRadius={designSystem.RADIUS.MD}
                                style={styles.appleOfficialButton}
                                onPress={handleAppleSignIn}
                            />
                        </View>

                        <Text style={styles.privacyText}>
                            {getText('login.privacyText')}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    // Background container bez barvy - bude ho pokrývat obrázek
    backgroundContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    // Nový style pro background obrázek
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        opacity: 0.8, // 50% průhlednost
    },
    // Overlay pro lepší čitelnost textu
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Tmavý overlay pro lepší čitelnost
    },
    mainContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end', // Změna z 'center' na 'flex-end'
        paddingBottom: designSystem.SPACING.XXL, // Přidání odsunutí od spodního okraje
        alignItems: 'center',
        padding: designSystem.SPACING.MD,
    },
    backButton: {
        position: 'absolute',
        top: 50, // Bezpečná vzdálenost od vrchu (status bar)
        left: 20,
        padding: designSystem.SPACING.SM,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: designSystem.RADIUS.MD,
    },
    backButtonText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: 'white',
        fontWeight: '600',
    },
    loginContainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        justifyContent: 'space-between', // ← Přidat toto
        backgroundColor: designSystem.COLORS.SURFACE,
        borderRadius: designSystem.RADIUS.LG,
        padding: designSystem.SPACING.XL,
        ...designSystem.SHADOWS.MD,
        minHeight: 280, // ← A toto pro zajištění dostatečné výšky
    },
    welcomeText: {
        ...designSystem.TYPOGRAPHY.H1,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginBottom: designSystem.SPACING.SM,
        textAlign: 'center',
    },
    subtitle: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_SECONDARY,
        marginBottom: designSystem.SPACING.MD,
        textAlign: 'center',
    },
    returnInfo: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: designSystem.COLORS.PRIMARY,
        marginBottom: designSystem.SPACING.MD,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: designSystem.SPACING.LG,
    },
    // Stylování oficiálního tlačítka Apple
    appleOfficialButton: {
        height: 50,
        width: '100%',
        marginBottom: designSystem.SPACING.MD,
    },
    privacyText: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: designSystem.COLORS.TEXT_MUTED,
        textAlign: 'center',
        paddingHorizontal: designSystem.SPACING.MD,
    },
    loadingText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: 'white',
        textAlign: 'center',
    },
});