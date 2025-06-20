import React, { useEffect, useRef } from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    DimensionValue,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

// Props interface
interface LoadingSkeletonProps {
    isLoading: boolean;
    layout?: 'kupony' | 'menu' | 'profile' | 'custom';
    children: React.ReactNode;
    shimmerColors?: [string, string, string];
    duration?: number;
    borderRadius?: number;
}

// Jednotlivé skeleton komponenty
const SkeletonBox: React.FC<{
    width: DimensionValue;
    height: number;
    borderRadius?: number;
    marginBottom?: number;
    marginTop?: number;
    marginHorizontal?: number;
}> = ({ width, height, borderRadius = 8, marginBottom = 0, marginTop = 0, marginHorizontal = 0 }) => {
    return (
        <View
            style={[
                styles.skeletonBox,
                {
                    width,
                    height,
                    borderRadius,
                    marginBottom,
                    marginTop,
                    marginHorizontal,
                }
            ]}
        />
    );
};

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
                                                             isLoading,
                                                             layout = 'custom',
                                                             children,
                                                             shimmerColors = ['#E1E9EE', '#F2F8FC', '#E1E9EE'],
                                                             duration = 1200,
                                                             borderRadius = 8,
                                                         }) => {
    const shimmerAnimatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isLoading) {
            const shimmerAnimation = Animated.loop(
                Animated.timing(shimmerAnimatedValue, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: false,
                }),
            );
            shimmerAnimation.start();

            return () => {
                shimmerAnimation.stop();
            };
        }
    }, [isLoading, shimmerAnimatedValue, duration]);

    const translateX = shimmerAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-windowWidth, windowWidth],
    });

    // Shimmer overlay komponenta
    const ShimmerOverlay = () => (
        <Animated.View
            style={[
                styles.shimmerContainer,
                { transform: [{ translateX }] }
            ]}
        >
            <LinearGradient
                colors={shimmerColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.shimmerGradient}
            />
        </Animated.View>
    );

    // Layout pro Kupony
    const KuponyLayout = () => (
        <View style={styles.container}>
            {/* Header Image */}
            <View style={styles.skeletonWrapper}>
                <SkeletonBox width={windowWidth} height={240} borderRadius={0} />
                <ShimmerOverlay />
            </View>

            {/* Info Gradient Section */}
            <View style={styles.skeletonWrapper}>
                <SkeletonBox
                    width={windowWidth}
                    height={60}
                    borderRadius={0}
                    marginTop={0}
                />
                <ShimmerOverlay />
            </View>

            {/* Token Container */}
            <View style={styles.skeletonWrapper}>
                <SkeletonBox
                    width={windowWidth - 20}
                    height={50}
                    marginHorizontal={10}
                    marginTop={10}
                />
                <ShimmerOverlay />
            </View>

            {/* Kupony Cards */}
            <View style={styles.cardsContainer}>
                {[1, 2, 3, 4].map((item) => (
                    <View key={item} style={styles.skeletonWrapper}>
                        <SkeletonBox
                            width={windowWidth - 40}
                            height={120}
                            marginBottom={15}
                            marginHorizontal={20}
                        />
                        <ShimmerOverlay />
                    </View>
                ))}
            </View>
        </View>
    );

    // Layout pro Menu
    const MenuLayout = () => (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.skeletonWrapper}>
                <SkeletonBox width={windowWidth} height={200} borderRadius={0} />
                <ShimmerOverlay />
            </View>

            {/* Category Title */}
            <View style={styles.skeletonWrapper}>
                <SkeletonBox
                    width={200}
                    height={30}
                    marginHorizontal={20}
                    marginTop={20}
                    marginBottom={15}
                />
                <ShimmerOverlay />
            </View>

            {/* Menu Items */}
            <View style={styles.cardsContainer}>
                {[1, 2, 3, 4, 5].map((item) => (
                    <View key={item} style={styles.skeletonWrapper}>
                        <SkeletonBox
                            width={windowWidth - 40}
                            height={110}
                            marginBottom={15}
                            marginHorizontal={20}
                        />
                        <ShimmerOverlay />
                    </View>
                ))}
            </View>
        </View>
    );

    // Layout pro Profile
    const ProfileLayout = () => (
        <View style={styles.container}>
            {/* Avatar */}
            <View style={styles.skeletonWrapper}>
                <SkeletonBox
                    width={120}
                    height={120}
                    borderRadius={60}
                    marginHorizontal={(windowWidth - 120) / 2}
                    marginTop={40}
                    marginBottom={20}
                />
                <ShimmerOverlay />
            </View>

            {/* Name */}
            <View style={styles.skeletonWrapper}>
                <SkeletonBox
                    width={200}
                    height={25}
                    marginHorizontal={(windowWidth - 200) / 2}
                    marginBottom={10}
                />
                <ShimmerOverlay />
            </View>

            {/* Info Lines */}
            {[1, 2, 3, 4, 5].map((item) => (
                <View key={item} style={styles.skeletonWrapper}>
                    <SkeletonBox
                        width={windowWidth - 40}
                        height={60}
                        marginHorizontal={20}
                        marginBottom={15}
                    />
                    <ShimmerOverlay />
                </View>
            ))}
        </View>
    );

    const renderLayout = () => {
        switch (layout) {
            case 'kupony':
                return <KuponyLayout />;
            case 'menu':
                return <MenuLayout />;
            case 'profile':
                return <ProfileLayout />;
            default:
                return <View style={styles.container}>{children}</View>;
        }
    };

    if (!isLoading) {
        return <>{children}</>;
    }

    return (
        <View style={styles.container}>
            {renderLayout()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    skeletonWrapper: {
        overflow: 'hidden',
        position: 'relative',
    },
    skeletonBox: {
        backgroundColor: '#E1E9EE',
    },
    shimmerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    shimmerGradient: {
        flex: 1,
        opacity: 0.5,
    },
    cardsContainer: {
        paddingTop: 10,
    },
});

export default LoadingSkeleton;