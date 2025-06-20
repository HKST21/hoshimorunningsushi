import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Dimensions,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAnimatedScreenTransition } from "../services/useAnimatedScreenTransition";
import { useNavigation } from '@react-navigation/native';
import {getText} from "../services/LanguageUtils"; // ✅ Import lokalizace
import designSystem from '../constants/globalStyles';

// Import obrázku z assets
const howItWorksHeaderImage = require("../../../assets/jaktofunguje.png");

// Importujeme konstanty z designSystemu
const { TYPOGRAPHY, COLORS, SPACING, RADIUS, SHADOWS } = designSystem;

// Získání šířky obrazovky pro obrázek
const windowWidth = Dimensions.get('window').width;

export default function JakToFunguje() {
    // Použití useNavigation hooku místo přijímání navigation v props
    const navigation = useNavigation<any>();
    const animationStyles = useAnimatedScreenTransition();

    // Definice jednotlivých kroků s překlady
    const steps = [
        {
            id: 1,
            title: getText('howItWorks.steps.scanQR'),
            description: getText('howItWorks.steps.scanQRDesc'),
            icon: 'qr-code-outline'
        },
        {
            id: 2,
            title: getText('howItWorks.steps.getBenefits'),
            description: getText('howItWorks.steps.getBenefitsDesc'),
            icon: 'gift-outline'
        },
        {
            id: 3,
            title: getText('howItWorks.steps.useVouchers'),
            description: getText('howItWorks.steps.useVouchersDesc'),
            icon: 'ticket-outline'
        },
        {
            id: 4,
            title: getText('howItWorks.steps.visitRegularly'),
            description: getText('howItWorks.steps.visitRegularlyDesc'),
            icon: 'repeat-outline'
        },
        {
            id: 5,
            title: getText('howItWorks.steps.becomeVIP'),
            description: getText('howItWorks.steps.becomeVIPDesc'),
            icon: 'star-outline'
        }
    ];

    // Navigační funkce pro tlačítka
    const navigateToTokens = () => {
        navigation.navigate('ZiskejNavstevy');
    };

    const navigateToKupony = () => {
        navigation.navigate('Kupony');
    };

    return (
        <Animated.View style={[{ flex: 1 }, animationStyles]}>
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                >
                    {/* Obrázek hlavičky */}
                    <Image
                        source={howItWorksHeaderImage}
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
                                {getText('howItWorks.headerText')}
                            </Text>
                        </View>
                    </LinearGradient>

                    {/* Seznam kroků */}
                    <View style={styles.stepsContainer}>
                        {steps.map((step, index) => (
                            <View key={step.id} style={styles.stepItem}>
                                <View style={styles.stepNumberContainer}>
                                    <Text style={styles.stepNumber}>{step.id}</Text>
                                </View>

                                <View style={styles.stepContent}>
                                    <View style={styles.stepIconContainer}>
                                        <Ionicons name={step.icon as any} size={32} color={COLORS.PRIMARY} />
                                    </View>
                                    <View style={styles.stepTextContainer}>
                                        <Text style={styles.stepTitle}>{step.title}</Text>
                                        <Text style={styles.stepDescription}>{step.description}</Text>
                                    </View>
                                </View>

                                {/* Spojovací čára, kromě posledního kroku */}
                                {index < steps.length - 1 && (
                                    <View style={styles.stepConnector} />
                                )}
                            </View>
                        ))}
                    </View>

                    {/* Sekce s tlačítky */}
                    <View style={styles.buttonsSection}>
                        <Text style={styles.buttonsSectionTitle}>
                            {getText('howItWorks.startToday')}
                        </Text>

                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={navigateToTokens}
                            activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                        >
                            <Ionicons name={'scan-outline' as any} size={20} color={COLORS.TEXT_ON_PRIMARY} />
                            <Text style={styles.primaryButtonText}>{getText('howItWorks.confirmVisit')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={navigateToKupony}
                            activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                        >
                            <Ionicons name={'ticket-outline' as any} size={20} color={COLORS.PRIMARY} />
                            <Text style={styles.secondaryButtonText}>{getText('howItWorks.browseVouchers')}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sekce s dodatečnými informacemi */}
                    <View style={styles.infoSection}>
                        <Text style={styles.infoTitle}>
                            {getText('howItWorks.additionalInfo')}
                        </Text>

                        <Text style={styles.infoText}>
                            {getText('howItWorks.infoText1')}
                        </Text>

                        <Text style={styles.infoText}>
                            {getText('howItWorks.infoText2')}
                        </Text>
                    </View>
                </ScrollView>
            </View>
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
    // Hlavička
    headerGradient: {
        padding: SPACING.LG,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerTitle: {
        ...TYPOGRAPHY.H1,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.SM,
        textAlign: 'center',
    },
    headerSubtitle: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
    },
    // Kroky
    stepsContainer: {
        padding: SPACING.MD,
        backgroundColor: COLORS.SURFACE,
        margin: SPACING.MD,
        borderRadius: RADIUS.LG,
        ...SHADOWS.MD,
    },
    stepItem: {
        marginBottom: SPACING.LG,
        position: 'relative',
    },
    stepNumberContainer: {
        position: 'absolute',
        left: 15,
        top: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    stepNumber: {
        ...TYPOGRAPHY.BODY_STRONG,
        color: COLORS.TEXT_ON_PRIMARY,
    },
    stepContent: {
        flexDirection: 'row',
        marginLeft: 30,
        backgroundColor: COLORS.BACKGROUND,
        borderRadius: RADIUS.LG,
        overflow: 'hidden',
        ...SHADOWS.SM,
    },
    stepIconContainer: {
        padding: SPACING.MD,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
    },
    stepTextContainer: {
        flex: 1,
        padding: SPACING.MD,
        paddingLeft: 0,
    },
    stepTitle: {
        ...TYPOGRAPHY.BODY_STRONG,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.XS,
    },
    stepDescription: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_SECONDARY,
    },
    stepConnector: {
        position: 'absolute',
        left: 30,
        top: 30,
        bottom: -15,
        width: 2,
        backgroundColor: COLORS.BORDER_DEFAULT,
        zIndex: 1,
    },
    // Sekce s tlačítky
    buttonsSection: {
        padding: SPACING.MD,
        backgroundColor: COLORS.SURFACE,
        margin: SPACING.MD,
        borderRadius: RADIUS.LG,
        alignItems: 'center',
        ...SHADOWS.MD,
    },
    buttonsSectionTitle: {
        ...TYPOGRAPHY.H3,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.MD,
        textAlign: 'center',
    },
    primaryButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.PRIMARY,
        paddingVertical: SPACING.MD,
        paddingHorizontal: SPACING.LG,
        borderRadius: RADIUS.MD,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.MD,
        width: '100%',
        ...SHADOWS.SM,
    },
    primaryButtonText: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.TEXT_ON_PRIMARY,
        marginLeft: SPACING.SM,
    },
    secondaryButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.BACKGROUND,
        paddingVertical: SPACING.MD,
        paddingHorizontal: SPACING.LG,
        borderRadius: RADIUS.MD,
        borderWidth: 1,
        borderColor: COLORS.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    secondaryButtonText: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.PRIMARY,
        marginLeft: SPACING.SM,
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
});