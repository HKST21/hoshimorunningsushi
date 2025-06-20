import React, {useState, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
    Pressable,
    Alert,
    Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingSkeleton from '../services/LoadingSkeleton';
import {useUser} from '../services/UserContext';
import {frontendClass} from '../services/FeClass';
import {UserVoucher} from '../models/interfaces';
import {useFadeBetweenTabs} from "../services/useFadeBetweenTabs";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {getText} from "../services/LanguageUtils"; // ✅ Import lokalizace
import designSystem from '../constants/globalStyles';

// Import obrázku z assets
const voucherHeaderImage = require("../../../assets/kupony.jpg");

// Získání šířky okna pro responzivní design
const windowWidth = Dimensions.get('window').width;

// Placeholder obrázek pro vouchery bez obrázku
const placeholderImage = 'https://via.placeholder.com/100x100?text=Voucher';

// Typy pro Tab Navigator
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

type KuponyNavigationProp = BottomTabNavigationProp<RootTabParamList>;

export default function Kupony() {
    const {loggedUser, setLoggedUser} = useUser();
    const navigation = useNavigation<KuponyNavigationProp>();

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    // Reálné načítání - skeleton dokud nejsou vouchers
    React.useEffect(() => {
        if (loggedUser?.vouchers) {
            setIsLoading(false);
        } else if (loggedUser) {
            setIsLoading(true);
        }
    }, [loggedUser]);

    // Kontrola přihlášení - POKAŽDÉ když se dostaneme na tento screen
    useFocusEffect(
        React.useCallback(() => {
            if (!loggedUser) {
                setIsLoading(false);
                Alert.alert(
                    getText('coupons.loginRequired'),
                    getText('coupons.loginMessage'),
                    [
                        {
                            text: getText('coupons.back'),
                            style: 'cancel',
                            onPress: () => navigation.navigate('Home')
                        },
                        {
                            text: getText('coupons.signIn'),
                            onPress: () => {
                                (navigation as any).getParent()?.navigate('Login', { returnTo: 'Kupony' });
                            }
                        }
                    ]
                );
            }
        }, [loggedUser, navigation])
    );

    // Stav pro sledování animací, modalu a vybraného voucheru
    const [selectedVoucher, setSelectedVoucher] = useState<UserVoucher | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [animatingVoucherId, setAnimatingVoucherId] = useState<string | null>(null);
    const animationValue = useRef(new Animated.Value(1)).current;

    const {opacity} = useFadeBetweenTabs();

    // Pokud není uživatel přihlášen, vrátíme prázdný view
    if (!loggedUser) {
        return <View style={{ flex: 1 }} />;
    };

    // Funkce pro animaci "prasknutí" voucheru
    const animateVoucher = (voucherId: string) => {
        setAnimatingVoucherId(voucherId);

        Animated.sequence([
            Animated.timing(animationValue, {
                toValue: 0.8,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
                toValue: 1.1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
                toValue: 0.9,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setAnimatingVoucherId(null);
            Vibration.vibrate(100);

            if (loggedUser && loggedUser.vouchers) {
                const foundVoucher = loggedUser.vouchers.find(v => v.id === voucherId);

                if (foundVoucher) {
                    setSelectedVoucher(foundVoucher);
                    setModalVisible(true);
                    useVoucher(voucherId);
                }
            }
        });
    };

    // Funkce pro použití voucheru
    const useVoucher = async (voucherId: string): Promise<void> => {
        if (!loggedUser) return;

        try {
            const updatedUser = await frontendClass.useVoucher(loggedUser.id, voucherId);

            if (updatedUser) {
                const freshUser = JSON.parse(JSON.stringify(updatedUser));
                await setLoggedUser(freshUser);
            }
        } catch (error) {
            console.error('❌ Chyba při použití voucheru:', error);
        }
    };

    // Funkce pro zavření modálního okna
    const closeModal = () => {
        setModalVisible(false);
        setSelectedVoucher(null);
    };

    // Funkce pro získání správného řadového číslovky
    const getOrdinalText = (number: number): string => {
        if (number === 1) return getText('coupons.ordinals.first');
        if (number === 2) return getText('coupons.ordinals.second');
        if (number === 3) return getText('coupons.ordinals.third');
        return getText('coupons.ordinals.other');
    };

    // Funkce pro získání správného množného čísla "návštěv"
    const getVisitsText = (count: number): string => {
        if (count === 1) return getText('coupons.oneVisitRemaining');
        if (count >= 2 && count <= 4) return getText('coupons.twoVisitsRemaining');
        return getText('coupons.visitsRemaining');
    };

// Vykreslení komponenty
    return (
        <LoadingSkeleton isLoading={isLoading} layout="kupony">
            <Animated.View style={[{ flex: 1, opacity }]}>
                <ScrollView style={styles.container}
                            contentContainerStyle={{ paddingBottom: 55 }}
                            showsVerticalScrollIndicator={false}
                            bounces={true}>
                    {/* Obrázek voucheru pod headerem */}
                    <Image
                        source={voucherHeaderImage}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />

                    {/* Gradient informační sekce */}
                    <LinearGradient
                        colors={[designSystem.COLORS.PRIMARY, designSystem.COLORS.ACCENT]}
                        style={styles.infoGradient}
                    >
                        <View style={styles.infoContent}>
                            <Text style={styles.infoText}>
                                {getText('coupons.collectVisits')}
                            </Text>
                        </View>
                    </LinearGradient>

                    {/* Zobrazení počtu návštěv uživatele */}
                    <View style={styles.tokenContainer}>
                        <Ionicons name="location" size={20} color={designSystem.COLORS.PRIMARY} />
                        <Text style={styles.tokenText}>
                            {getText('coupons.visitCount')} {loggedUser?.visitCount || 0}
                        </Text>
                    </View>

                    <View style={styles.mainContainer}>
                        {/* Nadpis sekce */}
                        <Text style={styles.categoryTitle}>{getText('coupons.couponsTitle')}</Text>

                        {/* Filtrujeme pouze kupony s vip = false */}
                        {(!loggedUser?.vouchers || loggedUser?.vouchers.filter(v => v.voucher.vip === false).length === 0) ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>{getText('coupons.noCoupons')}</Text>
                            </View>
                        ) : (
                            /* Seznam voucherů */
                            <View style={styles.itemsContainer}>
                                {loggedUser?.vouchers
                                    .filter(item => item.voucher.vip === false)
                                    .sort((a, b) => (a.voucher.requiredVisits || 0) - (b.voucher.requiredVisits || 0))
                                    .map((item) => {
                                        const userVisits = loggedUser?.visitCount || 0;
                                        const usageCount = item.usageCount || 0;
                                        const maxUsage = item.voucher.amount;
                                        const requiredVisits = item.voucher.requiredVisits || 0;

                                        const isDisabled =
                                            userVisits < requiredVisits ||
                                            (maxUsage !== null && maxUsage !== undefined && usageCount >= maxUsage);

                                        const isAnimating = animatingVoucherId === item.id;

                                        // Získáme stav voucheru jako text
                                        let statusText = "";
                                        if (userVisits < requiredVisits) {
                                            const remainingVisits = requiredVisits - userVisits;
                                            statusText = `${remainingVisits} ${getVisitsText(remainingVisits)}`;
                                        } else if (maxUsage !== null && maxUsage !== undefined && usageCount >= maxUsage) {
                                            statusText = getText('coupons.usedUp');
                                        } else if (maxUsage !== null && maxUsage !== undefined) {
                                            statusText = `${maxUsage - usageCount} ${getText('coupons.remaining')}`;
                                        } else {
                                            statusText = getText('coupons.unlimitedUses');
                                        }

                                        return (
                                            <Animated.View
                                                key={item.id}
                                                style={[
                                                    styles.menuItem,
                                                    isAnimating && {transform: [{scale: animationValue}]},
                                                    isDisabled && {opacity: 0.6}
                                                ]}
                                            >
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={() => !isDisabled && animateVoucher(item.id)}
                                                    disabled={isDisabled}
                                                    style={styles.itemContent}
                                                >
                                                    <View style={styles.itemInfo}>
                                                        {/* Název voucheru */}
                                                        <Text style={styles.itemName}>{item.voucher.name}</Text>

                                                        {/* Popis voucheru */}
                                                        <Text style={styles.itemPerex}>{item.voucher.description}</Text>

                                                        <View style={styles.priceWeightContainer}>
                                                            {/* Informace o dostupnosti voucheru */}
                                                            <Text style={styles.itemPrice}>
                                                                {requiredVisits > 0 ?
                                                                    `${getText('coupons.availableFrom')} ${requiredVisits}${getOrdinalText(requiredVisits)} ${getText('coupons.visit')}` :
                                                                    getText('coupons.availableImmediately')
                                                                }
                                                            </Text>
                                                        </View>

                                                        {/* Stav voucheru */}
                                                        <Text style={
                                                            userVisits < requiredVisits ? styles.statusNotEnough :
                                                                (maxUsage !== null && maxUsage !== undefined && usageCount >= maxUsage) ?
                                                                    styles.statusUsed : styles.statusAvailable
                                                        }>
                                                            {statusText}
                                                        </Text>
                                                    </View>

                                                    {/* Obrázek voucheru */}
                                                    <Image
                                                        source={item.voucher.imageUrl ? { uri: item.voucher.imageUrl } : { uri: placeholderImage }}
                                                        style={styles.itemImage}
                                                        resizeMode="cover"
                                                        onError={(error) => console.error(`Chyba načítání obrázku pro ${item.voucher.name}:`, error.nativeEvent.error)}
                                                    />
                                                </TouchableOpacity>
                                            </Animated.View>
                                        );
                                    })}
                            </View>
                        )}
                    </View>

                    {/* Přidáno prázdné místo na konci pro lepší scrollování */}
                    <View style={{ height: 20 }} />
                </ScrollView>

                {/* Modal pro zobrazení QR kódu */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                                {selectedVoucher?.voucher.name}
                            </Text>

                            {selectedVoucher && (
                                <View style={styles.qrCodeContainer}>
                                    <Image
                                        source={{
                                            uri: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(selectedVoucher.voucher.code)}&size=200x200`
                                        }}
                                        style={styles.qrCodeImage}
                                    />
                                </View>
                            )}

                            <Text style={styles.modalDescription}>
                                {getText('coupons.showQrCode')}
                            </Text>

                            <Pressable
                                style={styles.closeButton}
                                onPress={closeModal}
                            >
                                <Text style={styles.closeButtonText}>{getText('coupons.close')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </Animated.View>
        </LoadingSkeleton>
    );
}

// Styly - přesně podle Menu komponenty pro kartičky
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerImage: {
        width: windowWidth,
        height: 340,
    },
    mainContainer: {
        padding: 10,
    },
    categoryTitle: {
        ...designSystem.TYPOGRAPHY.H2,
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    emptyContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: '#666',
        textAlign: 'center',
    },
    tokenContainer: {
        margin: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tokenText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    // PŘESNĚ STEJNÉ STYLY JAKO V MENU
    itemsContainer: {
        gap: 15,
    },
    menuItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemContent: {
        flexDirection: 'row',
        padding: 10,
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemName: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        marginBottom: 5,
    },
    itemPerex: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: '#666',
        marginBottom: 8,
    },
    priceWeightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemPrice: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: designSystem.COLORS.TEXT_HIGHLIGHT,
    },
    itemWeight: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: '#999',
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: 10,
        alignSelf: 'center'
    },
    // Status texty
    statusUsed: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: '#999',
        marginTop: 8
    },
    statusNotEnough: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: '#e53935',
        marginTop: 8
    },
    statusAvailable: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: '#4CAF50',
        marginTop: 8
    },
    // Původní styly pro modální okno - BEZE ZMĚN
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        maxWidth: 350,
        backgroundColor: designSystem.COLORS.SURFACE,
        borderRadius: designSystem.RADIUS.LG,
        padding: designSystem.SPACING.XL,
        alignItems: 'center',
        ...designSystem.SHADOWS.LG,
    },
    modalTitle: {
        ...designSystem.TYPOGRAPHY.H2,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginBottom: designSystem.SPACING.MD,
        textAlign: 'center',
    },
    modalDescription: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_SECONDARY,
        textAlign: 'center',
        marginTop: designSystem.SPACING.MD,
        marginBottom: designSystem.SPACING.LG,
    },
    qrCodeContainer: {
        padding: designSystem.SPACING.SM,
        backgroundColor: '#FFFFFF',
        borderRadius: designSystem.RADIUS.MD,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: designSystem.COLORS.BORDER_DEFAULT,
        ...designSystem.SHADOWS.SM,
    },
    qrCodeImage: {
        width: 200,
        height: 200,
    },
    closeButton: {
        backgroundColor: designSystem.COLORS.PRIMARY,
        paddingHorizontal: designSystem.SPACING.XL,
        paddingVertical: designSystem.SPACING.MD,
        borderRadius: designSystem.RADIUS.MD,
        ...designSystem.SHADOWS.SM,
    },
    closeButtonText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.BUTTON,
    },
    // Styly pro gradient informační sekci
    infoGradient: {
        width: windowWidth,
        paddingVertical: designSystem.SPACING.LG,
        paddingHorizontal: designSystem.SPACING.MD,
    },
    infoContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        lineHeight: 24,
    },
});