import { Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const Loader: React.FC = () => {
  const progress = useSharedValue<number>(1);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${2 * Math.PI * progress.value}rad` }],
    };
  }, []);

  useEffect(() => {
    progress.value = withDelay(
      1000,
      withRepeat(withTiming(0, { duration: 2000 }), -1, true)
    );

    return () => {
      progress.value = 0;
    };
  }, []);

  return (
    <Animated.View style={animationStyle}>
      <Image
        style={styles.image}
        source={require("../../assets/imgs/icon.png")}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default Loader;
