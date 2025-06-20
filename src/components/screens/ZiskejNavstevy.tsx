import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Alert,
    Linking,
    ActivityIndicator,
    Vibration,
    Animated,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';
import {CameraView, useCameraPermissions} from 'expo-camera';
import * as Location from 'expo-location';
import {useUser} from "../services/UserContext";
import {frontendClass} from "../services/FeClass";
import {Audio} from "expo-av";
import designSystem from "../constants/globalStyles";
import { useAnimatedScreenTransition } from "../services/useAnimatedScreenTransition";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {getText} from "../services/LanguageUtils"; // ✅ Import lokalizace

// Import obrázku z assets
const headerImage = require("../../../assets/navstevy.png");

// Získání šířky obrazovky pro obrázek
const windowWidth = Dimensions.get('window').width;

type BarCodeScanningResult = {
    type: string;
    data: string;
};

// Typy pro Tab Navigator (ne Stack!)
type RootTabParamList = {
    Home: undefined;
    Kupony: undefined;
    Novinky: undefined;
    Menu: undefined;
    ProfilUzivatele: undefined;
    ZiskejTokeny: undefined;
    Rezervace: undefined;
    VipNabidky: undefined;
    JakToFunguje: undefined;
    Kontakt: undefined;
    Oslavy: undefined;
};

type ZiskejTokenyNavigationProp = BottomTabNavigationProp<RootTabParamList>;

