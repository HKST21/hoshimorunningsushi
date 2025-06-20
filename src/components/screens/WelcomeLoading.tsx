import { StyleSheet, View, Text, Animated, Easing, Dimensions, ImageBackground } from 'react-native';
import { useEffect, useRef, useCallback } from 'react';
import designSystem from '../constants/globalStyles';

interface WelcomeLoadingProps {
    onLoadingComplete: () => void; // Callback funkce nevrací nic
}

export default function WelcomeLoading({ onLoadingComplete } : WelcomeLoadingProps) {
    // Animated hodnota pro overlay opacity - začíná na 0.6
    const overlayOpacity = useRef(new Animated.Value(0.6)).current;
    // Stav pro sledování trvání animace
    const animationDuration = 4000; // 4 sekundy

    // Pomocná funkce pro spuštění načítacího procesu
    const startLoadingProcess = useCallback(() => {
        // ✅ OKAMŽITÉ spuštění animace - BEZ zpoždění
        Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: false,
            easing: Easing.out(Easing.cubic), // Hezká easing křivka
        }).start(({ finished }) => {
            // Když animace dokončí, oznámíme to parent komponentě
            if (finished && onLoadingComplete) {
                onLoadingComplete();
            }
        });
    }, [overlayOpacity, animationDuration, onLoadingComplete]);

    // ✅ Spustíme načítací proces OKAMŽITĚ po mount
    useEffect(() => {
        startLoadingProcess();
    }, [startLoadingProcess]);

    return (
        <ImageBackground
            source={require('../../../assets/loginpic.png')}
            style={styles.mainContainer}
            resizeMode="cover"
            // ✅ Přidáme onLoad pro zajištění, že se obrázek načte rychle
            onLoad={() => {
                console.log('🖼️ Background image loaded');
            }}
        >
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
                <View style={styles.contentContainer}>
                    {/* Elegantní loading text */}
                    <Text style={styles.loadingText}>
                        🍣RUNNING SUSHI LOADING
                    </Text>

                    {/* Loading dots */}
                    <View style={styles.dotsContainer}>
                        <LoadingDots />
                    </View>
                </View>
            </Animated.View>
        </ImageBackground>
    );
}

// Komponenta pro animované tečky
function LoadingDots() {
    const dot1 = useRef(new Animated.Value(0.3)).current;
    const dot2 = useRef(new Animated.Value(0.3)).current;
    const dot3 = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animateDots = () => {
            const createDotAnimation = (dot: Animated.Value, delay: number) => {
                return Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(dot, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: false,
                    }),
                    Animated.timing(dot, {
                        toValue: 0.3,
                        duration: 400,
                        useNativeDriver: false,
                    }),
                ]);
            };

            // ✅ Spustíme animaci teček OKAMŽITĚ
            Animated.loop(
                Animated.parallel([
                    createDotAnimation(dot1, 0),
                    createDotAnimation(dot2, 200),
                    createDotAnimation(dot3, 400),
                ])
            ).start();
        };

        // ✅ Bez zpoždění - animace začnou hned
        animateDots();
    }, []);

    return (
        <View style={styles.dots}>
            <Animated.View style={[styles.dot, { opacity: dot1 }]} />
            <Animated.View style={[styles.dot, { opacity: dot2 }]} />
            <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // ✅ Přidáme fallback barvu pro rychlejší zobrazení
        backgroundColor: '#1a1a1a', // Tmavá barva místo šedé
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Statická hodnota, animuje se opacity
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    contentContainer: {
        alignItems: 'center',
        width: '80%',
    },
    loadingText: {
        ...designSystem.TYPOGRAPHY.H2,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: designSystem.SPACING.LG,
        // ✅ Přidáme text shadow pro lepší čitelnost
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    dotsContainer: {
        marginTop: designSystem.SPACING.MD,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 4,
        // ✅ Přidáme shadow i pro tečky
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
});