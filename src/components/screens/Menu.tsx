import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Modal,
    ScrollView,
    SafeAreaView,
    Image,
    Dimensions,
    Animated
} from 'react-native';
import React, {useState, useEffect, useRef} from "react";
import {MenuItems, Menu as MenuType, MenuItem, MenuCategory} from "../models/interfaces";
import {frontendClass} from "../services/FeClass";
import {useFadeBetweenTabs} from "../services/useFadeBetweenTabs";
import designSystem from "../constants/globalStyles";
import {LinearGradient} from "expo-linear-gradient";

// Import obrázku z assets
const menuHeaderImage = require("../../../assets/menupic2.png");

const windowWidth = Dimensions.get('window').width;

export default function Menu() {
    const [restaurantMenu, setRestaurantMenu] = useState<MenuType>();
    const [itemOpened, setItemOpened] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userRating, setUserRating] = useState<{ [key: string]: number }>({});

    const {opacity} = useFadeBetweenTabs();

    useEffect(() => {
        const loadMenu = async () => {
            setLoading(true);
            try {
                const loadedMenu = await frontendClass.getMenu();
                if (loadedMenu) {
                    setRestaurantMenu(loadedMenu);
                }
            } catch (error) {
                console.error("Error loading menu:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMenu();
    }, []);

    const openItem = (item: MenuItem) => {
        setItemOpened(item);
    };

    const closeItem = () => {
        setItemOpened(null);
    };

    const handleRating = (itemId: string, rating: number) => {
        setUserRating(prev => ({
            ...prev,
            [itemId]: rating
        }));
    };

    const renderStars = (itemId: string, popularity: number) => {
        const stars = [];
        const maxStars = 5;
        // Použij uživatelské hodnocení, pokud existuje, jinak použij výchozí popularitu
        const currentRating = userRating[itemId] || popularity;

        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleRating(itemId, i)}
                    activeOpacity={0.7}
                >
                    <Text style={i <= currentRating ? styles.starFilled : styles.starEmpty}>
                        {i <= currentRating ? '★' : '☆'}
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.starsContainer}>
                {stars}
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{...designSystem.TYPOGRAPHY.BODY}}>Loading menu...</Text>
            </View>
        );
    }

    return (
        <Animated.View
            style={[
                {flex: 1, opacity}
            ]}>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                    bounces={true}>
                    {/* Obrázek hlavičky menu */}
                    <Image
                        source={menuHeaderImage}
                        style={styles.menuHeaderImage}
                        resizeMode="cover"
                    />

                    {/* NOVÁ GRADIENT INFORMAČNÍ SEKCE */}
                    <LinearGradient
                        colors={[designSystem.COLORS.PRIMARY, designSystem.COLORS.ACCENT]}
                        style={styles.infoGradient}
                    >
                        <View style={styles.infoContent}>
                            <Text style={styles.infoText}>
                                Enjoy all you can eat with all dishes bellow
                            </Text>
                        </View>
                    </LinearGradient>

                    <View style={styles.mainContainer}>


                        {restaurantMenu && restaurantMenu.categories.map((category, categoryIndex) => (
                            <View key={categoryIndex} style={styles.categoryContainer}>
                                <Text style={styles.categoryTitle}>{category.name}</Text>
                                <View style={styles.itemsContainer}>
                                    {category.items.map((item, itemIndex) => (
                                        <TouchableOpacity
                                            key={itemIndex}
                                            style={styles.menuItem}
                                            onPress={() => openItem(item)}>
                                            <View style={styles.itemContent}>
                                                <View style={styles.itemInfo}>
                                                    <Text style={styles.itemName}>{item.name}</Text>
                                                    <Text style={styles.itemPerex}>{item.perex}</Text>
                                                    <View style={styles.priceWeightContainer}>
                                                        <Text style={styles.itemPrice}>£{item.price}</Text>
                                                        <Text style={styles.itemWeight}>{item.weightGrams} g</Text>
                                                    </View>
                                                </View>
                                                <Image
                                                    source={{uri: item.imageUrl}}
                                                    style={styles.itemImage}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={itemOpened !== null}
                    onRequestClose={closeItem}>
                    {itemOpened && (
                        <SafeAreaView style={styles.modalContainer}>
                            <ScrollView>
                                <Image
                                    source={{uri: itemOpened.imageUrl}}
                                    style={styles.modalImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>{itemOpened.name}</Text>
                                    <Text style={styles.modalPerex}>{itemOpened.perex}</Text>

                                    <View style={styles.modalDetails}>
                                        <Text style={styles.modalPrice}>£{itemOpened.price}</Text>
                                        <Text style={styles.modalWeight}>{itemOpened.weightGrams} g</Text>
                                        {itemOpened.preparationTimeMinutes && (
                                            <Text style={styles.modalPrepTime}>
                                                Prep time: {itemOpened.preparationTimeMinutes} min
                                            </Text>
                                        )}
                                    </View>

                                    {/* Interaktivní hvězdičky popularity */}
                                    <View style={styles.popularityContainer}>
                                        <Text style={styles.popularityLabel}>Popularity: </Text>
                                        {renderStars(itemOpened.id, itemOpened.popularity)}
                                    </View>
                                    {userRating[itemOpened.id] && (
                                        <Text style={styles.ratingMessage}>
                                            Thank you for your rating!
                                        </Text>
                                    )}

                                    {itemOpened.allergens && itemOpened.allergens.length > 0 && (
                                        <View style={styles.allergens}>
                                            <Text style={styles.allergensTitle}>Allergens:</Text>
                                            <Text>{itemOpened.allergens.join(', ')}</Text>
                                        </View>
                                    )}

                                    <Text style={styles.modalDescription}>{itemOpened.description}</Text>

                                    {itemOpened.specialCategory && itemOpened.specialCategory.length > 0 && (
                                        <View style={styles.specialCategories}>
                                            {itemOpened.specialCategory.map((category, index) => (
                                                <View key={index} style={styles.specialCategoryTag}>
                                                    <Text style={styles.specialCategoryText}>{category}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={closeItem}>
                                    <Text style={styles.closeButtonText}>Back to menu</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </SafeAreaView>
                    )}
                </Modal>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Přidaný styl pro obrázek hlavičky menu
    menuHeaderImage: {
        width: windowWidth, // Použití celé šířky displeje
        height: 350,       // Pevná výška 240px
    },
    mainContainer: {
        padding: 10,
    },
    // Nové styly pro sekci s informacemi o restauraci
    restaurantInfoContainer: {
        marginBottom: 10,
        padding: 6,
        backgroundColor: 'white',
        borderRadius: designSystem.RADIUS.MD,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderLeftWidth: 3,
        borderLeftColor: designSystem.COLORS.SUCCESS,

    },
    restaurantName: {
        ...designSystem.TYPOGRAPHY.H3,
        color: designSystem.COLORS.TEXT_PRIMARY,
        marginBottom: 8,
        textAlign: 'center'
    },
    restaurantAddress: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: designSystem.COLORS.TEXT_SECONDARY,
        marginBottom: 4,
        textAlign: 'center'
    },
    restaurantOpeningDate: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: designSystem.COLORS.SUCCESS,
        marginTop: 8,
        textAlign: 'center',
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryTitle: {
        ...designSystem.TYPOGRAPHY.H2,
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
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
        color: '#e53935',
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
    },

    // Modal styles
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalImage: {
        width: '100%',
        height: 250,
    },
    modalContent: {
        padding: 15,
    },
    modalTitle: {
        ...designSystem.TYPOGRAPHY.H1,
        marginBottom: 8,
    },
    modalPerex: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        color: '#666',
        marginBottom: 15,
        fontStyle: 'italic',
    },
    modalDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalPrice: {
        ...designSystem.TYPOGRAPHY.H3,
        color: '#e53935',
    },
    modalWeight: {
        ...designSystem.TYPOGRAPHY.BODY,
        color: '#777',
    },
    modalPrepTime: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: '#777',
    },
    modalDescription: {
        ...designSystem.TYPOGRAPHY.BODY,
        lineHeight: 24,
        marginVertical: 15,
    },
    allergens: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    allergensTitle: {
        ...designSystem.TYPOGRAPHY.BODY_STRONG,
        marginBottom: 5,
    },
    specialCategories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 15,
    },
    specialCategoryTag: {
        backgroundColor: '#4caf50',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    specialCategoryText: {
        ...designSystem.TYPOGRAPHY.LABEL,
        color: 'white',
    },
    closeButton: {
        margin: 20,
        backgroundColor: designSystem.COLORS.PRIMARY,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        ...designSystem.TYPOGRAPHY.BUTTON,
        color: 'white',
    },
    // Hvězdičky styles
    starsContainer: {
        flexDirection: 'row',
    },
    starFilled: {
        color: '#FFD700', // zlatá barva
        fontSize: 18,
    },
    starEmpty: {
        color: '#C0C0C0', // stříbrná barva
        fontSize: 18,
    },
    popularityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    popularityLabel: {
        ...designSystem.TYPOGRAPHY.BODY,
        marginRight: 5,
    },
    ratingMessage: {
        ...designSystem.TYPOGRAPHY.SMALL,
        color: '#4CAF50',
        fontStyle: 'italic',
        marginTop: 5,
        marginBottom: 15,
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