import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Animated,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native';
// Změna importu - použijeme nový hook pro animaci
import { useAnimatedScreenTransition } from "../services/useAnimatedScreenTransition";
// Přidáme import pro useUser hook
import { useUser } from "../services/UserContext";
import designSystem from '../constants/globalStyles';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {LinearGradient} from "expo-linear-gradient";

// Získání šířky obrazovky pro správné rozměry
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Typy oslav
const CELEBRATION_TYPES = [
    { id: 'birthday', label: 'Birthday celebration' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'bachelor', label: 'Bachelor/Bachelorette party' },
];

export default function Oslavy() {
    // Získání uživatele z kontextu
    const { loggedUser } = useUser();
    const { TYPOGRAPHY, COLORS, SPACING, RADIUS, SHADOWS } = designSystem;

    // Použití animace pouze při přechodu mezi obrazovkami
    const animatedStyle = useAnimatedScreenTransition();

    // State pro odesílání formuláře
    const [submitting, setSubmitting] = useState(false);

    // State pro formulář rezervace
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [guests, setGuests] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [note, setNote] = useState('');
    const [celebrationType, setCelebrationType] = useState('');

    // State pro picker
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Formátování data a času
    const formatDate = (date: Date): string => {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    const formatTime = (time: Date): string => {
        return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
    };

    // Handlery pro změnu data a času
    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date): void => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
    };

    // Handler pro odeslání formuláře
    const handleSubmit = () => {
        // Používáme email z přihlášeného uživatele, pokud existuje
        const userEmail = loggedUser?.email || email;

        // Validace formuláře
        if (!name || !phone || !guests || !celebrationType) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        // Validace emailu
        if (!userEmail) {
            Alert.alert('Error', 'Email is required');
            return;
        }

        // Nastavení stavu odesílání
        setSubmitting(true);

        const selectedCelebrationType = CELEBRATION_TYPES.find(type => type.id === celebrationType)?.label;

        // Vytvoření dat pro odeslání
        const formData = {
            name,
            email: userEmail, // Použijeme email z přihlášeného uživatele nebo z formuláře
            phone,
            guests,
            date: formatDate(date),
            time: formatTime(time),
            celebrationType: selectedCelebrationType,
            note: note || 'No note'
        };

        // Odeslání dat pomocí Formspree API
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnndwdky';

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                subject: `New celebration booking: ${name}`,
                message: `New celebration booking from ${name}`,
                ...formData
            })
        })
            .then(response => {
                setSubmitting(false);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error submitting form');
                }
            })
            .then(() => {
                // Úspěšné odeslání
                Alert.alert(
                    'Booking sent',
                    `Thank you for your celebration booking. We will contact you soon for confirmation.\n\nCelebration type: ${selectedCelebrationType}`,
                    [{ text: 'OK', onPress: resetForm }]
                );
            })
            .catch(error => {
                // Chyba při odesílání
                setSubmitting(false);
                console.error('Chyba při odesílání rezervace:', error);
                Alert.alert(
                    'Sending error',
                    'We apologise, but we were unable to send your booking. Please try again later or contact us directly by phone.',
                    [{ text: 'OK' }]
                );
            });
    };

    // Reset formuláře
    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setGuests('');
        setNote('');
        setDate(new Date());
        setTime(new Date());
        setCelebrationType('');
    };

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <View style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView style={styles.scrollView}
                                contentContainerStyle={{ paddingBottom: 40 }}
                                showsVerticalScrollIndicator={false}
                                bounces={true}>
                        {/* Úvodní obrázek */}
                        <Image
                            source={require('../../../assets/sushiparty.png')}
                            style={styles.headerImage}
                            resizeMode="cover"
                        />
                        <LinearGradient
                            colors={[COLORS.PRIMARY, COLORS.ACCENT]}
                            style={styles.headerGradient}
                        >
                            <View style={styles.headerContent}>

                                <Text style={styles.headerSubtitle}>
                                    ✨ Transform your special moments into unforgettable memories! Celebrate birthdays, anniversaries, or bachelor/bachelorette parties with us and receive 2 bottles of premium Saké as a gift from us 🥂✨
                                </Text>
                            </View>
                        </LinearGradient>

                        <View style={styles.mainContainer}>

                            {/* Formulář pro rezervaci */}
                            <View style={styles.formContainer}>


                                {/* Jméno */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Full name *</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Enter your name"
                                    />
                                </View>

                                {/* Email - zobrazíme pouze pokud uživatel není přihlášen */}
                                {!loggedUser && (
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Email *</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={email}
                                            onChangeText={setEmail}
                                            placeholder="Enter your email"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                )}

                                {/* Telefon */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Phone *</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={phone}
                                        onChangeText={setPhone}
                                        placeholder="Enter your phone number"
                                        keyboardType="phone-pad"
                                    />
                                </View>

                                {/* Počet osob */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Number of guests *</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={guests}
                                        onChangeText={setGuests}
                                        placeholder="Enter number of guests"
                                        keyboardType="number-pad"
                                    />
                                </View>

                                {/* Datum */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Date *</Text>
                                    <TouchableOpacity
                                        style={styles.dateTimeButton}
                                        onPress={() => setShowDatePicker(true)}
                                    >
                                        <Text>{formatDate(date)}</Text>
                                    </TouchableOpacity>
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="default"
                                            onChange={onDateChange}
                                            minimumDate={new Date()}
                                        />
                                    )}
                                </View>

                                {/* Čas */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Time *</Text>
                                    <TouchableOpacity
                                        style={styles.dateTimeButton}
                                        onPress={() => setShowTimePicker(true)}
                                    >
                                        <Text>{formatTime(time)}</Text>
                                    </TouchableOpacity>
                                    {showTimePicker && (
                                        <DateTimePicker
                                            value={time}
                                            mode="time"
                                            display="default"
                                            onChange={onTimeChange}
                                        />
                                    )}
                                </View>

                                {/* Typ oslavy - nové pole */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Celebration type *</Text>
                                    <View style={styles.celebrationTypesContainer}>
                                        {CELEBRATION_TYPES.map((type) => (
                                            <TouchableOpacity
                                                key={type.id}
                                                style={[
                                                    styles.celebrationTypeButton,
                                                    celebrationType === type.id && styles.selectedCelebrationType
                                                ]}
                                                onPress={() => setCelebrationType(type.id)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.celebrationTypeText,
                                                        celebrationType === type.id && styles.selectedCelebrationTypeText
                                                    ]}
                                                >
                                                    {type.label}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Poznámka */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Note (optional)</Text>
                                    <TextInput
                                        style={[styles.input, styles.textArea]}
                                        value={note}
                                        onChangeText={setNote}
                                        placeholder="If you have any special requests or wishes, let us know"
                                        multiline
                                        numberOfLines={4}
                                        textAlignVertical="top"
                                    />
                                </View>

                                {/* Tlačítko pro odeslání */}
                                <TouchableOpacity
                                    style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                                    onPress={handleSubmit}
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text style={styles.submitButtonText}>Submit booking</Text>
                                    )}
                                </TouchableOpacity>

                                <Text style={styles.disclaimer}>
                                    * Required fields
                                </Text>

                                <Text style={styles.promotionText}>
                                    💝 With reservation you are getting 2x bottle of premium Saké 💝
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
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
        height: 320,
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
    celebrationBanner: {
        backgroundColor: designSystem.COLORS.PRIMARY,
        padding: 16,
        borderRadius: designSystem.RADIUS.MD,
        marginBottom: 24,
        ...designSystem.SHADOWS.MD,
    },
    bannerText: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: 'white',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: designSystem.RADIUS.MD,
        padding: 16,
        marginBottom: 24,
        ...designSystem.SHADOWS.SM,
    },
    formTitle: {
        ...designSystem.TYPOGRAPHY.H3,
        marginBottom: 16,
        color: designSystem.COLORS.TEXT_PRIMARY,
        textAlign: 'center',
    },
    emailInfoContainer: {
        padding: 12,
        backgroundColor: designSystem.COLORS.PRIMARY,
        borderRadius: designSystem.RADIUS.SM,
        marginBottom: 16,
    },
    emailInfoText: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: designSystem.COLORS.PRIMARY,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        ...designSystem.TYPOGRAPHY.LABEL,
        marginBottom: 8,
        color: designSystem.COLORS.TEXT_SECONDARY,
    },
    input: {
        ...designSystem.COMPONENTS.INPUT,
        width: '100%',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    dateTimeButton: {
        ...designSystem.COMPONENTS.INPUT,
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    celebrationTypesContainer: {
        flexDirection: 'column',
        marginTop: 8,
    },
    celebrationTypeButton: {
        borderWidth: 1,
        borderColor: designSystem.COLORS.BORDER_DEFAULT,
        borderRadius: designSystem.RADIUS.SM,
        padding: 12,
        marginBottom: 8,
    },
    selectedCelebrationType: {
        backgroundColor: designSystem.COLORS.PRIMARY,
        borderColor: designSystem.COLORS.PRIMARY,
    },
    celebrationTypeText: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_PRIMARY,
        textAlign: 'center',
    },
    selectedCelebrationTypeText: {
        color: 'white',
    },
    submitButton: {
        ...designSystem.COMPONENTS.BUTTON,
        backgroundColor: designSystem.COLORS.PRIMARY,
        marginTop: 8,
        marginBottom: 16,
    },
    submitButtonDisabled: {
        opacity: 0.7,
    },
    submitButtonText: {
        ...designSystem.TYPOGRAPHY.BUTTON,
        color: 'white',
        textAlign: 'center',
    },
    disclaimer: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: designSystem.COLORS.TEXT_MUTED,
        marginBottom: 16,
    },
    promotionText: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: designSystem.COLORS.SUCCESS,
        textAlign: 'center',
        marginTop: 8,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    headerGradient: {
        padding: designSystem.SPACING.LG,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerSubtitle: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_PRIMARY,
        textAlign: 'center',
    },
});