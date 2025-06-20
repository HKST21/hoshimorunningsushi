import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    ImageBackground,
    Animated,
    Alert
} from 'react-native';
import {useUser} from "../services/UserContext";
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useAnimatedScreenTransition} from "../services/useAnimatedScreenTransition";
import designSystem from "../constants/globalStyles";
import Toast from "react-native-toast-message";
import {getText, getCurrentLanguage} from "../services/LanguageUtils"; // ✅ Import lokalizace

import {frontendClass} from "../services/FeClass";

// Import tokenu z assets
const tokenIcon = require("../../../assets/tokenIcon.png");

// Typy pro Tab Navigator
type RootTabParamList = {
    Home: undefined;
    Kupony: undefined;
    Novinky: undefined;
    Menu: undefined;
    ProfilUzivatele: undefined;
    KoloStesti: undefined;
    ZiskejNavstevy: undefined;
};

type ProfileScreenNavigationProp = BottomTabNavigationProp<RootTabParamList>;

export default function ProfilUzivatele() {
    const {loggedUser, setLoggedUser} = useUser();
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [isLoading, setIsLoading] = useState(false);

    const animationStyles = useAnimatedScreenTransition();

    // Kontrola přihlášení - POKAŽDÉ když se dostaneme na tento screen
    useFocusEffect(
        React.useCallback(() => {
            if (!loggedUser) {
                Alert.alert(
                    getText('myprofile.loginRequired'),
                    getText('myprofile.loginMessage'),
                    [
                        {
                            text: getText('myprofile.back'),
                            style: 'cancel',
                            onPress: () => navigation.navigate('Home') // Přímo na Home tab!
                        },
                        {
                            text: getText('myprofile.signIn'),
                            onPress: () => {
                                // Pro přístup k Stack navigátoru potřebujeme parent navigator
                                (navigation as any).getParent()?.navigate('Login', { returnTo: 'ProfilUzivatele' });
                            }
                        }
                    ]
                );
            }
        }, [loggedUser, navigation])
    );

    // Simulované údaje - později nahradit reálnými daty z API
    const visitCount = loggedUser?.visitCount || 0;

    // Určení levelu uživatele na základě počtu návštěv
    const getUserLevel = () => {
        if (visitCount >= 20) return {
            level: "GOLD",
            progress: 100,
            nextLevel: null,
            description: getText('myprofile.levels.goldDescription')
        };
        if (visitCount >= 10) return {
            level: "SILVER",
            progress: Math.min(100, ((visitCount - 10) / 10) * 100),
            nextLevel: 20,
            description: getText('myprofile.levels.silverDescription')
        };
        return {
            level: "BRONZE",
            progress: Math.min(100, (visitCount / 10) * 100),
            nextLevel: 10,
            description: getText('myprofile.levels.bronzeDescription')
        };
    };

    // Určení aktuálního levelu
    const levelInfo = getUserLevel();

    // Navigace na obrazovku získání tokenů
    const navigateToTokens = () => {
        navigation.navigate('ZiskejNavstevy');
    };

    // Navigace na obrazovku s kupony
    const navigateToVouchers = () => {
        navigation.navigate('Kupony');
    };

    // Pokud není uživatel přihlášen, vrátíme prázdný view (Alert se už zobrazil v useEffect)
    if (!loggedUser) {
        return <View style={{ flex: 1 }} />;
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={designSystem.COLORS.PRIMARY}/>
                <Text style={styles.loadingText}>{getText('myprofile.loadingProfile')}</Text>
            </View>
        );
    }

    // Výpočet počtu dní od vytvoření účtu
    const daysWithUs = () => {
        if (!loggedUser.createdAt) return 0;

        const createdDate = new Date(loggedUser.createdAt);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - createdDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Formátování data podle jazyka
    const formatMemberSinceDate = (date: Date): string => {
        const currentLang = getCurrentLanguage();
        const locale = currentLang === 'cs' ? 'cs-CZ' : 'en-GB';
        return new Date(date).toLocaleDateString(locale);
    };

    const handleLogout = () => {
        // Zobrazení potvrzovacího dialogu
        Alert.alert(
            getText('myprofile.logout.title'),
            getText('myprofile.logout.message'),
            [
                {
                    text: getText('myprofile.logout.cancel'),
                    style: 'cancel',
                },
                {
                    text: getText('myprofile.logout.signOut'),
                    onPress: async () => {
                        try {
                            // Volání funkce setLoggedUser s null pro odhlášení
                            const success = await setLoggedUser(null);

                            if (success) {
                                // Zobrazení zprávy o úspěchu
                                Toast.show({
                                    type: 'success',
                                    text1: getText('myprofile.logout.success'),
                                    text2: getText('myprofile.logout.successMessage'),
                                });

                                // Poznámka: Přesměrování zpět na přihlašovací obrazovku by mělo proběhnout
                                // automaticky v AppNavigator.tsx, protože kontroluje stav loggedUser
                            } else {
                                throw new Error('Odhlášení selhalo');
                            }
                        } catch (error) {
                            // Zobrazení chybové zprávy
                            Toast.show({
                                type: 'error',
                                text1: getText('myprofile.logout.error'),
                                text2: getText('myprofile.logout.errorMessage'),
                            });
                            console.error('Chyba při odhlášení:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            getText('myprofile.deleteAccount.title'),
            getText('myprofile.deleteAccount.message'),
            [
                {
                    text: getText('myprofile.deleteAccount.cancel'),
                    style: 'cancel',
                },
                {
                    text: getText('myprofile.deleteAccount.delete'),
                    style: 'destructive',
                    onPress: () => {
                        // Druhé potvrzení pro větší jistotu
                        Alert.alert(
                            getText('myprofile.deleteAccount.finalTitle'),
                            getText('myprofile.deleteAccount.finalMessage'),
                            [
                                {
                                    text: getText('myprofile.deleteAccount.keepAccount'),
                                    style: 'cancel',
                                },
                                {
                                    text: getText('myprofile.deleteAccount.yesDelete'),
                                    style: 'destructive',
                                    onPress: performAccountDeletion,
                                },
                            ]
                        );
                    },
                },
            ]
        );
    };

    const performAccountDeletion = async () => {
        if (!loggedUser?.id) {
            Toast.show({
                type: 'error',
                text1: getText('myprofile.deleteAccount.errorTitle'),
                text2: getText('myprofile.deleteAccount.userNotFound'),
            });
            return;
        }

        setIsLoading(true);

        try {
            // Import frontendClass - ujisti se, že máš správný import

            // Volání API pro smazání účtu
            const success = await frontendClass.deleteUserAccount(loggedUser.id);

            if (success) {
                // Úspěšné smazání - nejprve zobrazíme zprávu
                Toast.show({
                    type: 'success',
                    text1: getText('myprofile.deleteAccount.successTitle'),
                    text2: getText('myprofile.deleteAccount.successMessage'),
                });

                // Pak odhlásíme uživatele (smaže z local storage)
                await setLoggedUser(null);

                // Navigace proběhne automaticky přes AppNavigator
            } else {
                throw new Error('Smazání účtu selhalo');
            }
        } catch (error) {
            console.error('Chyba při mazání účtu:', error);

            let errorMessage = getText('myprofile.deleteAccount.defaultError');

            if (error instanceof Error) {
                if (error.message.includes('nebyl nalezen')) {
                    errorMessage = getText('myprofile.deleteAccount.accountNotFound');
                } else if (error.message.includes('network') || error.message.includes('fetch')) {
                    errorMessage = getText('myprofile.deleteAccount.connectionError');
                }
            }

            Toast.show({
                type: 'error',
                text1: getText('myprofile.deleteAccount.errorTitle'),
                text2: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Animated.View style={[{flex: 1}, animationStyles]}>
            <View style={styles.safeArea}>
                <ScrollView style={styles.scrollView}
                            contentContainerStyle={{ paddingBottom: 60 }}
                            showsVerticalScrollIndicator={false}
                            bounces={true}>
                    {/* Hlavička profilu s pizzou na pozadí */}
                    <ImageBackground
                        source={require('../../../assets/kupony.jpg')}
                        style={styles.headerBackground}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
                            style={styles.headerContainer}
                        >
                            <View style={styles.profileHeaderCentered}>
                                <Image
                                    source={{uri: loggedUser.profilePicture || 'https://via.placeholder.com/150'}}
                                    style={styles.profileImageCentered}
                                />
                                <Text style={styles.userNameCentered}>{loggedUser.name}</Text>
                                <View style={[
                                    styles.levelBadgeCentered,
                                    levelInfo.level === "GOLD" ? styles.goldBadge :
                                        levelInfo.level === "SILVER" ? styles.silverBadge :
                                            styles.bronzeBadge
                                ]}>
                                    <Text style={styles.levelText}>{getText(`myprofile.levels.${levelInfo.level.toLowerCase()}`)}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>

                    {/* Sekce se shrnutím */}
                    <View style={styles.summarySection}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>{visitCount}</Text>
                            <Text style={styles.summaryLabel}>{getText('myprofile.summary.visits')}</Text>
                        </View>
                        <View style={styles.summaryDivider}/>

                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>Hoshimo</Text>
                            <Text style={styles.summaryLabel}>{getText('myprofile.summary.runningSushi')}</Text>
                        </View>
                        <View style={styles.summaryDivider}/>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>{loggedUser.vouchers?.length || 0}</Text>
                            <Text style={styles.summaryLabel}>{getText('myprofile.summary.coupons')}</Text>
                        </View>
                    </View>

                    {/* Sekce s levelem a progresem */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>{getText('myprofile.loyaltyProgram')}</Text>

                        <View style={styles.levelContainer}>
                            <View style={styles.levelHeader}>
                                <Text style={styles.levelTitle}>
                                    {getText('myprofile.level')}: {getText(`myprofile.levels.${levelInfo.level.toLowerCase()}`)}
                                </Text>
                                <Text style={styles.visitCount}>
                                    {getText('myprofile.visitsCount', { count: visitCount })}
                                </Text>
                            </View>

                            <Text style={styles.levelDescription}>
                                {levelInfo.description}
                            </Text>

                            {levelInfo.nextLevel && (
                                <>
                                    <View style={styles.progressContainer}>
                                        <View style={styles.progressBackground}>
                                            <View
                                                style={[
                                                    styles.progressFill,
                                                    {width: `${levelInfo.progress}%`},
                                                    levelInfo.level === "SILVER" ? styles.silverProgress : styles.bronzeProgress
                                                ]}
                                            />
                                        </View>
                                        <Text style={styles.nextLevelText}>
                                            {getText('myprofile.nextLevelIn', { visits: levelInfo.nextLevel - visitCount })}
                                        </Text>
                                    </View>

                                    <View style={styles.upcomingLevelContainer}>
                                        <Text style={styles.upcomingLevelTitle}>{getText('myprofile.nextLevelBrings')}</Text>
                                        <View style={styles.upcomingLevelBenefit}>
                                            <Ionicons name="star" size={18} color={designSystem.COLORS.PRIMARY}/>
                                            <Text style={styles.upcomingLevelText}>
                                                {levelInfo.level === "BRONZE" ?
                                                    getText('myprofile.levels.silverDescription') :
                                                    getText('myprofile.levels.goldDescription')}
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            )}

                            {levelInfo.level === "GOLD" && (
                                <View style={styles.maxLevelContainer}>
                                    <Ionicons name="trophy" size={50} color="#FFD700"/>
                                    <Text style={styles.maxLevelText}>
                                        {getText('myprofile.congratulations')}
                                    </Text>
                                    <Text style={styles.maxLevelSubtext}>
                                        {getText('myprofile.enjoyDiscount')}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Sekce s tokeny a rychlými akcemi */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>{getText('myprofile.yourVisits')}</Text>

                        <View style={styles.tokenContainer}>
                            <View style={styles.tokenDisplay}>
                                <Image
                                    source={tokenIcon}
                                    style={styles.tokenIconImage}
                                />
                                <Text style={styles.tokenAmount}>{loggedUser.visitCount}</Text>
                            </View>

                            <View style={styles.tokenActions}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={navigateToTokens}
                                    activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                                >
                                    <Ionicons name="add-circle" size={20} color={designSystem.COLORS.TEXT_ON_PRIMARY}/>
                                    <Text style={styles.actionButtonText}>{getText('myprofile.confirmVisit')}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, { backgroundColor: designSystem.COLORS.SUCCESS }]}
                                    onPress={navigateToVouchers}
                                    activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                                >
                                    <Ionicons name="gift" size={20} color={designSystem.COLORS.TEXT_ON_PRIMARY}/>
                                    <Text style={styles.actionButtonText}>{getText('myprofile.myCoupons')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Sekce s exkluzivními nabídkami - viditelná pouze pro SILVER a GOLD */}
                    {(levelInfo.level === "SILVER" || levelInfo.level === "GOLD") ? (
                        <View style={styles.infoSection}>
                            <Text style={styles.sectionTitle}>{getText('myprofile.exclusiveOffers')}</Text>

                            <TouchableOpacity
                                style={styles.exclusiveOfferContainer}
                                onPress={() => navigation.navigate('Home')}
                                activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            >
                                <LinearGradient
                                    colors={['#8e2de2', '#4a00e0']}
                                    style={styles.exclusiveGradient}
                                >
                                    <Text style={styles.exclusiveTitle}>{getText('myprofile.specialOffersTitle')}</Text>
                                    <Text style={styles.exclusiveSubtitle}>
                                        {getText('myprofile.specialOffersSubtitle', { level: getText(`myprofile.levels.${levelInfo.level.toLowerCase()}`) })}
                                    </Text>

                                    {levelInfo.level === "GOLD" && (
                                        <View style={styles.discountBadge}>
                                            <Text style={styles.discountText}>{getText('myprofile.tenPercentDiscount')}</Text>
                                        </View>
                                    )}

                                    <View style={styles.exclusiveActionButton}>
                                        <Text style={styles.exclusiveActionText}>{getText('myprofile.viewOffers')}</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.infoSection}>
                            <Text style={styles.sectionTitle}>{getText('myprofile.exclusiveOffers')}</Text>

                            <View style={styles.lockedContainer}>
                                <Ionicons name="lock-closed" size={40} color={designSystem.COLORS.TEXT_MUTED}/>
                                <Text style={styles.lockedTitle}>{getText('myprofile.lockedContent')}</Text>
                                <Text style={styles.lockedDescription}>
                                    {getText('myprofile.lockedDescription')}
                                </Text>
                                <View style={styles.lockedProgressContainer}>
                                    <View style={styles.lockedProgressBackground}>
                                        <View
                                            style={[
                                                styles.lockedProgressFill,
                                                {width: `${levelInfo.progress}%`}
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.lockedProgressText}>
                                        {getText('myprofile.progressVisits', { current: visitCount, total: 10 })}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Sekce s informacemi o členství */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>{getText('myprofile.yourMembership')}</Text>

                        <View style={styles.membershipContainer}>
                            <View style={styles.membershipItem}>
                                <Ionicons name="calendar" size={24} color={designSystem.COLORS.TEXT_SECONDARY}/>
                                <View style={styles.membershipTextContainer}>
                                    <Text style={styles.membershipLabel}>{getText('myprofile.memberSince')}</Text>
                                    <Text style={styles.membershipValue}>
                                        {formatMemberSinceDate(loggedUser.createdAt)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.membershipItem}>
                                <Ionicons name="time" size={24} color={designSystem.COLORS.TEXT_SECONDARY}/>
                                <View style={styles.membershipTextContainer}>
                                    <Text style={styles.membershipLabel}>{getText('myprofile.daysWithUs')}</Text>
                                    <Text style={styles.membershipValue}>{daysWithUs()}</Text>
                                </View>
                            </View>

                            <View style={styles.membershipItem}>
                                <Ionicons name="mail" size={24} color={designSystem.COLORS.TEXT_SECONDARY}/>
                                <View style={styles.membershipTextContainer}>
                                    <Text style={styles.membershipLabel}>{getText('myprofile.email')}</Text>
                                    <Text style={styles.membershipValue}>{loggedUser.email}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Sekce pro odhlášení a smazání účtu */}
                    <View style={styles.logoutContainer}>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            onPress={handleLogout}
                        >
                            <Ionicons name="log-out-outline" size={20} color={designSystem.COLORS.TEXT_SECONDARY}/>
                            <Text style={styles.logoutText}>{getText('myprofile.signOut')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteAccountButton}
                            activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            onPress={handleDeleteAccount}
                            disabled={isLoading}
                        >
                            <Ionicons name="trash-outline" size={20} color={designSystem.COLORS.BORDER_ERROR}/>
                            <Text style={styles.deleteAccountText}>
                                {isLoading ? getText('myprofile.deletingAccount') : getText('myprofile.deleteAccount.buttonText')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: designSystem.COLORS.BACKGROUND,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: designSystem.SPACING.MD,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: designSystem.SPACING.SM,
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_SECONDARY,
    },
    errorText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.PRIMARY,
        textAlign: 'center',
    },
    headerBackground: {
        height: 350, // Zvýšená výška pro lepší vzhled centrovaného designu
    },
    headerContainer: {
        height: '100%',
        padding: designSystem.SPACING.MD,
        justifyContent: 'center', // Centrování obsahu vertikálně
        alignItems: 'center', // Centrování obsahu horizontálně
    },
    profileHeaderCentered: {
        alignItems: 'center', // Centrování všech prvků
        justifyContent: 'center',
    },
    profileImageCentered: {
        width: 100,
        height: 100,
        borderRadius: designSystem.RADIUS.FULL,
        borderWidth: 3,
        borderColor: designSystem.COLORS.TEXT_ON_PRIMARY,
        marginBottom: designSystem.SPACING.SM, // Mezera mezi fotkou a jménem
    },
    userNameCentered: {
        ...designSystem.TYPOGRAPHY.H2,
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        marginBottom: designSystem.SPACING.XS,
        textAlign: 'center', // Zarovnání textu na střed
    },
    levelBadgeCentered: {
        paddingHorizontal: designSystem.SPACING.MD,
        paddingVertical: designSystem.SPACING.XS,
        borderRadius: designSystem.RADIUS.FULL,
        marginTop: designSystem.SPACING.XS, // Mezera nad badgem
    },
    summarySection: {
        backgroundColor: designSystem.COLORS.SURFACE,
        flexDirection: 'row',
        marginHorizontal: designSystem.SPACING.SM,
        marginTop: -20,
        borderRadius: designSystem.RADIUS.MD,
        ...designSystem.SHADOWS.MD,
        paddingVertical: designSystem.SPACING.MD,
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    summaryNumber: {
        ...designSystem.TYPOGRAPHY.H3,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginBottom: designSystem.SPACING.XS,
    },
    summaryLabel: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: designSystem.COLORS.TEXT_SECONDARY,
    },
    summaryDivider: {
        width: 1,
        height: '50%',
        backgroundColor: designSystem.COLORS.BORDER_DEFAULT,
    },
    infoSection: {
        backgroundColor: designSystem.COLORS.SURFACE,
        borderRadius: designSystem.RADIUS.MD,
        margin: designSystem.SPACING.SM,
        padding: designSystem.SPACING.MD,
        ...designSystem.SHADOWS.SM,
    },
    sectionTitle: {
        ...designSystem.TYPOGRAPHY.H3,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginBottom: designSystem.SPACING.MD,
        borderBottomWidth: 1,
        borderBottomColor: designSystem.COLORS.BORDER_DEFAULT,
        paddingBottom: designSystem.SPACING.XS,
    },
    levelContainer: {
        padding: designSystem.SPACING.XS,
    },
    levelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: designSystem.SPACING.SM,
    },
    levelTitle: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    visitCount: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_SECONDARY,
    },
    levelDescription: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: designSystem.COLORS.TEXT_SECONDARY,
        marginBottom: designSystem.SPACING.MD,
        fontStyle: 'italic',
    },
    progressContainer: {
        marginBottom: designSystem.SPACING.MD,
    },
    progressBackground: {
        height: 10,
        backgroundColor: designSystem.COLORS.BORDER_DEFAULT,
        borderRadius: designSystem.RADIUS.SM,
        overflow: 'hidden',
        marginBottom: designSystem.SPACING.XS,
    },
    progressFill: {
        height: '100%',
    },
    // Ponecháno hardcoded, jak bylo požadováno
    bronzeProgress: {
        backgroundColor: '#CD7F32',
    },
    silverProgress: {
        backgroundColor: '#C0C0C0',
    },
    bronzeBadge: {
        backgroundColor: '#CD7F32',
    },
    silverBadge: {
        backgroundColor: '#C0C0C0',
    },
    goldBadge: {
        backgroundColor: '#FFD700',
    },
    levelText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        fontWeight: 'bold',
        fontSize: 14,
    },
    nextLevelText: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: designSystem.COLORS.TEXT_SECONDARY,
        textAlign: 'right',
    },
    upcomingLevelContainer: {
        marginTop: designSystem.SPACING.SM,
        backgroundColor: designSystem.COLORS.BACKGROUND,
        padding: designSystem.SPACING.SM,
        borderRadius: designSystem.RADIUS.SM,
    },
    upcomingLevelTitle: {
        ...designSystem.TYPOGRAPHY.SMALL,
        fontWeight: 'bold',
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginBottom: designSystem.SPACING.XS,
    },
    upcomingLevelBenefit: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upcomingLevelText: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginLeft: designSystem.SPACING.XS,
    },
    maxLevelContainer: {
        alignItems: 'center',
        marginTop: designSystem.SPACING.MD,
        padding: designSystem.SPACING.MD,
        backgroundColor: '#FFF9E6', // Ponecháno hardcoded pro zlatý level
        borderRadius: designSystem.RADIUS.MD,
    },
    maxLevelText: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginTop: designSystem.SPACING.SM,
        textAlign: 'center',
    },
    maxLevelSubtext: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: designSystem.COLORS.TEXT_SECONDARY,
        marginTop: designSystem.SPACING.XS,
        textAlign: 'center',
    },
    tokenContainer: {
        alignItems: 'center',
    },
    tokenDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: designSystem.SPACING.LG,
    },
    tokenIconImage: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
    },
    tokenAmount: {
        ...designSystem.TYPOGRAPHY.H1,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginLeft: designSystem.SPACING.SM,
    },
    tokenActions: {
        width: '100%',
    },
    actionButton: {
        flexDirection: 'row',
        backgroundColor: designSystem.COLORS.PRIMARY,
        paddingHorizontal: designSystem.SPACING.MD,
        paddingVertical: designSystem.SPACING.MD,
        borderRadius: designSystem.RADIUS.SM,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: designSystem.SPACING.MD,
        ...designSystem.SHADOWS.SM,
    },
    actionButtonText: {
        ...designSystem.TYPOGRAPHY.BUTTON,
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        marginLeft: designSystem.SPACING.XS,
    },
    exclusiveOfferContainer: {
        borderRadius: designSystem.RADIUS.MD,
        overflow: 'hidden',
        marginBottom: designSystem.SPACING.SM,
        ...designSystem.SHADOWS.MD,
    },
    exclusiveGradient: {
        padding: designSystem.SPACING.MD,
        alignItems: 'center',
    },
    exclusiveTitle: {
        ...designSystem.TYPOGRAPHY.H3,
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        marginBottom: designSystem.SPACING.XS,
    },
    exclusiveSubtitle: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        marginBottom: designSystem.SPACING.MD,
    },
    discountBadge: {
        backgroundColor: '#ffeb3b', // Ponecháno hardcoded pro badge
        paddingHorizontal: designSystem.SPACING.MD,
        paddingVertical: designSystem.SPACING.XS,
        borderRadius: designSystem.RADIUS.FULL,
        marginBottom: designSystem.SPACING.MD,
    },
    discountText: {
        ...designSystem.TYPOGRAPHY.LABEL,
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    exclusiveActionButton: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingVertical: designSystem.SPACING.SM,
        paddingHorizontal: designSystem.SPACING.MD,
        borderRadius: designSystem.RADIUS.SM,
    },
    exclusiveActionText: {
        ...designSystem.TYPOGRAPHY.BUTTON,
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
    },
    lockedContainer: {
        alignItems: 'center',
        padding: designSystem.SPACING.MD,
        backgroundColor: designSystem.COLORS.BACKGROUND,
        borderRadius: designSystem.RADIUS.MD,
    },
    lockedTitle: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: designSystem.COLORS.TEXT_SECONDARY,
        marginTop: designSystem.SPACING.SM,
        marginBottom: designSystem.SPACING.XS,
    },
    lockedDescription: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: designSystem.COLORS.TEXT_MUTED,
        textAlign: 'center',
        marginBottom: designSystem.SPACING.MD,
    },
    lockedProgressContainer: {
        width: '100%',
    },
    lockedProgressBackground: {
        height: 8,
        backgroundColor: designSystem.COLORS.BORDER_DEFAULT,
        borderRadius: designSystem.RADIUS.SM,
        overflow: 'hidden',
        marginBottom: designSystem.SPACING.XS,
    },
    lockedProgressFill: {
        height: '100%',
        backgroundColor: designSystem.COLORS.PRIMARY,
    },
    lockedProgressText: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: designSystem.COLORS.TEXT_MUTED,
        textAlign: 'right',
    },
    membershipContainer: {
        backgroundColor: designSystem.COLORS.BACKGROUND,
        borderRadius: designSystem.RADIUS.MD,
        padding: designSystem.SPACING.MD,
    },
    membershipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: designSystem.SPACING.MD,
    },
    membershipTextContainer: {
        marginLeft: designSystem.SPACING.MD,
    },
    membershipLabel: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: designSystem.COLORS.TEXT_SECONDARY,
    },
    membershipValue: {
        ...designSystem.TYPOGRAPHY.SMALL,
        fontWeight: 'bold',
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    logoutContainer: {
        padding: designSystem.SPACING.MD,
        alignItems: 'center',
        marginBottom: designSystem.SPACING.MD,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: designSystem.SPACING.SM,
    },
    logoutText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_SECONDARY,
        marginLeft: designSystem.SPACING.XS,
    },
    deleteAccountButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: designSystem.SPACING.SM,
        marginTop: designSystem.SPACING.SM,
    },
    deleteAccountText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.BORDER_ERROR,
        marginLeft: designSystem.SPACING.XS,
    },
});