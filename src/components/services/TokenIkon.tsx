import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';


export const TokenIcon = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <Animated.View style={{ transform: [{ rotateY: spin }] }}>
            <Svg height="24" width="24" viewBox="0 0 24 24">
                <Circle cx="12" cy="12" r="10" fill="#FFD700" stroke="white" strokeWidth="1" />
                <SvgText
                    x="12"
                    y="16"
                    fontSize="14"
                    fontWeight="bold"
                    fill="white"
                    textAnchor="middle"
                >
                    T
                </SvgText>
            </Svg>
        </Animated.View>
    );
};