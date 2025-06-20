import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Modal,
    Image,
    Dimensions,
    ActivityIndicator,
    Animated,
    Easing,
    Alert,
} from 'react-native';
import {useUser} from "../services/UserContext";
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {Voucher} from '../models/interfaces';
import {frontendClass} from "../services/FeClass";
import {useAnimatedScreenTransition} from "../services/useAnimatedScreenTransition";
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import designSystem from '../constants/globalStyles';
import {getText, getCurrentLanguage} from "../services/LanguageUtils"; // ✅ Import lokalizace

// Import obrázku z assets
const vipHeaderImage = require("../../../assets/navstevy.png");

// Importujeme konstanty z designSystemu
const { TYPOGRAPHY, COLORS, SPACING, RADIUS, SHADOWS } = designSystem;

// Rozšířený typ pro VIP nabídku s vypočítanou úrovní přístupu
interface VipOfferWithLevel extends Voucher {
    requiredLevel: 'SILVER' | 'GOLD';
}

// Získání šířky obrazovky pro obrázek
const windowWidth = Dimensions.get('window').width;

// Typy pro Tab Navigator (ne Stack!)
type RootTabParamList = {
    Home: undefined;
    Kupony: undefined;
    Novinky: undefined;
    Menu: undefined;
    ProfilUzivatele: undefined;
    ZiskejNavstevy: undefined;
    Rezervace: undefined;
    VipNabidky: undefined;
    JakToFunguje: undefined;
    Kontakt: undefined;
    Oslavy: undefined;
};

type VipNabidkyNavigationProp = BottomTabNavigationProp<RootTabParamList>;

