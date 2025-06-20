import React, {useRef, useState} from "react";
import { Image, Text, Animated, Pressable, View, StyleSheet, Modal, Dimensions, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import {useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {getText} from "../services/LanguageUtils"; // ✅ Import lokalizace
import Layout from "../layout/Layout";
import Home from "../screens/Home";
import Kupony from "../screens/Kupony";
import Novinky from "../screens/Novinky";
import Menu from "../screens/Menu";
import WelcomeLoading from "../screens/WelcomeLoading";
import Login from "../screens/Login";
import {useUser} from "../services/UserContext";
import ProfilUzivatele from "../screens/ProfilUzivatele";
import ZiskejNavstevy from "../screens/ZiskejNavstevy";
import Rezervace from "../screens/Rezervace";
import VipNabidky from "../screens/VipNabidky";
import JakToFunguje from "../screens/JakToFunguje";
import Kontakt from "../screens/Kontakt";
import Oslavy from "../screens/Oslavy";
import designSystem from "../constants/globalStyles";

const presentBoxIcon = require("../../../assets/present-box.png");
const homeButton = require("../../../assets/home.png");
const news = require("../../../assets/news.png");
const menu = require("../../../assets/menu.png");
const moreIcon = require("../../../assets/more.png");

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { TYPOGRAPHY, COLORS, SPACING } = designSystem;

// Typy pro navigaci
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
    Login: { returnTo?: string };
};

type NavigationProp = BottomTabNavigationProp<RootTabParamList>;

// Integrovaná HamburgerMenu komponenta
function IntegratedHamburgerMenu({ isVisible, onClose, navigation }: {
    isVisible: boolean;
    onClose: () => void;
    navigation: NavigationProp;
}) {
    const [isAnimating, setIsAnimating] = useState(false);

    // Animované hodnoty
    const slideAnimation = useRef(new Animated.Value(SCREEN_WIDTH * 0.65)).current;
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    // Menu items s překlady
    const menuItems = [
        {
            title: getText('menu.reservation'),
            icon: 'restaurant-outline',
            screen: 'Rezervace' as keyof RootTabParamList,
        },
        {
            title: getText('menu.vip'),
            icon: 'star-outline',
            screen: 'VipNabidky' as keyof RootTabParamList,
        },
        {
            title: getText('menu.coupons'),
            icon: 'ticket-outline',
            screen: 'Kupony' as keyof RootTabParamList,
        },
        {
            title: getText('menu.confirmVisit'),
            icon: 'scan-outline',
            screen: 'ZiskejNavstevy' as keyof RootTabParamList,
        },
        {
            title: getText('menu.faq'),
            icon: 'help-circle-outline',
            screen: 'JakToFunguje' as keyof RootTabParamList,
        },
        {
            title: getText('menu.myProfile'),
            icon: 'person-outline',
            screen: 'ProfilUzivatele' as keyof RootTabParamList,
        },
        {
            title: getText('menu.contact'),
            icon: 'call-outline',
            screen: 'Kontakt' as keyof RootTabParamList,
        },
        {
            title: getText('menu.celebs'),
            icon: 'gift-outline',
            screen: 'Oslavy' as keyof RootTabParamList,
        }
    ];

    // Zavření menu s plynulou animací
    const closeMenu = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        Animated.parallel([
            Animated.timing(slideAnimation, {
                toValue: SCREEN_WIDTH * 0.65,
                duration: 320,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimation, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start((finished) => {
            if (finished) {
                setIsAnimating(false);
                onClose();
            }
        });
    };

    // Navigace s plynulým zavřením
    const navigateToScreen = (screen: keyof RootTabParamList) => {
        if (isAnimating) return;
        setIsAnimating(true);

        Animated.parallel([
            Animated.timing(slideAnimation, {
                toValue: SCREEN_WIDTH * 0.65,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start((finished) => {
            if (finished) {
                setIsAnimating(false);
                onClose();

                try {
                    navigation.navigate(screen as any);
                } catch (error) {
                    console.error('Navigation error:', error);
                }
            }
        });
    };

    // Effect pro otevření menu když se změní isVisible
    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            Animated.parallel([
                Animated.timing(slideAnimation, {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start((finished) => {
                if (finished) {
                    setIsAnimating(false);
                }
            });
        }
    }, [isVisible]);

    // CLEANUP ANIMACÍ
    useEffect(() => {
        return () => {
            slideAnimation.stopAnimation();
            fadeAnimation.stopAnimation();
            slideAnimation.setValue(SCREEN_WIDTH * 0.65);
            fadeAnimation.setValue(0);
        };
    }, []);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="none"
            onRequestClose={closeMenu}
        >
            {/* Backdrop */}
            <Animated.View
                style={[
                    hamburgerStyles.backdrop,
                    { opacity: fadeAnimation }
                ]}
            >
                <TouchableOpacity
                    style={hamburgerStyles.backdropTouchable}
                    onPress={closeMenu}
                    activeOpacity={1}
                    disabled={isAnimating}
                />
            </Animated.View>

            {/* Menu Panel */}
            <Animated.View
                style={[
                    hamburgerStyles.menuPanel,
                    {
                        transform: [{ translateX: slideAnimation }]
                    }
                ]}
            >
                <View style={hamburgerStyles.glassmorphismContainer}>
                    <SafeAreaView style={hamburgerStyles.menuSafeArea}>
                        <ScrollView
                            style={hamburgerStyles.menuScrollView}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={!isAnimating}
                        >
                            <View style={hamburgerStyles.menuItemsContainer}>
                                {menuItems.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={hamburgerStyles.menuItem}
                                        onPress={() => navigateToScreen(item.screen)}
                                        activeOpacity={0.8}
                                        disabled={isAnimating}
                                    >
                                        <LinearGradient
                                            colors={[COLORS.ACCENT, COLORS.PRIMARY]}
                                            style={[hamburgerStyles.menuItemGradient, { opacity: 0.8 }]}
                                        >
                                            <View style={hamburgerStyles.menuItemContent}>
                                                <Ionicons
                                                    name={item.icon as any}
                                                    size={24}
                                                    color="#ffffff"
                                                />
                                                <Text style={hamburgerStyles.menuItemText}>
                                                    {item.title}
                                                </Text>
                                                <Ionicons
                                                    name="chevron-forward"
                                                    size={20}
                                                    color="#ffffff"
                                                    style={hamburgerStyles.chevronIcon}
                                                />
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </Animated.View>
        </Modal>
    );
}

export default function AppNavigator() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Funkce pro dokončení načítání z WelcomeLoading
    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {isLoading ? (
                    <Stack.Screen name={"WelcomeLoading"}>
                        {props => <WelcomeLoading {...props} onLoadingComplete={handleLoadingComplete} />}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen name="MainApp" component={MainTabNavigator}/>
                        <Stack.Screen name="Login" component={Login}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export function MainTabNavigator() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation<NavigationProp>();

    // Stav pro hamburger menu
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {

                        position: 'absolute',
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        height: 85,
                        paddingBottom: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -12 },
                        shadowOpacity: 0.25,
                        shadowRadius: 20,
                        elevation: 20,
                    },
                    tabBarBackground: () => (
                        <View style={styles.blurredTabBar}>
                            {/* Spodní vrstva - simulace blur efektu */}
                            <View style={styles.blurLayer1} />
                            <View style={styles.blurLayer2} />
                            <View style={styles.blurLayer3} />
                            <View style={styles.blurLayer4} />

                            {/* Hlavní glassmorphism vrstva */}
                            <LinearGradient
                                colors={[
                                    'rgba(255, 255, 255, 0.32)',
                                    'rgba(255, 255, 255, 0.22)',
                                    'rgba(248, 250, 255, 0.26)',
                                    'rgba(255, 255, 255, 0.18)',
                                    'rgba(250, 252, 255, 0.24)',
                                    'rgba(255, 255, 255, 0.16)',
                                    'rgba(252, 253, 255, 0.20)',
                                    'rgba(255, 255, 255, 0.14)',
                                ]}
                                locations={[0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1]}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                style={styles.glassmorphismLayer}
                            />

                            {/* Vrchní reflexní vrstva */}
                            <LinearGradient
                                colors={[
                                    'rgba(255, 255, 255, 0.5)',
                                    'rgba(255, 255, 255, 0.25)',
                                    'rgba(255, 255, 255, 0.08)',
                                    'rgba(255, 255, 255, 0.02)',
                                ]}
                                locations={[0, 0.3, 0.7, 1]}
                                start={{x: 0, y: 0}}
                                end={{x: 0, y: 1}}
                                style={styles.reflectionLayer}
                            />

                            {/* Jemný inner glow */}
                            <LinearGradient
                                colors={[
                                    'rgba(255, 255, 255, 0.15)',
                                    'rgba(255, 255, 255, 0.05)',
                                    'rgba(255, 255, 255, 0.02)',
                                ]}
                                locations={[0, 0.5, 1]}
                                start={{x: 0, y: 1}}
                                end={{x: 0, y: 0}}
                                style={styles.innerGlow}
                            />

                            {/* Border efekt */}
                            <View style={styles.borderEffect} />

                            {/* Dodatečný jemný highlight */}
                            <View style={styles.topHighlight} />
                        </View>
                    ),
                    tabBarActiveTintColor: 'rgba(185, 28, 28, 0.6)',    // Jemnější červená
                    tabBarInactiveTintColor: 'rgba(55, 65, 81, 0.4)',   // Šedá pro neaktivní
                    tabBarLabelStyle: {
                        ...designSystem.TYPOGRAPHY.SMALL,
                        fontWeight: '600',
                        marginTop: -5,
                        paddingBottom: 5,
                        textShadowColor: 'rgba(0, 0, 0, 0.3)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                    },
                    tabBarIconStyle: {
                        marginTop: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 1,
                        shadowRadius: 2,
                        elevation: 3,
                    },
                }}
            >
                {/* Viditelné záložky */}
                <Tab.Screen
                    name="Home"
                    options={{
                        tabBarLabel: getText('navigation.home'),
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Image
                                    source={homeButton}
                                    style={{
                                        width: 29,
                                        height: 29,
                                        opacity: focused ? 1 : 0.7,
                                        tintColor: focused ? 'rgba(185, 28, 28, 1)' : 'rgba(185, 28, 28, 0.65)',
                                    }}
                                    resizeMode="contain"
                                    fadeDuration={0}
                                />
                            );
                        },
                        tabBarButton: (props) => {
                            const scaleAnim = useRef(new Animated.Value(1)).current;

                            useEffect(() => {
                                return () => {
                                    scaleAnim.stopAnimation();
                                    scaleAnim.setValue(1);
                                };
                            }, []);

                            const onPressIn = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.timing(scaleAnim, {
                                    toValue: 0.85,
                                    duration: 90,
                                    useNativeDriver: true
                                }).start();
                            };

                            const onPressOut = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.spring(scaleAnim, {
                                    toValue: 1,
                                    tension: 400,
                                    friction: 8,
                                    useNativeDriver: true
                                }).start();
                            };

                            return (
                                <Pressable
                                    accessibilityRole={props.accessibilityRole}
                                    accessibilityState={props.accessibilityState}
                                    onPress={props.onPress}
                                    onPressIn={(e) => {
                                        onPressIn(e);
                                        props.onPressIn && props.onPressIn(e);
                                    }}
                                    onPressOut={(e) => {
                                        onPressOut(e);
                                        props.onPressOut && props.onPressOut(e);
                                    }}
                                    style={props.style}
                                >
                                    <Animated.View style={{
                                        transform: [{ scale: scaleAnim }],
                                    }}>
                                        {props.children}
                                    </Animated.View>
                                </Pressable>
                            );
                        }
                    }}
                >
                    {() => (
                        <Layout>
                            <Home/>
                        </Layout>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name={"Kupony"}
                    options={{
                        tabBarLabel: getText('navigation.coupons'),
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Image
                                    source={presentBoxIcon}
                                    style={{
                                        width: 37,
                                        height: 37,
                                        opacity: focused ? 1 : 0.7,
                                    }}
                                    resizeMode="contain"
                                    fadeDuration={0}
                                />
                            );
                        },
                        tabBarButton: (props) => {
                            const scaleAnim = useRef(new Animated.Value(1)).current;

                            useEffect(() => {
                                return () => {
                                    scaleAnim.stopAnimation();
                                    scaleAnim.setValue(1);
                                };
                            }, []);

                            const onPressIn = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.timing(scaleAnim, {
                                    toValue: 0.85,
                                    duration: 100,
                                    useNativeDriver: true
                                }).start();
                            };

                            const onPressOut = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.spring(scaleAnim, {
                                    toValue: 1,
                                    tension: 400,
                                    friction: 8,
                                    useNativeDriver: true
                                }).start();
                            };

                            return (
                                <Pressable
                                    accessibilityRole={props.accessibilityRole}
                                    accessibilityState={props.accessibilityState}
                                    onPress={props.onPress}
                                    onPressIn={(e) => {
                                        onPressIn(e);
                                        props.onPressIn && props.onPressIn(e);
                                    }}
                                    onPressOut={(e) => {
                                        onPressOut(e);
                                        props.onPressOut && props.onPressOut(e);
                                    }}
                                    style={props.style}
                                >
                                    <Animated.View style={{
                                        transform: [{ scale: scaleAnim }],
                                    }}>
                                        {props.children}
                                    </Animated.View>
                                </Pressable>
                            );
                        }
                    }}
                >
                    {() => (
                        <Layout>
                            <Kupony/>
                        </Layout>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="Novinky"
                    options={{
                        tabBarLabel: getText('navigation.news'),
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Image
                                    source={news}
                                    style={{
                                        width: 35,
                                        height: 35,
                                        opacity: focused ? 1 : 0.7,
                                        tintColor: focused ? 'rgba(185, 28, 28, 1)' : 'rgba(185, 28, 28, 0.65)',
                                    }}
                                    resizeMode="contain"
                                    fadeDuration={0}
                                />
                            );
                        },
                        tabBarButton: (props) => {
                            const scaleAnim = useRef(new Animated.Value(1)).current;

                            useEffect(() => {
                                return () => {
                                    scaleAnim.stopAnimation();
                                    scaleAnim.setValue(1);
                                };
                            }, []);

                            const onPressIn = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.timing(scaleAnim, {
                                    toValue: 0.85,
                                    duration: 100,
                                    useNativeDriver: true
                                }).start();
                            };

                            const onPressOut = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.spring(scaleAnim, {
                                    toValue: 1,
                                    tension: 400,
                                    friction: 8,
                                    useNativeDriver: true
                                }).start();
                            };

                            return (
                                <Pressable
                                    accessibilityRole={props.accessibilityRole}
                                    accessibilityState={props.accessibilityState}
                                    onPress={props.onPress}
                                    onPressIn={(e) => {
                                        onPressIn(e);
                                        props.onPressIn && props.onPressIn(e);
                                    }}
                                    onPressOut={(e) => {
                                        onPressOut(e);
                                        props.onPressOut && props.onPressOut(e);
                                    }}
                                    style={props.style}
                                >
                                    <Animated.View style={{
                                        transform: [{ scale: scaleAnim }],
                                    }}>
                                        {props.children}
                                    </Animated.View>
                                </Pressable>
                            );
                        }
                    }}
                >
                    {() => (
                        <Layout>
                            <Novinky/>
                        </Layout>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="Menu"
                    options={{
                        tabBarLabel: getText('navigation.sushi'),
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Image
                                    source={menu}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        opacity: focused ? 1 : 0.7,

                                    }}
                                    resizeMode="contain"
                                    fadeDuration={0}
                                />
                            );
                        },
                        tabBarButton: (props) => {
                            const scaleAnim = useRef(new Animated.Value(1)).current;

                            useEffect(() => {
                                return () => {
                                    scaleAnim.stopAnimation();
                                    scaleAnim.setValue(1);
                                };
                            }, []);

                            const onPressIn = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.timing(scaleAnim, {
                                    toValue: 0.85,
                                    duration: 90,
                                    useNativeDriver: true
                                }).start();
                            };

                            const onPressOut = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.spring(scaleAnim, {
                                    toValue: 1,
                                    tension: 400,
                                    friction: 8,
                                    useNativeDriver: true
                                }).start();
                            };

                            return (
                                <Pressable
                                    accessibilityRole={props.accessibilityRole}
                                    accessibilityState={props.accessibilityState}
                                    onPress={props.onPress}
                                    onPressIn={(e) => {
                                        onPressIn(e);
                                        props.onPressIn && props.onPressIn(e);
                                    }}
                                    onPressOut={(e) => {
                                        onPressOut(e);
                                        props.onPressOut && props.onPressOut(e);
                                    }}
                                    style={props.style}
                                >
                                    <Animated.View style={{
                                        transform: [{ scale: scaleAnim }],
                                    }}>
                                        {props.children}
                                    </Animated.View>
                                </Pressable>
                            );
                        }
                    }}
                >
                    {() => (
                        <Layout>
                            <Menu/>
                        </Layout>
                    )}
                </Tab.Screen>

                {/* UPRAVENÉ VÍCE TAB - klíčová změna je v handlePress */}
                <Tab.Screen
                    name="Více"
                    options={{
                        tabBarLabel: getText('navigation.more'),
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Image
                                    source={moreIcon}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        opacity: focused ? 1 : 0.7,
                                        tintColor: focused ? 'rgba(185, 28, 28, 1)' : 'rgba(185, 28, 28, 0.65)',
                                    }}
                                    resizeMode="contain"
                                    fadeDuration={0}
                                />
                            );
                        },
                        tabBarButton: (props) => {
                            const scaleAnim = useRef(new Animated.Value(1)).current;

                            useEffect(() => {
                                return () => {
                                    scaleAnim.stopAnimation();
                                    scaleAnim.setValue(1);
                                };
                            }, []);

                            const onPressIn = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.timing(scaleAnim, {
                                    toValue: 0.85,
                                    duration: 90,
                                    useNativeDriver: true
                                }).start();
                            };

                            const onPressOut = (e: any) => {
                                scaleAnim.stopAnimation();
                                Animated.spring(scaleAnim, {
                                    toValue: 1,
                                    tension: 400,
                                    friction: 8,
                                    useNativeDriver: true
                                }).start();
                            };

                            // KLÍČOVÁ ZMĚNA: otevři hamburger menu
                            const handlePress = () => {
                                setIsHamburgerMenuOpen(true);
                            };

                            return (
                                <Pressable
                                    accessibilityRole={props.accessibilityRole}
                                    accessibilityState={props.accessibilityState}
                                    onPress={handlePress} // Používáme vlastní handler!
                                    onPressIn={(e) => {
                                        onPressIn(e);
                                        props.onPressIn && props.onPressIn(e);
                                    }}
                                    onPressOut={(e) => {
                                        onPressOut(e);
                                        props.onPressOut && props.onPressOut(e);
                                    }}
                                    style={props.style}
                                >
                                    <Animated.View style={{
                                        transform: [{ scale: scaleAnim }],
                                    }}>
                                        {props.children}
                                    </Animated.View>
                                </Pressable>
                            );
                        }
                    }}
                >
                    {() => (
                        <Layout>
                            <View style={{flex: 1}} />
                        </Layout>
                    )}
                </Tab.Screen>

                {/* Skryté obrazovky */}
                <Tab.Screen
                    name="ProfilUzivatele"
                    options={{
                        tabBarButton: () => null,
                    }}
                >
                    {() => (
                        <Layout>
                            <ProfilUzivatele/>
                        </Layout>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="VipNabidky"
                    options={{
                        tabBarButton: () => null,
                    }}
                >
                    {() => (
                        <Layout>
                            <VipNabidky/>
                        </Layout>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="ZiskejNavstevy"
                    options={{
                        tabBarButton: () => null,
                    }}
                >
                    {() => (
                        <Layout>
                            <ZiskejNavstevy/>
                        </Layout>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name={"Rezervace"}
                    options={{
                        tabBarButton: () => null,
                    }}
                >
                    {() => (
                        <Layout>
                            <Rezervace/>
                        </Layout>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name={"JakToFunguje"}
                    options={{
                        tabBarButton: () => null,
                    }}
                >
                    {() => (
                        <Layout>
                            <JakToFunguje/>
                        </Layout>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name={"Kontakt"}
                    options={{
                        tabBarButton: () => null,
                    }}
                >
                    {() => (
                        <Layout>
                            <Kontakt/>
                        </Layout>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name={"Oslavy"}
                    options={{
                        tabBarButton: () => null,
                    }}
                >
                    {() => (
                        <Layout>
                            <Oslavy/>
                        </Layout>
                    )}
                </Tab.Screen>

            </Tab.Navigator>

            {/* Integrovaný HamburgerMenu jako overlay */}
            <IntegratedHamburgerMenu
                isVisible={isHamburgerMenuOpen}
                onClose={() => setIsHamburgerMenuOpen(false)}
                navigation={navigation}
            />
        </>
    );
}

// Styly pro hamburger menu
const hamburgerStyles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    backdropTouchable: {
        flex: 1,
    },
    menuPanel: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: SCREEN_WIDTH * 0.65,
    },
    glassmorphismContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    menuSafeArea: {
        flex: 1,
        paddingTop: SPACING.LG,
    },
    menuScrollView: {
        flex: 1,
        paddingTop: SPACING.MD,
    },
    menuItemsContainer: {
        paddingHorizontal: SPACING.MD,
        paddingBottom: SPACING.XL,
    },
    menuItem: {
        marginBottom: SPACING.MD,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    menuItemGradient: {
        borderRadius: 16,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.LG,
    },
    menuItemText: {
        ...TYPOGRAPHY.BUTTON,
        color: '#ffffff',
        flex: 1,
        marginLeft: SPACING.MD,
        fontWeight: '600',
        fontSize: 14,
    },
    chevronIcon: {
        opacity: 0.8,
    },
});

// PROFESIONÁLNÍ BLUR EFEKT STYLY
const styles = StyleSheet.create({
    blurredTabBar: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },

    // Vícevrstvý "blur" efekt - 4 vrstvy pro maximum realismu
    blurLayer1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        transform: [{ scale: 1.03 }],
        opacity: 0.8,
    },

    blurLayer2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(248, 250, 255, 0.08)',
        transform: [{ scale: 1.02 }],
        opacity: 0.7,
    },

    blurLayer3: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(240, 248, 255, 0.06)',
        transform: [{ scale: 1.01 }],
        opacity: 0.6,
    },

    blurLayer4: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(245, 250, 255, 0.04)',
        opacity: 0.5,
    },

    // Hlavní glassmorphism vrstva - komplexní gradient
    glassmorphismLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 12,
    },

    // Reflexní vrstva pro realistický světelný efekt
    reflectionLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '45%',
        opacity: 0.7,
    },

    // Inner glow efekt
    innerGlow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        opacity: 0.4,
    },

    // Jemný border efekt
    borderEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        shadowColor: 'rgba(255, 255, 255, 0.9)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
    },

    // Dodatečný top highlight pro extra profesionalitu
    topHighlight: {
        position: 'absolute',
        top: 1,
        left: 0,
        right: 0,
        height: 0.5,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        opacity: 0.8,
    },
});