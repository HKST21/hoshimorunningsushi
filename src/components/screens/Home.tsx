import React, {useRef, useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    ScrollView,
    SafeAreaView,
    Modal,
    TextInput,
    Alert,
    Vibration,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {Video, AVPlaybackStatus, ResizeMode} from 'expo-av';
import {useUser} from "../services/UserContext";
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useAnimatedScreenTransition} from "../services/useAnimatedScreenTransition";
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {getText} from "../services/LanguageUtils"; // ✅ Import lokalizace
import designSystem from '../constants/globalStyles';
import {frontendClass} from "../services/FeClass";

// Import obrázků
const tokenIcon = require("../../../assets/tokenIcon.png");

// Získání šířky obrazovky pro správné rozměry
const {width: SCREEN_WIDTH} = Dimensions.get('window');
import {Dimensions} from 'react-native';

const {TYPOGRAPHY, COLORS, SPACING, COMPONENTS} = designSystem;

// Typy pro Tab Navigator - všechny obrazovky v Tab.Navigatoru
type RootTabParamList = {
    Home: undefined;
    Kupony: undefined;
    Novinky: undefined;
    Objednat: undefined;
    ProfilUzivatele: undefined;
    ZiskejNavstevy: undefined;
    Rezervace: undefined;
    VipNabidky: undefined;
    JakToFunguje: undefined;
    Kontakt: undefined;
    Oslavy: undefined;
    Login: { returnTo?: string };
};

// Vytvoříme typ pro navigací prop, který používá Tab Navigator
type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList>;