export default function ZiskejNavstevy() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const {loggedUser, setLoggedUser} = useUser();
    const navigation = useNavigation<ZiskejTokenyNavigationProp>();

    const animationStyles = useAnimatedScreenTransition();

    const userId = loggedUser?.id;

    // Kontrola přihlášení - POKAŽDÉ když se dostaneme na tento screen
    useFocusEffect(
        React.useCallback(() => {
            if (!loggedUser) {
                Alert.alert(
                    getText('visits.loginRequired'),
                    getText('visits.loginMessage'),
                    [
                        {
                            text: getText('visits.back'),
                            style: 'cancel',
                            onPress: () => navigation.navigate('Home') // Přímo na Home tab!
                        },
                        {
                            text: getText('visits.signIn'),
                            onPress: () => {
                                // Pro přístup k Stack navigátoru potřebujeme parent navigator
                                (navigation as any).getParent()?.navigate('Login', { returnTo: 'ZiskejNavstevy' });
                            }
                        }
                    ]
                );
            }
        }, [loggedUser, navigation])
    );

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    const playTokenWin = async () => {
        try {
            const {sound} = await Audio.Sound.createAsync(
                require('../../../assets/tokenwin.wav')
            );

            await sound.playAsync();

            setTimeout(async () => {
                await sound.unloadAsync();
            }, 2000);

        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    const openScanner = async () => {
        if (!userId) {
            Alert.alert(getText('visits.notice'), getText('visits.mustSignInFirst'));
            return;
        }

        if (permission?.granted === null) {
            Alert.alert(getText('visits.waitingForPermission'), getText('visits.pleaseWait'));
            return;
        }

        if (permission?.granted === false) {
            Alert.alert(
                getText('visits.cameraAccessDenied'),
                getText('visits.cameraAccessRequired'),
                [
                    {
                        text: getText('visits.openSettings'),
                        onPress: () => Linking.openSettings(),
                    },
                    {
                        text: getText('visits.cancel'),
                        style: 'cancel',
                    },
                ]
            );
            return;
        }

        setCameraVisible(true);
        setScanned(false);
    };

    const handleBarCodeScanned = async ({type, data}: BarCodeScanningResult) => {
        if (scanned || !userId) return;
        setScanned(true);
        setLoading(true);

        try {
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    getText('visits.locationAccessDenied'),
                    getText('visits.locationAccessRequired')
                );
                setCameraVisible(false);
                setLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

            const result = await frontendClass.validateQRCodeAndGetTokens(
                userId,
                data,
                location.coords.latitude,
                location.coords.longitude
            );

            if ('error' in result) {
                Alert.alert(getText('visits.error'), result.error);
                setCameraVisible(false);
            } else {
                await setLoggedUser(result);
                setCameraVisible(false);
                Vibration.vibrate();
                playTokenWin();
                setSuccessVisible(true);
            }
        } catch (error) {
            console.error('Error scanning:', error);
            Alert.alert(getText('visits.error'), getText('visits.qrCodeError'));
            setCameraVisible(false);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const closeSuccess = () => {
        setSuccessVisible(false);
    };

    // Pokud není uživatel přihlášen, vrátíme prázdný view (Alert se už zobrazil v useEffect)
    if (!loggedUser) {
        return <View style={{ flex: 1 }} />;
    }

    const steps = [
        getText('visits.steps.step1'),
        getText('visits.steps.step2'),
        getText('visits.steps.step3'),
        getText('visits.steps.step4')
    ];

    return (
        <Animated.View style={[{ flex: 1 }, animationStyles]}>
            <ScrollView style={styles.container}
                        contentContainerStyle={{ paddingBottom: 40 }}
                        showsVerticalScrollIndicator={false}
                        bounces={true}>
                {/* Obrázek hlavičky */}
                <Image
                    source={headerImage}
                    style={styles.headerImage}
                    resizeMode="cover"
                />

                <View style={styles.contentContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>{getText('visits.howToCollect')}</Text>
                        <Text style={styles.infoText}>
                            {getText('visits.howToCollectDescription')}
                        </Text>

                        {steps.map((stepText, index) => (
                            <View key={index + 1} style={styles.stepContainer}>
                                <View style={styles.stepBadge}><Text style={styles.stepNumber}>{index + 1}</Text></View>
                                <Text style={styles.stepText}>
                                    {stepText}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.scanButton}
                        onPress={openScanner}
                        activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                    >
                        <Text style={styles.scanButtonText}>{getText('visits.scanQRCode')}</Text>
                    </TouchableOpacity>

                    <Text style={styles.disclaimer}>
                        {getText('visits.disclaimer')}
                    </Text>
                </View>
            </ScrollView>

            {/* Camera Modal */}
            <Modal
                visible={cameraVisible}
                animationType="slide"
                onRequestClose={() => setCameraVisible(false)}
            >
                <View style={styles.cameraContainer}>
                    {loading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color={designSystem.COLORS.TEXT_ON_PRIMARY} />
                            <Text style={styles.loadingText}>{getText('visits.verifyingLocation')}</Text>
                        </View>
                    )}

                    {cameraVisible && permission?.granted && !loading && (
                        <CameraView
                            style={StyleSheet.absoluteFillObject}
                            facing="back"
                            enableTorch={false}
                            barcodeScannerSettings={{
                                barcodeTypes: ['qr'],
                            }}
                            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                        >
                            <View style={styles.overlay}>
                                <View style={styles.scanFrame}/>
                                <Text style={styles.scanText}>
                                    {getText('visits.pointCamera')}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setCameraVisible(false)}
                                activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            >
                                <Text style={styles.closeButtonText}>{getText('visits.cancel')}</Text>
                            </TouchableOpacity>
                        </CameraView>
                    )}
                </View>
            </Modal>

            {/* Success Modal */}
            <Modal
                visible={successVisible}
                animationType="slide"
                transparent
                onRequestClose={closeSuccess}
            >
                <View style={styles.successModalContainer}>
                    <View style={styles.successModal}>
                        <Text style={styles.successEmoji}>✅</Text>
                        <Text style={styles.congratsTitle}>{getText('visits.success.congratulations')}</Text>
                        <Text style={styles.congratsText}>
                            {getText('visits.success.visitRecorded')}
                        </Text>
                        {loggedUser && (
                            <Text style={styles.congratsText}>
                                {getText('visits.success.currentVisits', { count: loggedUser.visitCount || 0 })}
                            </Text>
                        )}
                        <Text style={styles.congratsInfo}>
                            {getText('visits.success.moreVisitsInfo')}
                        </Text>

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={closeSuccess}
                            activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                        >
                            <Text style={styles.confirmButtonText}>{getText('visits.success.greatThanks')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: designSystem.COLORS.BACKGROUND,
    },
    headerImage: {
        width: windowWidth,
        height: 350,
    },
    contentContainer: {
        padding: designSystem.SPACING.MD,
    },
    infoContainer: {
        backgroundColor: designSystem.COLORS.SURFACE,
        borderRadius: designSystem.RADIUS.LG,
        padding: designSystem.SPACING.MD,
        marginBottom: designSystem.SPACING.XL,
        ...designSystem.SHADOWS.MD,
    },
    infoTitle: {
        ...designSystem.TYPOGRAPHY.H2,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginBottom: designSystem.SPACING.MD,
    },
    infoText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_SECONDARY,
        marginBottom: designSystem.SPACING.MD,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: designSystem.SPACING.SM,
    },
    stepBadge: {
        width: 30,
        height: 30,
        borderRadius: designSystem.RADIUS.FULL,
        backgroundColor: designSystem.COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: designSystem.SPACING.MD,
    },
    stepNumber: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        fontSize: 16,
    },
    stepText: {
        flex: 1,
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_SECONDARY,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: designSystem.COLORS.OVERLAY_DARK,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.BODY,
        marginTop: designSystem.SPACING.MD,
    },
    scanButton: {
        backgroundColor: designSystem.COLORS.PRIMARY,
        borderRadius: designSystem.RADIUS.MD,
        paddingVertical: designSystem.SPACING.MD,
        alignItems: 'center',
        marginBottom: designSystem.SPACING.MD,
        ...designSystem.SHADOWS.SM,
    },
    scanButtonText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.BUTTON,
    },
    disclaimer: {
        textAlign: 'center',
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: designSystem.COLORS.TEXT_MUTED,
        fontStyle: 'italic',
        marginBottom: designSystem.SPACING.MD,
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: designSystem.COLORS.TEXT_ON_PRIMARY,
        borderRadius: designSystem.RADIUS.MD,
        backgroundColor: 'transparent',
    },
    scanText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.BODY,
        marginTop: designSystem.SPACING.XL,
        backgroundColor: designSystem.COLORS.OVERLAY_DARKER,
        padding: designSystem.SPACING.SM,
        borderRadius: designSystem.RADIUS.SM,
    },
    closeButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: designSystem.SPACING.XL,
        paddingVertical: designSystem.SPACING.MD,
        borderRadius: designSystem.RADIUS.FULL,
    },
    closeButtonText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.BUTTON,
    },
    successModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: designSystem.COLORS.OVERLAY_DARK,
    },
    successModal: {
        backgroundColor: designSystem.COLORS.SURFACE,
        borderRadius: designSystem.RADIUS.LG,
        padding: designSystem.SPACING.XL,
        width: '85%',
        alignItems: 'center',
        ...designSystem.SHADOWS.LG,
    },
    successEmoji: {
        fontSize: 70,
        marginBottom: designSystem.SPACING.MD,
    },
    congratsTitle: {
        ...designSystem.TYPOGRAPHY.H2,
        color: designSystem.COLORS.PRIMARY,
        marginBottom: designSystem.SPACING.MD,
    },
    congratsText: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        textAlign: 'center',
        marginBottom: designSystem.SPACING.MD,
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    congratsInfo: {
        ...designSystem.TYPOGRAPHY.BODY,
        textAlign: 'center',
        color: designSystem.COLORS.TEXT_SECONDARY,
        marginBottom: designSystem.SPACING.XL,
        lineHeight: 24,
    },
    confirmButton: {
        backgroundColor: designSystem.COLORS.SUCCESS,
        paddingHorizontal: designSystem.SPACING.XL,
        paddingVertical: designSystem.SPACING.MD,
        borderRadius: designSystem.RADIUS.MD,
        ...designSystem.SHADOWS.SM,
    },
    confirmButtonText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.BUTTON,
    },
});