export default function VipNabidky() {
    const {loggedUser} = useUser();
    const navigation = useNavigation<VipNabidkyNavigationProp>();
    const [isLoading, setIsLoading] = useState(true);
    const [vipOffers, setVipOffers] = useState<VipOfferWithLevel[]>([]);
    const [selectedOffer, setSelectedOffer] = useState<VipOfferWithLevel | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Použití animace screen transition
    const animationStyles = useAnimatedScreenTransition();

    // Kontrola přihlášení - POKAŽDÉ když se dostaneme na tento screen
    useFocusEffect(
        React.useCallback(() => {
            if (!loggedUser) {
                Alert.alert(
                    getText('vip.loginRequired'),
                    getText('vip.loginMessage'),
                    [
                        {
                            text: getText('vip.back'),
                            style: 'cancel',
                            onPress: () => navigation.navigate('Home') // Přímo na Home tab!
                        },
                        {
                            text: getText('vip.signIn'),
                            onPress: () => {
                                // Pro přístup k Stack navigátoru potřebujeme parent navigator
                                (navigation as any).getParent()?.navigate('Login', { returnTo: 'VipNabidky' });
                            }
                        }
                    ]
                );
            }
        }, [loggedUser, navigation])
    );

    // Zjištění úrovně uživatele na základě počtu návštěv
    const getUserLevel = () => {
        const visitCount = loggedUser?.visitCount || 0;

        if (visitCount >= 20) return "GOLD";
        if (visitCount >= 10) return "SILVER";
        return "BRONZE";
    };

    const userLevel = getUserLevel();

    // Funkce pro určení požadované úrovně podle jména/kódu voucheru
    const determineRequiredLevel = (voucher: Voucher): 'SILVER' | 'GOLD' => {
        if (
            voucher.name.toLowerCase().includes('sleva 10%') ||
            voucher.code === 'GOLD_DISCOUNT_10'
        ) {
            return 'GOLD';
        }
        return 'SILVER';
    };

    // Navigační funkce pro tlačítka
    const navigateToTokens = () => {
        navigation.navigate('Home'); // Navigujeme na Home, uživatel si pak klikne na ZiskejNavstevy
    };

    // Načtení VIP nabídek
    useEffect(() => {
        const loadVipOffers = async () => {
            setIsLoading(true);

            try {
                // Volání API pro získání VIP voucherů
                const loadedOffers = await frontendClass.getVipVouchers();

                if (loadedOffers && Array.isArray(loadedOffers)) {
                    // Rozšíříme každý voucher o požadovanou úroveň
                    const offersWithLevels: VipOfferWithLevel[] = loadedOffers.map(offer => ({
                        ...offer,
                        requiredLevel: determineRequiredLevel(offer)
                    }));

                    setVipOffers(offersWithLevels);
                } else {
                    console.error('Failed to load VIP offers');
                }
            } catch (error) {
                console.error('Error loading VIP offers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (loggedUser) {
            loadVipOffers();
        }
    }, [loggedUser]);

    // Pokud není uživatel přihlášen, vrátíme prázdný view (Alert se už zobrazil v useEffect)
    if (!loggedUser) {
        return <View style={{ flex: 1 }} />;
    }

    // Otevření detailu nabídky
    const openOfferDetail = (offer: VipOfferWithLevel) => {
        // Kontrola, zda má uživatel dostatečný level
        if (
            (offer.requiredLevel === 'GOLD' && userLevel !== 'GOLD') ||
            (userLevel === 'BRONZE')
        ) {
            return; // Uživatel nemá dostatečnou úroveň
        }

        setSelectedOffer(offer);
        setModalVisible(true);
    };

    // Zavření modálního okna
    const closeModal = () => {
        setModalVisible(false);
        setSelectedOffer(null);
    };

    // Formátování data podle jazyka
    const formatDate = (date?: Date) => {
        if (!date) return getText('vip.unlimitedValidity');

        const currentLang = getCurrentLanguage();
        const locale = currentLang === 'cs' ? 'cs-CZ' : 'en-GB';
        return new Date(date).toLocaleDateString(locale);
    };

    // Zobrazení pro Bronze uživatele
    if (userLevel === 'BRONZE') {
        return (
            <Animated.View style={[{ flex: 1 }, animationStyles]}>
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        {/* Obrázek hlavičky */}
                        <Image
                            source={vipHeaderImage}
                            style={styles.headerImage}
                            resizeMode="cover"
                        />

                        <View style={styles.lockedContainer}>
                            <Ionicons name="lock-closed" size={80} color={COLORS.TEXT_SECONDARY}/>

                            <Text style={styles.lockedDescription}>
                                {getText('vip.bronze.description')}
                            </Text>
                            <Text style={styles.lockedInfo}>
                                {getText('vip.bronze.info')}
                            </Text>

                            <View style={styles.levelProgressContainer}>
                                <Text style={styles.progressLabel}>
                                    {getText('vip.bronze.progress', { current: loggedUser?.visitCount || 0, total: 10 })}
                                </Text>
                                <View style={styles.progressBarContainer}>
                                    <View
                                        style={[
                                            styles.progressBar,
                                            {
                                                width: `${Math.min(((loggedUser?.visitCount || 0) / 10) * 100, 100)}%`
                                            }
                                        ]}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.getTokensButton}
                                onPress={navigateToTokens}
                                activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            >
                                <Text style={styles.getTokensButtonText}>{getText('vip.bronze.getMoreVisits')}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Animated.View>
        );
    }

    // Zobrazení pro načítání
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.PRIMARY}/>
                <Text style={styles.loadingText}>{getText('vip.loadingOffers')}</Text>
            </View>
        );
    }

    // Filtrování nabídek podle úrovně uživatele
    const filteredOffers = vipOffers.filter(offer => {
        if (offer.requiredLevel === 'GOLD' && userLevel !== 'GOLD') {
            return false;
        }
        return true;
    });

    // Získání GOLD nabídky pro zobrazení zamčené verze SILVER uživatelům
    const goldOnlyOffer = vipOffers.find(offer => offer.requiredLevel === 'GOLD');

    return (
        <Animated.View style={[{flex: 1}, animationStyles]}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {/* Obrázek hlavičky */}
                    <Image
                        source={vipHeaderImage}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />

                    {/* Hlavička s pozadím */}
                    <LinearGradient
                        colors={[COLORS.PRIMARY, COLORS.ACCENT]}
                        style={styles.headerGradient}
                    >
                        <View style={styles.headerContent}>
                            <Text style={styles.headerSubtitle}>
                                {userLevel === 'GOLD'
                                    ? getText('vip.gold.headerSubtitle')
                                    : getText('vip.silver.headerSubtitle')}
                            </Text>

                            {userLevel === 'GOLD' && (
                                <View style={styles.goldBadge}>
                                    <Ionicons name="star" size={16} color="#000"/>
                                    <Text style={styles.goldBadgeText}>{getText('vip.goldMember')}</Text>
                                </View>
                            )}
                        </View>
                    </LinearGradient>

                    {/* Intro sekce s poděkováním */}
                    <View style={styles.introSection}>
                        <Text style={styles.introTitle}>
                            {userLevel === 'GOLD'
                                ? getText('vip.gold.welcomeTitle')
                                : getText('vip.silver.welcomeTitle')}
                        </Text>

                        <Text style={styles.introText}>
                            {userLevel === 'GOLD'
                                ? getText('vip.gold.welcomeText')
                                : getText('vip.silver.welcomeText')}
                        </Text>

                        {userLevel === 'SILVER' && (
                            <Text style={styles.upgradeText}>
                                {getText('vip.silver.upgradeText')}
                            </Text>
                        )}
                    </View>

                    {/* Seznam nabídek */}
                    <View style={styles.offersContainer}>
                        <Text style={styles.sectionTitle}>{getText('vip.yourExclusiveOffers')}</Text>

                        {filteredOffers.length === 0 ? (
                            <Text style={styles.noOffersText}>{getText('vip.noOffers')}</Text>
                        ) : (
                            filteredOffers.map(offer => (
                                <TouchableOpacity
                                    key={offer.id}
                                    style={styles.offerTile}
                                    onPress={() => openOfferDetail(offer)}
                                    activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                                >
                                    <ImageBackground
                                        source={{uri: offer.imageUrl || 'https://via.placeholder.com/600x400'}}
                                        style={styles.backgroundImage}
                                        imageStyle={styles.backgroundImageStyle}
                                    >
                                        <View style={styles.darkOverlay}>
                                            {offer.requiredLevel === 'GOLD' && (
                                                <View style={styles.levelBadge}>
                                                    <Ionicons name="star" size={12} color="#000"/>
                                                    <Text style={styles.levelBadgeText}>{getText('vip.goldBadge')}</Text>
                                                </View>
                                            )}

                                            <Text style={styles.offerName}>{offer.name}</Text>
                                            <Text style={styles.offerDescription} numberOfLines={2}>
                                                {offer.description}
                                            </Text>

                                            {offer.expiryDate && (
                                                <Text style={styles.validUntil}>
                                                    {getText('vip.validUntil')}: {formatDate(offer.expiryDate)}
                                                </Text>
                                            )}
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            ))
                        )}

                        {/* Pro SILVER uživatele ukážeme zamčenou GOLD nabídku */}
                        {userLevel === 'SILVER' && goldOnlyOffer && (
                            <View style={styles.lockedOfferContainer}>
                                <ImageBackground
                                    source={{uri: goldOnlyOffer.imageUrl || 'https://via.placeholder.com/600x400'}}
                                    style={styles.backgroundImage}
                                    imageStyle={[styles.backgroundImageStyle, styles.lockedImage]}
                                >
                                    <View style={styles.lockedOverlay}>
                                        <Ionicons name="lock-closed" size={40} color={COLORS.TEXT_PRIMARY}/>
                                        <Text style={styles.lockedOfferTitle}>{goldOnlyOffer.name}</Text>
                                        <Text style={styles.lockedOfferDescription}>
                                            {getText('vip.goldMembersOnly')}
                                        </Text>

                                        <View style={styles.levelProgressContainer}>
                                            <Text style={styles.lockedProgressLabel}>
                                                {getText('vip.progressToGold', { current: loggedUser?.visitCount || 0, total: 20 })}
                                            </Text>
                                            <View style={styles.progressBarContainer}>
                                                <View
                                                    style={[
                                                        styles.progressBar,
                                                        {
                                                            width: `${Math.min(((loggedUser?.visitCount || 0) / 20) * 100, 100)}%`
                                                        }
                                                    ]}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}
                    </View>

                    {/* Informační sekce */}
                    <View style={styles.infoSection}>
                        <Text style={styles.infoTitle}>
                            {userLevel === 'GOLD'
                                ? getText('vip.gold.howToUse')
                                : getText('vip.silver.howToGetMore')}
                        </Text>

                        {userLevel === 'GOLD' && (
                            <Text style={styles.infoText}>
                                {getText('vip.gold.usageInstructions')}
                            </Text>
                        )}

                        {userLevel === 'SILVER' && (
                            <>
                                <Text style={styles.infoText}>
                                    {getText('vip.silver.usageInstructions')}
                                </Text>
                                <Text style={styles.upgradeInfoText}>
                                    {getText('vip.silver.upgradeInfo')}
                                </Text>

                                <View style={styles.progressContainer}>
                                    <Text style={styles.progressTitle}>{getText('vip.silver.progressTitle')}</Text>
                                    <View style={styles.progressBarContainer}>
                                        <View
                                            style={[
                                                styles.progressBar,
                                                {
                                                    width: `${Math.min(((loggedUser?.visitCount || 0) / 20) * 100, 100)}%`
                                                }
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.progressInfo}>
                                        {getText('vip.progressToGold', { current: loggedUser?.visitCount || 0, total: 20 })}
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>

                {/* Modal pro zobrazení QR kódu a detailu nabídky */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {selectedOffer && (
                                <>
                                    <Text style={styles.modalTitle}>{selectedOffer.name}</Text>

                                    <Image
                                        source={{uri: selectedOffer.imageUrl || 'https://via.placeholder.com/600x400'}}
                                        style={styles.modalImage}
                                    />

                                    <Text style={styles.modalDescription}>
                                        {selectedOffer.description}
                                    </Text>

                                    {selectedOffer.expiryDate && (
                                        <Text style={styles.modalValidity}>
                                            {getText('vip.validUntil')}: {formatDate(selectedOffer.expiryDate)}
                                        </Text>
                                    )}

                                    <View style={styles.qrCodeContainer}>
                                        <Text style={styles.qrCodeTitle}>{getText('vip.qrCodeTitle')}</Text>
                                        <Image
                                            source={{
                                                uri: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(selectedOffer.code)}&size=200x200`
                                            }}
                                            style={styles.qrCode}
                                        />
                                        <Text style={styles.qrCodeHelp}>
                                            {getText('vip.qrCodeHelp')}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={closeModal}
                                        activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                                    >
                                        <Text style={styles.closeButtonText}>{getText('vip.close')}</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    scrollView: {
        flex: 1,
    },
    // Styl pro hlavičkový obrázek
    headerImage: {
        width: windowWidth,
        height: 350,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: SPACING.MD,
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_SECONDARY,
    },
    // Hlavička
    headerGradient: {
        padding: SPACING.LG,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerSubtitle: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        marginBottom: SPACING.MD,
    },
    goldBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD700',
        paddingHorizontal: SPACING.MD,
        paddingVertical: SPACING.SM,
        borderRadius: RADIUS.FULL,
    },
    goldBadgeText: {
        ...TYPOGRAPHY.BUTTON,
        color: '#000',
        marginLeft: SPACING.XS,
    },
    // Intro sekce
    introSection: {
        backgroundColor: COLORS.SURFACE,
        margin: SPACING.MD,
        padding: SPACING.MD,
        borderRadius: RADIUS.LG,
        ...SHADOWS.MD,
    },
    introTitle: {
        ...TYPOGRAPHY.H2,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.SM,
        textAlign: 'center',
    },
    introText: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
        marginBottom: SPACING.MD,
    },
    upgradeText: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.PRIMARY,
        textAlign: 'center',
        fontWeight: '500',
    },
    // Sekce s nabídkami
    offersContainer: {
        padding: SPACING.MD,
    },
    sectionTitle: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.MD,
    },
    noOffersText: {
        textAlign: 'center',
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_SECONDARY,
        marginTop: SPACING.LG,
    },
    offerTile: {
        height: 180,
        marginBottom: SPACING.MD,
        borderRadius: RADIUS.LG,
        overflow: 'hidden',
        ...SHADOWS.MD,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end', // Zarovnání obsahu dolů
    },
    backgroundImageStyle: {
        borderRadius: RADIUS.LG,
    },
    darkOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        padding: SPACING.MD,
    },
    levelBadge: {
        position: 'absolute',
        top: SPACING.SM,
        right: SPACING.SM,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD700',
        paddingHorizontal: SPACING.SM,
        paddingVertical: SPACING.XS,
        borderRadius: RADIUS.MD,
    },
    levelBadgeText: {
        ...TYPOGRAPHY.CAPTION,
        fontWeight: '700',
        color: '#000',
        marginLeft: SPACING.XS,
    },
    offerName: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.SM,
    },
    offerDescription: {
        ...TYPOGRAPHY.BODY,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: SPACING.SM,
    },
    validUntil: {
        ...TYPOGRAPHY.CAPTION,
        color: '#FFD700',
    },
    // Zamčená nabídka
    lockedOfferContainer: {
        height: 180,
        marginBottom: SPACING.MD,
        borderRadius: RADIUS.LG,
        overflow: 'hidden',
        ...SHADOWS.MD,
    },
    lockedImage: {
        opacity: 0.7,
    },
    lockedOverlay: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.MD,
    },
    lockedOfferTitle: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        marginTop: SPACING.SM,
        marginBottom: SPACING.SM,
        textAlign: 'center',
    },
    lockedOfferDescription: {
        ...TYPOGRAPHY.BODY,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: SPACING.MD,
        textAlign: 'center',
    },
    lockedProgressLabel: {
        ...TYPOGRAPHY.CAPTION,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.SM,
        textAlign: 'center',
    },
    // Info sekce
    infoSection: {
        backgroundColor: COLORS.SURFACE,
        margin: SPACING.MD,
        padding: SPACING.MD,
        borderRadius: RADIUS.LG,
        ...SHADOWS.MD,
        marginBottom: SPACING.XL,
    },
    infoTitle: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.SM,
    },
    infoText: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_SECONDARY,
        marginBottom: SPACING.MD,
    },
    upgradeInfoText: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_SECONDARY,
        marginBottom: SPACING.LG,
    },
    progressContainer: {
        marginTop: SPACING.SM,
    },
    progressTitle: {
        ...TYPOGRAPHY.BODY_STRONG,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.SM,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: COLORS.BORDER_DEFAULT,
        borderRadius: RADIUS.SM,
        overflow: 'hidden',
        marginBottom: SPACING.SM,
    },
    progressBar: {
        height: '100%',
        backgroundColor: COLORS.PRIMARY,
    },
    progressInfo: {
        ...TYPOGRAPHY.SMALL,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'right',
    },
    // Modální okno
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        maxHeight: '85%',
        backgroundColor: COLORS.SURFACE,
        borderRadius: RADIUS.LG,
        padding: SPACING.MD,
        alignItems: 'center',
        ...SHADOWS.LG,
    },
    modalTitle: {
        ...TYPOGRAPHY.H2,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.MD,
        textAlign: 'center',
    },
    modalImage: {
        width: '100%',
        height: 150,
        borderRadius: RADIUS.MD,
        marginBottom: SPACING.MD,
    },
    modalDescription: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_SECONDARY,
        marginBottom: SPACING.MD,
        textAlign: 'center',
    },
    modalValidity: {
        ...TYPOGRAPHY.SMALL,
        color: COLORS.TEXT_MUTED,
        marginBottom: SPACING.MD,
    },
    qrCodeContainer: {
        alignItems: 'center',
        backgroundColor: COLORS.BACKGROUND,
        padding: SPACING.MD,
        borderRadius: RADIUS.MD,
        marginBottom: SPACING.LG,
        width: '100%',
    },
    qrCodeTitle: {
        ...TYPOGRAPHY.BODY_STRONG,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.SM,
    },
    qrCode: {
        width: 200,
        height: 200,
    },
    qrCodeHelp: {
        ...TYPOGRAPHY.SMALL,
        color: COLORS.TEXT_SECONDARY,
        marginTop: SPACING.SM,
    },
    closeButton: {
        backgroundColor: COLORS.PRIMARY,
        paddingVertical: SPACING.SM,
        paddingHorizontal: SPACING.LG,
        borderRadius: RADIUS.MD,
        ...SHADOWS.SM,
    },
    closeButtonText: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.TEXT_ON_PRIMARY,
    },
    // Zamknutý obsah pro Bronze uživatele
    lockedContainer: {
        padding: SPACING.XL,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.SURFACE,
        margin: SPACING.MD,
        borderRadius: RADIUS.LG,
        ...SHADOWS.MD,
        minHeight: 400,
    },
    lockedDescription: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
        marginBottom: SPACING.LG,
    },
    lockedInfo: {
        ...TYPOGRAPHY.SMALL,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
        marginBottom: SPACING.LG,
    },
    levelProgressContainer: {
        width: '100%',
        marginTop: SPACING.SM,
        marginBottom: SPACING.LG,
    },
    progressLabel: {
        ...TYPOGRAPHY.SMALL,
        color: COLORS.TEXT_SECONDARY,
        marginBottom: SPACING.SM,
    },
    getTokensButton: {
        backgroundColor: COLORS.PRIMARY,
        paddingVertical: SPACING.SM,
        paddingHorizontal: SPACING.MD,
        borderRadius: RADIUS.MD,
        marginTop: SPACING.SM,
        ...SHADOWS.SM,
    },
    getTokensButtonText: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.TEXT_ON_PRIMARY,
    },
});