export default function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const videoRef = useRef<Video>(null);
    const animationStyles = useAnimatedScreenTransition();
    const {loggedUser, setLoggedUser} = useUser();

    // Stavy pro modal doplnění profilu
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasShownModal, setHasShownModal] = useState(false);
    const [branches, setBranches] = useState<{id: number, name: string}[]>([]);
    const [loading, setLoading] = useState(true);

    // Running sushi animace
    const scrollX = useRef(new Animated.Value(0)).current;

    // Reference pro animované hodnoty dlaždic
    const tileScaleAnims = [
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current
    ];

    useEffect(() => {
        const loadBranches = async () => {
            try {
                setLoading(true);
                console.log('🔄 Načítám pobočky...');
                const result = await frontendClass.getBranches();
                console.log('📦 Výsledek:', result);
                if (result) {
                    setBranches(result);
                    console.log('✅ Pobočky nastaveny:', result);
                }
            } catch (error) {
                console.error('❌ Chyba při načítání poboček:', error);
            } finally {
                setLoading(false);
            }
        };
        loadBranches();
    }, []);

    // KONTROLA NEÚPLNÉHO PROFILU - ale jen jednou za session
    useEffect(() => {
        if (loggedUser && !hasShownModal) {
            const needsProfileCompletion = checkIfNeedsProfileCompletion(loggedUser);
            if (needsProfileCompletion.needed) {
                // Nastav výchozí hodnoty
                setEmail(needsProfileCompletion.needsEmail ? '' : loggedUser.email);
                setFirstName(needsProfileCompletion.needsName ? '' : getFirstName(loggedUser.name));
                setLastName(needsProfileCompletion.needsName ? '' : getLastName(loggedUser.name));

                setShowProfileModal(true);
                setHasShownModal(true); // Zobraz jen jednou za session
            }
        }
    }, [loggedUser, hasShownModal]);

    // DETEKCE APPLE GENEROVANÝCH ÚDAJŮ
    const checkIfNeedsProfileCompletion = (user: any) => {
        const email = user.email || '';
        const name = user.name || '';

        // Detekce skrytého emailu
        const needsEmail = email.includes('@privaterelay.appleid.com') ||
            email.includes('hide-my-email') ||
            email.includes('@example.com') ||
            email.includes('user-') ||
            !email.includes('@');

        // Detekce generovaného jména
        const needsName = name.includes('AppleFn') ||
            name.includes('APPLEFN') ||
            name.startsWith('AppleFn') ||
            name.startsWith('APPLEFN') ||
            name.trim().length === 0;

        const result = {
            needed: needsEmail || needsName,
            needsEmail,
            needsName
        };

        return result;
    };

    // HELPER FUNKCE PRO JMÉNA
    const getFirstName = (fullName: string) => {
        return fullName ? fullName.split(' ')[0] : '';
    };

    const getLastName = (fullName: string) => {
        const parts = fullName ? fullName.split(' ') : [];
        parts.shift(); // Odstraň první jméno
        return parts.join(' ');
    };

    // AKTUALIZACE PROFILU - POUZE FRONTEND
    const handleUpdateProfile = async () => {
        if (!loggedUser) {
            Alert.alert(getText('common.error'), getText('profile.userNotLoggedIn'));
            return;
        }

        // Validace
        if (!firstName.trim()) {
            Alert.alert(getText('common.error'), getText('profile.enterFirstName'));
            return;
        }
        if (!email.trim() || !email.includes('@')) {
            Alert.alert(getText('common.error'), getText('profile.enterValidEmail'));
            return;
        }

        setIsUpdating(true);

        try {
            const updatedUser = await frontendClass.updateUserProfile(loggedUser.id, {
                firstName: firstName.trim(),
                name: `${firstName.trim()} ${lastName.trim()}`.trim(),
                email: email.trim()
            });

            if (!updatedUser) {
                throw new Error('Backend nevrátil aktualizovaného uživatele');
            }

            await setLoggedUser(updatedUser);
            setShowProfileModal(false);

            Alert.alert(
                getText('common.success'),
                getText('profile.profileUpdatedSuccessfully'),
                [{text: getText('common.ok')}]
            );

        } catch (error) {
            console.error('❌ Error updating profile:', error);

            if (error instanceof Error) {
                if (error.message.includes('400') || error.message.includes('Chyba v požadavku')) {
                    Alert.alert(getText('common.error'), getText('profile.invalidData'));
                } else if (error.message.includes('404') || error.message.includes('nebyl nalezen')) {
                    Alert.alert(getText('common.error'), getText('profile.userNotFound'));
                } else if (error.message.includes('500') || error.message.includes('Chyba serveru')) {
                    Alert.alert(getText('common.error'), getText('profile.serverError'));
                } else if (error.message.includes('Síťová chyba')) {
                    Alert.alert(getText('common.error'), getText('profile.connectionProblem'));
                } else {
                    Alert.alert(getText('common.error'), getText('profile.updateFailed'));
                }
            } else {
                Alert.alert(getText('common.error'), getText('profile.unexpectedError'));
            }
        } finally {
            setIsUpdating(false);
        }
    };

    // Efekt pro cleanup animací a spuštění running sushi animace
    useEffect(() => {
        // ✅ Počkej, až se data načtou
        if (branches.length === 0) {
            console.log('⏳ Čekám na načtení poboček...');
            return;
        }

        console.log('🎬 Spouštím animaci s', branches.length, 'pobočkami');

        // Cleanup pro tile animace
        const cleanup = () => {
            tileScaleAnims.forEach(anim => {
                anim.stopAnimation();
                anim.setValue(1);
            });
        };

        // Spuštění nekonečné running sushi animace
        const startSushiAnimation = () => {
            const totalWidth = (120 + 12) * branches.length; // šířka tile + mezera

            Animated.loop(
                Animated.timing(scrollX, {
                    toValue: -totalWidth,
                    duration: totalWidth * 50, // 50ms na pixel pro plynulou rychlost
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                {iterations: -1} // nekonečná smyčka
            ).start();
        };

        startSushiAnimation();

        return cleanup;
    }, [branches]); // ✅ Závislost na state branches

    // Nastavení automatického přehrávání videa, když je komponenta načtena
    useEffect(() => {
        const loadVideo = async () => {
            if (videoRef.current) {
                try {
                    await videoRef.current.playAsync();
                } catch (error) {
                    console.error("Chyba při přehrávání videa:", error);
                }
            }
        };

        loadVideo();

        return () => {
            if (videoRef.current) {
                videoRef.current.unloadAsync();
            }
        };
    }, []);

    // Funkce pro navigaci na jinou obrazovku v Tab Navigatoru
    const navigateTo = (screenName: keyof RootTabParamList) => {
        navigation.navigate(screenName as any);
    };

    // Funkce pro animaci stisknutí dlaždice
    const onTilePressIn = (index: number) => {
        tileScaleAnims[index].stopAnimation();
        Animated.timing(tileScaleAnims[index], {
            toValue: 0.95,
            duration: 90,
            useNativeDriver: true
        }).start();
    };

    // Funkce pro animaci uvolnění dlaždice
    const onTilePressOut = (index: number) => {
        tileScaleAnims[index].stopAnimation();
        Animated.spring(tileScaleAnims[index], {
            toValue: 1,
            tension: 400,
            friction: 8,
            useNativeDriver: true
        }).start();
    };

    // Výpočet počtu dní od vytvoření účtu
    const getDaysWithUs = () => {
        if (!loggedUser?.createdAt) return 0;

        const createdDate = new Date(loggedUser.createdAt);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - createdDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Funkce pro určení levelu uživatele
    const getUserLevel = () => {
        const visitCount = loggedUser?.visitCount || 0;
        if (visitCount >= 20) return getText('home.levels.gold');
        if (visitCount >= 10) return getText('home.levels.silver');
        return getText('home.levels.bronze');
    };

    // RENDER MODAL PRO DOPLNĚNÍ PROFILU
    const renderProfileModal = () => {
        const checkResult = loggedUser ? checkIfNeedsProfileCompletion(loggedUser) : {
            needsEmail: false,
            needsName: false
        };

        return (
            <Modal
                visible={showProfileModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowProfileModal(false)}
            >
                <View style={modalStyles.overlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{flex: 1, justifyContent: 'center'}}
                    >
                        <ScrollView
                            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            style={{maxWidth: '100%'}}
                        >
                            <LinearGradient
                                colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]}
                                style={modalStyles.modalContainer}
                            >
                                <Text style={modalStyles.modalTitle}>
                                    {getText('profile.completeProfileTitle')} 📝
                                </Text>

                                <Text style={modalStyles.modalSubtitle}>
                                    {getText('profile.completeProfileSubtitle')}
                                </Text>

                                {checkResult.needsName && (
                                    <>
                                        <Text style={modalStyles.inputLabel}>
                                            {getText('profile.firstName')} *
                                        </Text>
                                        <TextInput
                                            style={modalStyles.textInput}
                                            placeholder={getText('profile.firstNamePlaceholder')}
                                            placeholderTextColor={COLORS.TILE_TEXT + '80'}
                                            value={firstName}
                                            onChangeText={setFirstName}
                                            autoCapitalize="words"
                                        />

                                        <Text style={[modalStyles.inputLabel, {marginTop: SPACING.MD}]}>
                                            {getText('profile.surname')}
                                        </Text>
                                        <TextInput
                                            style={modalStyles.textInput}
                                            placeholder={getText('profile.surnamePlaceholder')}
                                            placeholderTextColor={COLORS.TILE_TEXT + '80'}
                                            value={lastName}
                                            onChangeText={setLastName}
                                            autoCapitalize="words"
                                        />
                                    </>
                                )}

                                {checkResult.needsEmail && (
                                    <>
                                        <Text style={[modalStyles.inputLabel, {marginTop: SPACING.MD}]}>
                                            {getText('profile.email')} *
                                        </Text>
                                        <TextInput
                                            style={modalStyles.textInput}
                                            placeholder={getText('profile.emailPlaceholder')}
                                            placeholderTextColor={COLORS.TILE_TEXT + '80'}
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                        <Text style={modalStyles.emailHint}>
                                            {getText('profile.emailHint')}
                                        </Text>
                                    </>
                                )}

                                <TouchableOpacity
                                    style={[
                                        modalStyles.primaryButton,
                                        isUpdating && modalStyles.disabledButton
                                    ]}
                                    onPress={handleUpdateProfile}
                                    disabled={isUpdating}
                                    activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                                >
                                    <Text style={modalStyles.primaryButtonText}>
                                        {isUpdating ? getText('profile.updating') : getText('profile.completeProfile')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={modalStyles.secondaryButton}
                                    onPress={() => setShowProfileModal(false)}
                                    activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                                >
                                    <Text style={modalStyles.secondaryButtonText}>
                                        {getText('profile.maybeLater')}
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        );
    };

    return (
        <Animated.View
            style={[
                {
                    flex: 1,
                },
                animationStyles
            ]}
        >
            <View style={styles.safeArea}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{paddingBottom: 70}}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                >
                    <View style={styles.mainContainer}>
                        {/* Video sekce přes celou šířku obrazovky */}
                        <View style={styles.videoContainer}>
                            <Video
                                ref={videoRef}
                                source={require('../../../assets/hoshimointro.mp4')}
                                style={styles.video}
                                resizeMode={ResizeMode.COVER}
                                isLooping
                                isMuted={true}
                                shouldPlay
                                onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                                    if (status.isLoaded && status.didJustFinish) {
                                        videoRef.current?.replayAsync();
                                    }
                                }}
                            />
                        </View>

                        {/* NOVÁ GRADIENT INFORMAČNÍ SEKCE místo welcome stripu */}
                        <LinearGradient
                            colors={['rgba(185, 28, 28, 0.9)', COLORS.ACCENT]}
                            style={styles.infoGradient}
                        >
                            <View style={styles.infoContent}>
                                <Text style={styles.infoText}>
                                    {getText('home.welcome', {
                                        name: loggedUser && !checkIfNeedsProfileCompletion(loggedUser).needsName
                                            ? loggedUser.name
                                            : 'uživateli'
                                    })}
                                </Text>
                            </View>
                        </LinearGradient>

                        {/* NOVÁ SUMMARY SEKCE - s ikonkami */}
                        <View style={styles.summarySection}>
                            <View style={styles.summaryItem}>
                                <Image
                                    source={tokenIcon}
                                    style={styles.summaryIcon}
                                />
                                <Text style={styles.summaryNumber}>{getDaysWithUs()}</Text>
                                <Text style={styles.summaryLabel}>{getText('home.daysWithUs')}</Text>
                            </View>
                            <View style={styles.summaryDivider}/>

                            <View style={styles.summaryItem}>
                                <Ionicons name="gift" size={24} color={COLORS.PRIMARY}/>
                                <Text style={styles.summaryNumber}>{loggedUser?.vouchers?.length || 0}</Text>
                                <Text style={styles.summaryLabel}>{getText('home.coupons')}</Text>
                            </View>
                            <View style={styles.summaryDivider}/>
                            <View style={styles.summaryItem}>
                                <Ionicons name="location" size={24} color={COLORS.PRIMARY}/>
                                <Text style={styles.summaryNumber}>{loggedUser?.visitCount || 0}</Text>
                                <Text style={styles.summaryLabel}>{getText('home.visits')}</Text>
                            </View>
                        </View>

                        {/* NOVÁ SEKCE S HLAVNÍMI TLAČÍTKY */}
                        <View style={styles.actionsSection}>
                            <Text style={styles.actionsSectionTitle}>
                                {getText('home.discoverBenefits')}
                            </Text>

                            <TouchableOpacity
                                style={styles.primaryActionButton}
                                onPress={() => navigateTo('ZiskejNavstevy')}
                                activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            >
                                <Ionicons name="scan-outline" size={20} color={COLORS.TEXT_ON_PRIMARY}/>
                                <Text style={styles.primaryActionButtonText}>{getText('home.confirmVisit')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.secondaryActionButton}
                                onPress={() => navigateTo('Kupony')}
                                activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            >
                                <Ionicons name="ticket-outline" size={20} color={COLORS.PRIMARY}/>
                                <Text style={styles.secondaryActionButtonText}>{getText('home.browseCoupons')}</Text>
                            </TouchableOpacity>

                            {/* Level badge a "Jak to funguje" tlačítko v řádku */}
                            <View style={styles.levelContainer}>
                                <View style={[
                                    styles.levelBadge,
                                    getUserLevel() === getText('home.levels.gold') ? styles.goldBadge :
                                        getUserLevel() === getText('home.levels.silver') ? styles.silverBadge :
                                            styles.bronzeBadge
                                ]}>
                                    <Text style={styles.levelText}>{getUserLevel()} {getText('home.member')}</Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.howItWorksButton}
                                    onPress={() => navigateTo('JakToFunguje')}
                                    activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                                >
                                    <Ionicons name="help-circle-outline" size={16} color={COLORS.TEXT_SECONDARY}/>
                                    <Text style={styles.howItWorksText}>{getText('home.howItWorks')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* NOVÁ SEKCE POBOČKY - RUNNING SUSHI STYL */}
                        <View style={styles.branchesSection}>
                            {loading ? (
                                <Text style={styles.branchesSectionTitle}>{getText('home.loadingBranches')}</Text>
                            ) : (
                                <>
                                    <Text style={styles.branchesSectionTitle}>
                                        {getText('home.ourBranches')}
                                    </Text>

                                    <View style={styles.sushiTrackContainer}>
                                        <Animated.View
                                            style={[
                                                styles.sushiTrack,
                                                {
                                                    transform: [{translateX: scrollX}]
                                                }
                                            ]}
                                        >
                                            {/* Zdvojujeme tiles pro nekonečnou smyčku */}
                                            {[...branches, ...branches].map((branch, index) => (
                                                <View key={`${branch.id}-${index}`} style={styles.sushiTile}>
                                                    <Image
                                                        source={{uri: 'https://drive.google.com/uc?export=view&id=1pWvHMe-7j3EdFYkTuql544DdG52Ti-MG'}}
                                                        style={styles.branchImage}
                                                        resizeMode="cover"
                                                    />
                                                    <View style={styles.branchOverlay}>
                                                        <Text style={styles.branchName}>{branch.name}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                        </Animated.View>
                                    </View>
                                </>
                            )}
                        </View>

                    </View>
                </ScrollView>
            </View>

            {/* MODAL PRO DOPLNĚNÍ PROFILU */}
            {renderProfileModal()}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    scrollView: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    videoContainer: {
        height: 350,
        width: SCREEN_WIDTH,
        marginBottom: 0,
    },
    video: {
        width: SCREEN_WIDTH,
        height: 350,
    },

    // NOVÉ STYLY PRO GRADIENT INFO SEKCI
    infoGradient: {
        width: SCREEN_WIDTH,
        paddingVertical: SPACING.LG,
        paddingHorizontal: SPACING.MD,
    },
    infoContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        lineHeight: 24,
        paddingBottom: 10
    },

    // NOVÉ STYLY PRO SUMMARY SEKCI - zkopírované z ProfilUzivatele
    summarySection: {
        backgroundColor: COLORS.SURFACE,
        flexDirection: 'row',
        marginHorizontal: SPACING.SM,
        marginTop: -20, // Klíčový efekt "vystupování" nahoru
        borderRadius: designSystem.RADIUS.MD,
        ...designSystem.SHADOWS.MD,
        paddingVertical: SPACING.MD,
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    summaryIcon: {
        width: 24,
        height: 24,
        marginBottom: SPACING.XS,
    },
    summaryNumber: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.XS,
    },
    summaryLabel: {
        ...TYPOGRAPHY.CAPTION,
        color: COLORS.TEXT_SECONDARY,
    },
    summaryDivider: {
        width: 1,
        height: '50%',
        backgroundColor: COLORS.BORDER_DEFAULT,
    },

    // NOVÉ STYLY PRO UŽIVATELSKÉ STATISTIKY
    userStatsSection: {
        backgroundColor: '#fefdfb',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    userStatsTitle: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        marginBottom: SPACING.MD,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: SPACING.MD,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: SPACING.SM,
    },
    statIcon: {
        width: 24,
        height: 24,
        marginBottom: SPACING.XS,
    },
    statNumber: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.XS,
    },
    statLabel: {
        ...TYPOGRAPHY.CAPTION,
        color: COLORS.TEXT_SECONDARY,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: COLORS.BORDER_DEFAULT,
    },

    // NOVÉ STYLY PRO LEVEL CONTAINER A "JAK TO FUNGUJE" TLAČÍTKO
    levelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        gap: 12, // Mezera mezi level badge a tlačítkem
    },
    levelBadge: {
        paddingHorizontal: SPACING.MD,
        paddingVertical: SPACING.SM,
        borderRadius: SPACING.XL,
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
        ...TYPOGRAPHY.CAPTION,
        color: COLORS.TEXT_ON_PRIMARY,
        fontWeight: 'bold',
    },
    howItWorksButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.BORDER_DEFAULT,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    howItWorksText: {
        ...TYPOGRAPHY.CAPTION,
        color: COLORS.TEXT_SECONDARY,
        marginLeft: 4,
        fontSize: 12,
    },

    // NOVÉ STYLY PRO HLAVNÍ AKČNÍ TLAČÍTKA
    actionsSection: {
        backgroundColor: '#fefdfb',
        margin: 16,
        marginTop: 8, // Menší margin top kvůli summary sekci
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    actionsSectionTitle: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.MD,
        textAlign: 'center',
    },
    primaryActionButton: {
        flexDirection: 'row',
        backgroundColor: 'rgba(185, 28, 28, 0.9)',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    primaryActionButtonText: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.TEXT_ON_PRIMARY,
        marginLeft: SPACING.SM,
    },
    secondaryActionButton: {
        flexDirection: 'row',
        backgroundColor: '#fefdfb',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(185, 28, 28, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    secondaryActionButtonText: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.PRIMARY,
        marginLeft: SPACING.SM,
    },

    // NOVÉ STYLY PRO RUNNING SUSHI POBOČKY
    branchesSection: {
        backgroundColor: '#fefdfb',
        margin: 16,
        marginTop: 8,
        padding: 16,
        paddingBottom: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    branchesSectionTitle: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.MD,
        textAlign: 'center',
    },
    sushiTrackContainer: {
        height: 90,
        overflow: 'hidden',
        backgroundColor: 'rgba(185, 28, 28, 0.05)', // Jemné pozadí jako "pás"
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(185, 28, 28, 0.1)',
    },
    sushiTrack: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        paddingVertical: 8,
    },
    sushiTile: {
        width: 120,
        height: 70,
        marginRight: 12,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: COLORS.SURFACE,
    },
    branchImage: {
        width: '100%',
        height: '100%',
    },
    branchOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    branchName: {
        ...TYPOGRAPHY.CAPTION,
        color: COLORS.TEXT_ON_PRIMARY,
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
    },

    // ZACHOVANÉ STYLY PRO PŮVODNÍ DLAŽDICE
    gradientContainer: {
        width: SCREEN_WIDTH,
    },
    tilesContainer: {
        paddingTop: 0,
        borderTopWidth: 0,
        marginTop: SPACING.MD,
    },
    tileRow: {
        flexDirection: 'row',
        height: 111,
        marginBottom: 0,
        paddingHorizontal: 0,
    },
    tile: {
        flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    tileContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tileTitle: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.TILE_TEXT,
        textAlign: 'center',
    },
});

