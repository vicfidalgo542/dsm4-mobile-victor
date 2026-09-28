import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { getRoster, saveRoster } from '../services/storage';
import { initialRoster } from '../data/characters';
import CharacterSprite from '../components/CharacterSprite';
import styles from '../styles';

export default function Main() {
  const [roster, setRoster] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    let bgMusic;
    async function playTheme() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/theme.mp3'),
          { isLooping: true, volume: 0.3 }
        );
        bgMusic = sound;
        await bgMusic.playAsync();
      } catch (error) {
        // Ignora silenciosamente se o ficheiro falhar
      }
    }
    
    if (isFocused) {
      playTheme();
    }

    return () => {
      if (bgMusic) bgMusic.unloadAsync();
    };
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      loadRoster();
    }
  }, [isFocused]);

  const loadRoster = async () => {
    let localRoster = await getRoster();
    if (!localRoster || localRoster.length === 0) {
      localRoster = initialRoster;
      await saveRoster(localRoster);
    }
    setRoster(localRoster);
    
    if (currentIndex >= localRoster.length) {
      setCurrentIndex(Math.max(0, localRoster.length - 1));
    }
  };

  const handleNext = () => currentIndex < roster.length - 1 && setCurrentIndex(currentIndex + 1);
  const handlePrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  const currentChar = roster[currentIndex];

  if (!currentChar) return <View style={styles.container}><Text style={styles.loadingText}>LOADING...</Text></View>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ImageBackground 
        source={require('../../assets/background/default.jpg')} 
        style={styles.container} 
        imageStyle={{ opacity: 0.15 }} 
      >
        <View style={styles.headerRow}>
          <Text style={styles.gameTitle}>POKÉMON HUB</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.selectText}>SELECT POKÉMON</Text>

        <View style={styles.showcaseArea}>
          <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0}>
            <Text style={[styles.arrow, currentIndex === 0 && styles.arrowDisabled]}>◀</Text>
          </TouchableOpacity>

          <View style={styles.characterCenter}>
            <Text style={styles.characterName}>{currentChar.name}</Text>
            
            <CharacterSprite 
              idleFrames={currentChar.idleFrames} 
              cryUrl={currentChar.cryUrl} 
            />
            
            <Text style={styles.characterDesc} numberOfLines={2}>
              {currentChar.description}
            </Text>
          </View>

          <TouchableOpacity onPress={handleNext} disabled={currentIndex === roster.length - 1}>
            <Text style={[styles.arrow, currentIndex === roster.length - 1 && styles.arrowDisabled]}>▶</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('CharacterDetail', { character: currentChar })}>
            <Text style={styles.btnText}>VIEW STATS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('AddCharacter')}>
            <Text style={styles.btnText}>+ CATCH NEW</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}