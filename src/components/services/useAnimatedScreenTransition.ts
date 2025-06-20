// /services/useAnimatedScreenTransition.ts

import React, { useRef } from "react";
import { Animated, Easing } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import designSystem from "../constants/globalStyles";

export function useAnimatedScreenTransition() {
    const animatedOpacity = useRef(new Animated.Value(designSystem.transitions.screen.animation.opacity[0])).current;
    const animatedScale = useRef(new Animated.Value(designSystem.transitions.screen.animation.scale[0])).current;

    useFocusEffect(
        React.useCallback(() => {
            // Reset values
            animatedOpacity.setValue(designSystem.transitions.screen.animation.opacity[0]);
            animatedScale.setValue(designSystem.transitions.screen.animation.scale[0]);

            // Start animation
            Animated.parallel([
                Animated.timing(animatedOpacity, {
                    toValue: designSystem.transitions.screen.animation.opacity[1],
                    duration: designSystem.transitions.screen.duration,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedScale, {
                    toValue: designSystem.transitions.screen.animation.scale[1],
                    duration: designSystem.transitions.screen.duration,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]).start();
        }, [])
    );

    // Vracíme přímo stylové objekty které napojíš do Animated.View
    return {
        opacity: animatedOpacity,
        transform: [{ scale: animatedScale }],
    };
}
