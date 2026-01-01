// StartInfoScreen.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./styles";
import { introPages } from "./data";
import IntroPageView from "./IntroPageView";
import { RootStackParamList } from "../../navigation/types";
import { RootRoutes } from "../../navigation/routes";

type Props = NativeStackScreenProps<RootStackParamList, RootRoutes.Intro>;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function StartInfoScreen({ navigation }: Props) {
  const listRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [finishing, setFinishing] = useState(false);

  // Continuous scroll value for animations
  const scrollX = useRef(new Animated.Value(0)).current;

  const lastIndex = introPages.length - 1;

  // progress: 0..n (continuous)
  const progress = useMemo(() => Animated.divide(scrollX, SCREEN_WIDTH), [scrollX]);

  // Prev fades in after first page
  const prevOpacity = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 0.2],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
    [progress]
  );

  // Crossfade Next <-> Get Started near last page
  const nextOpacity = useMemo(
    () =>
      progress.interpolate({
        inputRange: [lastIndex - 0.15, lastIndex],
        outputRange: [1, 0],
        extrapolate: "clamp",
      }),
    [progress, lastIndex]
  );

  const getStartedOpacity = useMemo(
    () =>
      progress.interpolate({
        inputRange: [lastIndex - 0.15, lastIndex],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
    [progress, lastIndex]
  );

  const finishIntro = useCallback(async () => {
    if (finishing) return;
    setFinishing(true);

    try {
      await AsyncStorage.setItem("hasSeenIntro", "1");

      // ✅ safest navigation: hard reset to Auth (no back to Intro)
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (e) {
      setFinishing(false);
    }
  }, [finishing, navigation]);

  const goTo = useCallback((index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
    // setCurrentIndex will be updated reliably in onMomentumScrollEnd
  }, []);

  const onPrev = useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  const onNext = useCallback(() => {
    if (currentIndex === lastIndex) {
      finishIntro();
    } else {
      goTo(currentIndex + 1);
    }
  }, [currentIndex, lastIndex, goTo, finishIntro]);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      setCurrentIndex(index);
    },
    []
  );

  const renderItem = useCallback(({ item }: any) => <IntroPageView page={item} />, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.counter}>
          <Text style={styles.current}>{currentIndex + 1}</Text>
          <Text style={styles.total}>/{introPages.length}</Text>
        </Text>

        <Pressable onPress={finishIntro} hitSlop={10} disabled={finishing}>
          <Text style={styles.skipButton}>Skip</Text>
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.FlatList
          ref={listRef}
          data={introPages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        {/* Left */}
        <View style={styles.bottomSide}>
          <Pressable onPress={onPrev} disabled={currentIndex === 0} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Animated.Text style={[styles.bottomText, { opacity: prevOpacity }]}>
              Prev
            </Animated.Text>
          </Pressable>
        </View>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {introPages.map((_, index) => {
            const inputRange = [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ];

            const width = scrollX.interpolate({
              inputRange,
              outputRange: [6, 22, 6],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.2, 1, 0.2],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={[styles.dot, { width, opacity, backgroundColor: "#17223B" }]}
              />
            );
          })}
        </View>

        {/* Right */}
        <View style={[styles.bottomSide, styles.bottomSideRight]}>
          <Pressable onPress={onNext} hitSlop={10} disabled={finishing}>
            <View style={styles.nextWrap}>
              <Animated.Text style={[styles.nextText, { opacity: nextOpacity }]} numberOfLines={1}>
                Next
              </Animated.Text>

              <Animated.Text
                style={[styles.nextText, styles.nextAbsolute, { opacity: getStartedOpacity }]}
                numberOfLines={1}
              >
                Get Started
              </Animated.Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