// STYLY PRO MODAL
const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        padding: SPACING.LG,
    },
    modalContainer: {
        borderRadius: 16,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    modalTitle: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TILE_TEXT,
        textAlign: 'center',
        marginBottom: SPACING.MD,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 2,
    },
    modalSubtitle: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TILE_TEXT,
        textAlign: 'center',
        marginBottom: SPACING.XL,
        opacity: 0.9,
        lineHeight: 20,
    },
    inputLabel: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.TILE_TEXT,
        marginBottom: SPACING.XS,
        fontWeight: '600',
    },
    textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 16,
        padding: SPACING.MD,
        color: COLORS.TILE_TEXT,
        fontSize: 16,
        marginBottom: SPACING.SM,
    },
    emailHint: {
        ...TYPOGRAPHY.CAPTION,
        color: COLORS.TILE_TEXT,
        opacity: 0.7,
        marginBottom: SPACING.MD,
        fontStyle: 'italic',
    },
    primaryButton: {
        backgroundColor: '#f6bac4',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 8,
        padding: 16,
        marginTop: 24,
        shadowColor: 'rgba(255, 255, 255, 0.2)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 3,
    },
    disabledButton: {
        opacity: 0.6,
    },
    primaryButtonText: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.TILE_TEXT,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    secondaryButton: {
        padding: SPACING.MD,
        marginTop: SPACING.SM,
    },
    secondaryButtonText: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TILE_TEXT,
        textAlign: 'center',
        opacity: 0.8,
    },
});