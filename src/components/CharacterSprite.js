import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';

export default function CharacterSprite({ idleFrames, cryUrl }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const handlePress = async () => {
    // Animação de Salto Feliz
    Animated.sequence([
      Animated.timing(bounceAnim, { toValue: -30, duration: 150, useNativeDriver: true }),
      Animated.timing(bounceAnim, { toValue: 0, duration: 150, useNativeDriver: true })
    ]).start();

    // Reprodução do Grito
    if (cryUrl) {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: cryUrl });
        await sound.playAsync();
      } catch (error) {
        console.log("Erro ao reproduzir o cry:", error);
      }
    }
  };

  const frameSource = idleFrames && idleFrames.length > 0 ? idleFrames[0] : require('../../assets/icon.png');

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.spriteContainer, { transform: [{ translateY: bounceAnim }] }]}>
        <Animated.Image source={frameSource} style={styles.sprite} resizeMode="contain" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  spriteContainer: {
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 20,
  },
  sprite: {
    width: 250,
    height: 250,
  }
});