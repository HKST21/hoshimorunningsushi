import { useFocusEffect } from '@react-navigation/native';
import { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import designSystem from '../constants/globalStyles';

export function useFadeBetweenTabs() {
    const fadeOpacity = useRef(new Animated.Value(designSystem.animations.fadeBetweenScreens.animation.opacity[0])).current;

    useFocusEffect(() => {

        fadeOpacity.setValue(designSystem.animations.fadeBetweenScreens.animation.opacity[0]);

        // Spustí se při každém "focus" na tab screen
        Animated.timing(fadeOpacity, {
            toValue: designSystem.animations.fadeBetweenScreens.animation.opacity[1],
            duration: designSystem.animations.fadeBetweenScreens.duration,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    });

    return {
        opacity: fadeOpacity,
    };
}