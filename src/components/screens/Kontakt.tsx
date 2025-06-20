
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Animated,
    Image,
    Dimensions,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { useFadeBetweenTabs } from "../services/useFadeBetweenTabs";
import {getText} from "../services/LanguageUtils"; // ✅ Import lokalizace
import designSystem from '../constants/globalStyles';

// Získání šířky obrazovky pro správné rozměry
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Kontakt() {
    // Použití animace přechodu mezi taby
    const { opacity } = useFadeBetweenTabs();

    // Funkce pro otevření odkazů
    const openWebsite = () => {
        Linking.openURL('https://hoshimorunningsushi.store/');
    };

    const openPhone = () => {
        Linking.openURL('tel:+447426790767');
    };

    const openEmail = () => {
        Linking.openURL('mailto:hoshimorunningsushi.store@hotmail.com');
    };

    const openMap = () => {
        // Otevření Google Maps s adresou
        const address = 'Eastgate Street, Gloucester GL1 1PA';
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
    };

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <View style={styles.safeArea}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                >
                    {/* Obrázek hlavičky menu */}
                    <Image
                        source={require('../../../assets/contactpic.png')}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />

                    <View style={styles.mainContainer}>
                        <Text style={styles.heading}>{getText('contact.contactInfo')}</Text>

                        <View style={styles.contactCard}>
                            <Text style={styles.restaurantName}>HOSHIMO RUNNING SUSHI</Text>
                            <Text style={styles.address}>Eastgate Street, Gloucester GL1 1PA</Text>

                            <TouchableOpacity onPress={openPhone} style={styles.contactRow}>
                                <Text style={styles.contactText}>☎️ +447426790767</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={openEmail} style={styles.contactRow}>
                                <Text style={styles.contactText}>hoshimorunningsushi.store</Text>
                            </TouchableOpacity>

                            <Text style={styles.managerText}>{getText('contact.manager')}</Text>

                            <TouchableOpacity onPress={openWebsite} style={styles.websiteButton}>
                                <Text style={styles.websiteButtonText}>{getText('contact.visitWebsite')}</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.mapHeading}>{getText('contact.whereToFind')}</Text>

                        {/* Mapa s obrázkem na pozadí */}
                        <TouchableOpacity onPress={openMap} style={styles.mapContainer}>
                            <View style={styles.staticMap}>
                                <Image
                                    source={require('../../../assets/gloucester.png')}
                                    style={styles.mapBackground}
                                    blurRadius={1.5}
                                    resizeMode="cover"
                                />
                                <View style={styles.mapContent}>
                                    <Text style={styles.mapPlaceholder}>📍 Eastgate treet, Gloucester GL1</Text>
                                    <Text style={styles.mapDesc}>{getText('contact.shoppingMall')}</Text>
                                </View>
                                <View style={styles.mapPin}></View>
                            </View>
                            <View style={styles.mapOverlay}>
                                <Text style={styles.mapOverlayText}>{getText('contact.openGoogleMaps')}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.openingHoursContainer}>
                            <Text style={styles.openingHoursHeading}>{getText('contact.openingHours')}</Text>
                            <View style={styles.hoursRow}>
                                <Text style={styles.dayText}>{getText('contact.mondayFriday')}</Text>
                                <Text style={styles.hoursText}>{getText('contact.hours1')}</Text>
                            </View>
                            <View style={styles.hoursRow}>
                                <Text style={styles.dayText}>{getText('contact.saturday')}</Text>
                                <Text style={styles.hoursText}>{getText('contact.hours2')}</Text>
                            </View>
                            <View style={styles.hoursRow}>
                                <Text style={styles.dayText}>{getText('contact.sunday')}</Text>
                                <Text style={styles.hoursText}>{getText('contact.hours3')}</Text>
                            </View>
                        </View>

                        <View style={styles.noteContainer}>
                            <Text style={styles.noteText}>{getText('contact.lookForward')}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: designSystem.COLORS.BACKGROUND,
    },
    scrollView: {
        flex: 1,
    },
    headerImage: {
        width: SCREEN_WIDTH,
        height: 350,
    },
    mainContainer: {
        flex: 1,
        padding: 16,
    },
    heading: {
        ...designSystem.TYPOGRAPHY.H2,
        marginBottom: 16,
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    contactCard: {
        backgroundColor: 'white',
        borderRadius: designSystem.RADIUS.MD,
        padding: 20,
        marginBottom: 24,
        ...designSystem.SHADOWS.MD,
    },
    restaurantName: {
        ...designSystem.TYPOGRAPHY.H3,
        marginBottom: 8,
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    address: {
        ...designSystem.TYPOGRAPHY.BODY,
        marginBottom: 12,
        color: designSystem.COLORS.TEXT_SECONDARY,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 5,
    },
    contactText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.PRIMARY,
    },
    managerText: {
        ...designSystem.TYPOGRAPHY.BODY,
        marginTop: 5,
        marginBottom: 16,
        color: designSystem.COLORS.TEXT_SECONDARY,
    },
    websiteButton: {
        backgroundColor: designSystem.COLORS.PRIMARY,
        borderRadius: designSystem.RADIUS.MD,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    websiteButtonText: {
        ...designSystem.TYPOGRAPHY.BUTTON,
        color: 'white',
    },
    mapHeading: {
        ...designSystem.TYPOGRAPHY.H3,
        marginBottom: 12,
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    mapContainer: {
        borderRadius: designSystem.RADIUS.MD,
        overflow: 'hidden',
        marginBottom: 24,
        position: 'relative',
        ...designSystem.SHADOWS.SM,
    },
    staticMap: {
        width: '100%',
        height: 200,
        borderRadius: designSystem.RADIUS.MD,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    mapBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    mapContent: {
        zIndex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: designSystem.RADIUS.MD,
        ...designSystem.SHADOWS.SM,
    },
    mapPlaceholder: {
        ...designSystem.TYPOGRAPHY.H3,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginBottom: 8,
        textShadowColor: 'rgba(255, 255, 255, 0.7)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    mapDesc: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_PRIMARY,
        textShadowColor: 'rgba(255, 255, 255, 0.7)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    mapPin: {
        position: 'absolute',
        width: 24,
        height: 24,
        backgroundColor: designSystem.COLORS.PRIMARY,
        borderRadius: 12,
        borderWidth: 4,
        borderColor: 'white',
        zIndex: 2,
        // Stín pro pin
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    mapOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
    },
    mapOverlayText: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: 'white',
        textAlign: 'center',
    },
    openingHoursContainer: {
        backgroundColor: 'white',
        borderRadius: designSystem.RADIUS.MD,
        padding: 16,
        marginBottom: 24,
        ...designSystem.SHADOWS.SM,
    },
    openingHoursHeading: {
        ...designSystem.TYPOGRAPHY.H3,
        marginBottom: 12,
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    hoursRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dayText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    hoursText: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: designSystem.COLORS.TEXT_HIGHLIGHT,
    },
    noteContainer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: designSystem.RADIUS.MD,
        marginBottom: 24,
    },
    noteText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_SECONDARY,
        marginBottom: 12,
        textAlign: 'center',
    },
    openingDate: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: designSystem.COLORS.SUCCESS,
        textAlign: 'center',
        marginTop: 10,
    },
});