import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
    Animated,
    Easing,
    Image
} from 'react-native';
import {useUser} from "../services/UserContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useAnimatedScreenTransition} from "../services/useAnimatedScreenTransition";
import designSystem from '../constants/globalStyles';
import {getText, getCurrentLanguage} from "../services/LanguageUtils"; // ✅ Import lokalizace

const { TYPOGRAPHY, COLORS, SPACING, RADIUS, SHADOWS } = designSystem;

export default function Rezervace() {
    const {loggedUser} = useUser();

    // Stav formuláře
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [peopleCount, setPeopleCount] = useState('2');
    const [note, setNote] = useState('');

    // Stav pro zobrazení pickerů
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Stav pro validaci
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        peopleCount: ''
    });

    // Stav pro submitting
    const [isSubmitting, setIsSubmitting] = useState(false);

    const animatedStyles = useAnimatedScreenTransition();

    // Načtení jména uživatele při montování komponenty
    useEffect(() => {
        if (loggedUser && loggedUser.firstName) {
            setFirstName(loggedUser.firstName);
        }
    }, [loggedUser]);

    // Funkce pro validaci formuláře
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            peopleCount: ''
        };

        // Validace jména
        if (!firstName.trim()) {
            newErrors.firstName = getText('reservation.validation.firstNameRequired');
            isValid = false;
        }

        // Validace příjmení
        if (!lastName.trim()) {
            newErrors.lastName = getText('reservation.validation.surnameRequired');
            isValid = false;
        }

        // Validace telefonního čísla (jednoduchá validace)
        const phoneRegex = /^[0-9]{9}$/;
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = getText('reservation.validation.phoneRequired');
            isValid = false;
        } else if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = getText('reservation.validation.phoneInvalid');
            isValid = false;
        }

        // Validace počtu osob
        if (!peopleCount.trim()) {
            newErrors.peopleCount = getText('reservation.validation.guestsRequired');
            isValid = false;
        } else if (isNaN(Number(peopleCount)) || Number(peopleCount) < 1) {
            newErrors.peopleCount = getText('reservation.validation.guestsInvalid');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Formátování data a času podle jazyka
    const formatDate = (date: Date): string => {
        const currentLang = getCurrentLanguage();
        if (currentLang === 'cs') {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        } else {
            return date.toLocaleDateString('en-GB');
        }
    };

    const formatTime = (time: Date): string => {
        return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
    };

    // Formátování data pro zobrazení v UI
    const formatDateForDisplay = (date: Date): string => {
        const currentLang = getCurrentLanguage();
        const locale = currentLang === 'cs' ? 'cs-CZ' : 'en-GB';
        return date.toLocaleDateString(locale);
    };

    const formatTimeForDisplay = (time: Date): string => {
        const currentLang = getCurrentLanguage();
        const locale = currentLang === 'cs' ? 'cs-CZ' : 'en-GB';
        return time.toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit'});
    };

    // Funkce pro odeslání formuláře
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Získání emailu z přihlášeného uživatele nebo použití výchozí hodnoty
            const userEmail = loggedUser?.email || 'not-provided@email.com';

            // Formátování data a času pro odeslání
            const formattedDate = formatDate(date);
            const formattedTime = formatTime(time);

            // Sestavení dat pro odeslání
            const formData = {
                firstName,
                lastName,
                email: userEmail,
                phoneNumber,
                date: formattedDate,
                time: formattedTime,
                peopleCount,
                note: note || getText('reservation.form.noNote')
            };

            // Odeslání dat pomocí Formspree API
            const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnndwdky';

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    subject: `New table reservation: ${firstName} ${lastName}`,
                    message: `New table reservation from ${firstName} ${lastName}`,
                    ...formData
                })
            });

            if (!response.ok) {
                throw new Error('Error submitting form');
            }

            // Zobrazení potvrzení uživateli
            Alert.alert(
                getText('reservation.success.title'),
                getText('reservation.success.message'),
                [{text: getText('reservation.success.ok'), onPress: resetForm}]
            );
        } catch (error) {
            console.error('Chyba při odesílání rezervace:', error);
            Alert.alert(getText('reservation.error.title'), getText('reservation.error.message'));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset formuláře po úspěšném odeslání
    const resetForm = () => {
        setLastName('');
        setPhoneNumber('');
        setDate(new Date());
        setTime(new Date());
        setPeopleCount('2');
        setNote('');
    };

    // Funkce pro změnu datumu
    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    // Funkce pro změnu času
    const onTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    return (
        <Animated.View
            style={[{flex: 1}, animatedStyles]}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView style={styles.scrollView}
                            contentContainerStyle={{ paddingBottom: 60 }}
                            showsVerticalScrollIndicator={false}
                            bounces={true}>
                    {/* Úvodní obrázek */}
                    <Image
                        source={require('../../../assets/reservation.png')}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={[COLORS.PRIMARY, COLORS.ACCENT]}
                        style={styles.headerGradient}
                    >
                        <View style={styles.headerContent}>
                            <Text style={styles.headerSubtitle}>
                                {getText('reservation.headerSubtitle')}
                            </Text>
                        </View>
                    </LinearGradient>

                    <View style={styles.mainContainer}>
                        <View style={styles.headerContainer}>

                        </View>

                        <View style={styles.formContainer}>

                            {/* Jméno */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>{getText('reservation.form.firstName')}</Text>
                                <TextInput
                                    style={[styles.input, errors.firstName ? styles.inputError : null]}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder={getText('reservation.form.firstNamePlaceholder')}
                                    placeholderTextColor={COLORS.TEXT_MUTED}
                                />
                                {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
                            </View>

                            {/* Příjmení */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>{getText('reservation.form.surname')}</Text>
                                <TextInput
                                    style={[styles.input, errors.lastName ? styles.inputError : null]}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder={getText('reservation.form.surnamePlaceholder')}
                                    placeholderTextColor={COLORS.TEXT_MUTED}
                                />
                                {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
                            </View>

                            {/* Telefonní číslo */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>{getText('reservation.form.phoneNumber')}</Text>
                                <TextInput
                                    style={[styles.input, errors.phoneNumber ? styles.inputError : null]}
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    placeholder={getText('reservation.form.phoneNumberPlaceholder')}
                                    placeholderTextColor={COLORS.TEXT_MUTED}
                                    keyboardType="phone-pad"
                                />
                                {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
                            </View>

                            {/* Datum a čas */}
                            <View style={styles.dateTimeContainer}>
                                {/* Datum */}
                                <View style={styles.datePickerContainer}>
                                    <Text style={styles.inputLabel}>{getText('reservation.form.date')}</Text>
                                    <TouchableOpacity
                                        style={styles.datePickerButton}
                                        onPress={() => setShowDatePicker(true)}
                                    >
                                        <Text style={styles.datePickerText}>
                                            {formatDateForDisplay(date)}
                                        </Text>
                                        <Ionicons name="calendar-outline" size={20} color={COLORS.PRIMARY} />
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
                                <View style={styles.timePickerContainer}>
                                    <Text style={styles.inputLabel}>{getText('reservation.form.time')}</Text>
                                    <TouchableOpacity
                                        style={styles.datePickerButton}
                                        onPress={() => setShowTimePicker(true)}
                                    >
                                        <Text style={styles.datePickerText}>
                                            {formatTimeForDisplay(time)}
                                        </Text>
                                        <Ionicons name="time-outline" size={20} color={COLORS.PRIMARY} />
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
                            </View>

                            {/* Počet osob */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>{getText('reservation.form.numberOfGuests')}</Text>
                                <TextInput
                                    style={[styles.input, errors.peopleCount ? styles.inputError : null]}
                                    value={peopleCount}
                                    onChangeText={setPeopleCount}
                                    placeholder={getText('reservation.form.numberOfGuestsPlaceholder')}
                                    placeholderTextColor={COLORS.TEXT_MUTED}
                                    keyboardType="number-pad"
                                />
                                {errors.peopleCount ? <Text style={styles.errorText}>{errors.peopleCount}</Text> : null}
                            </View>

                            {/* Poznámka */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>{getText('reservation.form.note')}</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    value={note}
                                    onChangeText={setNote}
                                    placeholder={getText('reservation.form.notePlaceholder')}
                                    placeholderTextColor={COLORS.TEXT_MUTED}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                            </View>

                            {/* Tlačítko odeslat */}
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                                activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color={COLORS.TEXT_ON_PRIMARY} />
                                ) : (
                                    <Text style={styles.submitButtonText}>{getText('reservation.form.reserveTable')}</Text>
                                )}
                            </TouchableOpacity>

                            <Text style={styles.disclaimer}>
                                {getText('reservation.disclaimer')}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    headerImage: {
        width: '100%',
        height: 350,
    },
    infoContent: {
        alignItems: 'center',
    },
    infoText: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_ON_PRIMARY,
        textAlign: 'center',
        fontWeight: '500',
    },
    mainContainer: {
        flex: 1,
        padding: SPACING.MD,
    },
    headerContainer: {
        marginBottom: SPACING.XL,
    },
    headerTitle: {
        ...TYPOGRAPHY.H1,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.SM,
    },

    formContainer: {
        backgroundColor: COLORS.SURFACE,
        borderRadius: RADIUS.LG,
        padding: SPACING.MD,
        ...SHADOWS.MD,
    },
    emailInfoContainer: {
        padding: SPACING.SM,
        backgroundColor: designSystem.COLORS.BACKGROUND,
        borderRadius: RADIUS.SM,
        marginBottom: SPACING.MD,
    },

    inputContainer: {
        marginBottom: SPACING.MD,
    },
    inputLabel: {
        ...TYPOGRAPHY.BODY_STRONG,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.XS,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.BORDER_DEFAULT,
        borderRadius: RADIUS.MD,
        padding: SPACING.SM,
        ...TYPOGRAPHY.BODY,
        backgroundColor: COLORS.BACKGROUND,
        color: COLORS.TEXT_PRIMARY,
    },
    inputError: {
        borderColor: COLORS.BORDER_ERROR,
    },
    errorText: {
        ...TYPOGRAPHY.SMALL,
        color: COLORS.BORDER_ERROR,
        marginTop: SPACING.XS,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.MD,
    },
    datePickerContainer: {
        flex: 1,
        marginRight: SPACING.XS,
    },
    timePickerContainer: {
        flex: 1,
        marginLeft: SPACING.XS,
    },
    datePickerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.BORDER_DEFAULT,
        borderRadius: RADIUS.MD,
        padding: SPACING.SM,
        backgroundColor: COLORS.BACKGROUND,
    },
    datePickerText: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.TEXT_PRIMARY,
    },
    submitButton: {
        backgroundColor: COLORS.PRIMARY,
        paddingVertical: SPACING.MD,
        borderRadius: RADIUS.MD,
        alignItems: 'center',
        marginTop: SPACING.SM,
        ...SHADOWS.SM,
    },
    submitButtonText: {
        ...TYPOGRAPHY.BUTTON,
        color: COLORS.TEXT_ON_PRIMARY,
    },
    disclaimer: {
        ...TYPOGRAPHY.SMALL,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
        marginTop: SPACING.MD,
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