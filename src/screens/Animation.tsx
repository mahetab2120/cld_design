import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Easing, Image, ImageBackground, StyleSheet, View} from 'react-native';
import Images from '../components/Images';

const Animation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    startAnimation();
    startShakeAnimation();
  }, []);

  const startShakeAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const interpolatedRotateAnimation = shakeAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  });

  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
    Animated.sequence([
      // Phase 1: Move up
      Animated.timing(translateY, {
        toValue: -200, // Adjust as needed
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      // Phase 3: Move down
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])).start();
    Animated.loop(
        Animated.timing(rotate, {
          toValue: 1,
          duration: 1000, // Duration for one full rotation
          easing: Easing.linear,
          useNativeDriver: true,
        })
    ).start();
  };

  const eclipseTransformStyle = {
    transform: [
      { translateY: translateY },
      {
        rotate: rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <ImageBackground source={Images.ic_football_ground} style={styles.container}>
      <Animated.View
          style={[
            eclipseTransformStyle,
            styles.footballMain
          ]}>
        <Image source={Images.ic_football} style={styles.tennisImage} />
      </Animated.View>

      <Image source={Images.ic_ronaldo} style={styles.handsImage} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footballMain:{
    // position:'absolute',
    zIndex:1,
    left:40,
    top:50,
    // backgroundColor:'red',
  },
  handsImage: {
    width: 350,
    height: 500,
  },
  tennisImage: {
    width: 150,
    height: 150,
  },
});

export default Animation;
