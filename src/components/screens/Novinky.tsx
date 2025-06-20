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
    Animated,
} from 'react-native';
import {NewsArticle} from '../models/interfaces';
import {frontendClass} from "../services/FeClass";
import {useFadeBetweenTabs} from "../services/useFadeBetweenTabs";
import designSystem from "../constants/globalStyles";
import {LinearGradient} from 'expo-linear-gradient';
import {getText, getCurrentLanguage} from "../services/LanguageUtils"; // ✅ Import lokalizace

export default function Novinky() {
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const {opacity} = useFadeBetweenTabs();

    useEffect(() => {
        const loadArticles = async () => {
            const loadedNews = await frontendClass.getNews();

            if (Array.isArray(loadedNews)) {
                setArticles(loadedNews);
            } else {
                console.warn("❗ Error loading news:", loadedNews);
            }
        }
        loadArticles();
    }, [])

    // Funkce pro formátování data podle jazyka
    const formatDate = (date: Date) => {
        const currentLang = getCurrentLanguage();
        const locale = currentLang === 'cs' ? 'cs-CZ' : 'en-GB';
        return new Date(date).toLocaleDateString(locale);
    };

    // Otevření detailu článku
    const openArticle = (article: NewsArticle) => {
        setSelectedArticle(article);
    };

    // Zavření detailu článku
    const closeArticle = () => {
        setSelectedArticle(null);
    };

    return (
        <Animated.View style={{flex: 1, opacity}}>
            <ScrollView style={styles.scrollView}
                        contentContainerStyle={{ paddingBottom: 75 }}
                        showsVerticalScrollIndicator={false}
                        bounces={true}>
                {/* GRADIENT BLUR SIMULACE - věrná napodobenina backdrop-filter: blur(10px) */}
                <LinearGradient
                    colors={[
                        'rgba(255, 255, 255, 0.4)',
                        'rgba(255, 255, 255, 0.25)',
                        'rgba(255, 255, 255, 0.35)',
                        'rgba(255, 255, 255, 0.3)',
                        'rgba(240, 240, 240, 0.3)',
                        'rgba(255, 255, 255, 0.28)',
                        'rgba(250, 250, 250, 0.32)',
                        'rgba(255, 255, 255, 0.3)'
                    ]}
                    locations={[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.blurGradientContainer}
                >
                    <View style={styles.mainContainer}>
                        {/* První dlaždice - vyšší */}
                        {articles.length > 0 && (
                            <TouchableOpacity
                                style={styles.firstTile}
                                onPress={() => openArticle(articles[0])}
                                activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            >
                                <ImageBackground
                                    source={{uri: articles[0].imageUrl}}
                                    style={styles.backgroundImage}
                                    imageStyle={styles.backgroundImageStyle}
                                >
                                    <View style={styles.firstTileOverlay}>
                                        <Text style={styles.dateText}>{formatDate(articles[0].createdAt)}</Text>
                                        <Text style={styles.headingText}>{articles[0].heading}</Text>
                                        <Text style={styles.perexText}>{articles[0].perex}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}

                        {/* Ostatní články */}
                        {articles.slice(1).map((article) => (
                            <TouchableOpacity
                                key={article.id}
                                style={styles.newsTile}
                                onPress={() => openArticle(article)}
                                activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                            >
                                <ImageBackground
                                    source={{uri: article.imageUrl}}
                                    style={styles.backgroundImage}
                                    imageStyle={styles.backgroundImageStyle}
                                >
                                    <View style={styles.darkOverlay}>
                                        <Text style={styles.dateText}>{formatDate(article.createdAt)}</Text>
                                        <Text style={styles.headingText}>{article.heading}</Text>
                                        <Text style={styles.perexText}>{article.perex}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </View>
                </LinearGradient>
            </ScrollView>

            {/* Modal pro zobrazení celého článku */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={selectedArticle !== null}
                onRequestClose={closeArticle}
            >
                {selectedArticle && (
                    <SafeAreaView style={styles.modalContainer}>
                        <ScrollView>
                            <Image
                                source={{uri: selectedArticle.imageUrl}}
                                style={styles.articleImage}
                            />
                            <View style={styles.articleContent}>
                                <Text style={styles.articleDate}>{formatDate(selectedArticle.createdAt)}</Text>
                                <Text style={styles.articleHeading}>{selectedArticle.heading}</Text>
                                <Text style={styles.articlePerex}>{selectedArticle.perex}</Text>
                                <Text style={styles.articleText}>{selectedArticle.text}</Text>
                            </View>
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeArticle}
                            activeOpacity={designSystem.INTERACTIONS.ACTIVE_OPACITY}
                        >
                            <Text style={styles.closeButtonText}>{getText('news.close')}</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                )}
            </Modal>
        </Animated.View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    // GRADIENT BLUR SIMULACE - napodobuje backdrop-filter: blur(10px)
    blurGradientContainer: {
        flex: 1,
        minHeight: '100%',
    },
    mainContainer: {
        flex: 1,
        padding: 0, // Odstraněno padding pro edge-to-edge
        backgroundColor: 'transparent', // Průhledné - gradient dělá efekt
    },

    // První dlaždice - o 50% vyšší
    firstTile: {
        height: 210, // 140 + 50% = 210
        marginBottom: 0, // Bez mezery
        borderRadius: 0, // Bez zaoblení pro edge-to-edge
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)', // Ještě jemnější bílý border
        overflow: 'hidden',
        ...designSystem.SHADOWS.SM,
    },
    // Overlay pro první dlaždici - text posunutý dolů
    firstTileOverlay: {
        backgroundColor: designSystem.COLORS.OVERLAY_DARK,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: designSystem.SPACING.MD,
        paddingTop: designSystem.SPACING.MD + 15, // Posunutí o 15px dolů
    },

    // Normální dlaždice
    newsTile: {
        height: 140,
        marginBottom: 0, // Bez mezery
        borderRadius: 0, // Bez zaoblení pro edge-to-edge
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)', // Ještě jemnější bílý border
        overflow: 'hidden',
        ...designSystem.SHADOWS.SM,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImageStyle: {
        borderRadius: 0, // Bez zaoblení pro edge-to-edge
    },
    darkOverlay: {
        backgroundColor: designSystem.COLORS.OVERLAY_DARK,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: designSystem.SPACING.MD,
    },
    dateText: {
        color: designSystem.COLORS.ACCENT,
        ...designSystem.TYPOGRAPHY.CAPTION,
        marginBottom: designSystem.SPACING.XS,
    },
    headingText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.H3,
        marginBottom: designSystem.SPACING.XS,
    },
    perexText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.SMALL,
    },

    // Styly pro modal s detailem článku
    modalContainer: {
        flex: 1,
        backgroundColor: designSystem.COLORS.SURFACE,
    },
    articleImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    articleContent: {
        padding: designSystem.SPACING.MD,
    },
    articleDate: {
        ...designSystem.TYPOGRAPHY.CAPTION,
        color: designSystem.COLORS.TEXT_MUTED,
        marginBottom: designSystem.SPACING.XS,
    },
    articleHeading: {
        ...designSystem.TYPOGRAPHY.H2,
        color: designSystem.COLORS.PRIMARY,
        marginBottom: designSystem.SPACING.SM,
    },
    articlePerex: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        marginBottom: designSystem.SPACING.MD,
        color: designSystem.COLORS.TEXT_PRIMARY,
    },
    articleText: {
        ...designSystem.TYPOGRAPHY.BODY,
        lineHeight: 24,
        color: designSystem.COLORS.TEXT_SECONDARY,
    },
    closeButton: {
        backgroundColor: designSystem.COLORS.PRIMARY,
        paddingVertical: designSystem.SPACING.SM,
        alignItems: 'center',
        margin: designSystem.SPACING.MD,
        borderRadius: designSystem.RADIUS.MD,
        ...designSystem.SHADOWS.SM,
    },
    closeButtonText: {
        color: designSystem.COLORS.TEXT_ON_PRIMARY,
        ...designSystem.TYPOGRAPHY.BUTTON,
    },
});