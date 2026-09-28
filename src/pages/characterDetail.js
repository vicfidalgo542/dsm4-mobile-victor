import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import pokeApi from '../services/pokeApi';
import { getRoster, saveRoster } from '../services/storage';
import CharacterSprite from '../components/CharacterSprite';
import styles from '../styles';

const TYPE_BACKGROUNDS = {
  normal: require('../../assets/background/default.jpg'), 
  fire: require('../../assets/background/fire.jpg'),
  water: require('../../assets/background/water.jpg'),
  grass: require('../../assets/background/grass.jpg'),
  electric: require('../../assets/background/electric.jpg'), 
  ice: require('../../assets/background/water.jpg'),        
  fighting: require('../../assets/background/fighting.jpg'),
  poison: require('../../assets/background/poison.jpg'),
  ground: require('../../assets/background/ground.jpg'),
  flying: require('../../assets/background/flying.jpg'),
  psychic: require('../../assets/background/psychic.jpg'),
  bug: require('../../assets/background/bug.jpg'),
  rock: require('../../assets/background/rock.jpg'),
  ghost: require('../../assets/background/ghost.jpg'),
  dragon: require('../../assets/background/dragon.jpg'),
  dark: require('../../assets/background/ghost.jpg'),
  steel: require('../../assets/background/rock.jpg'),
  fairy: require('../../assets/background/default.jpg'),   
  default: require('../../assets/background/default.jpg'),
};

export default function CharacterDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { character } = route.params;

  const [loadingExtra, setLoadingExtra] = useState(true);
  const [dexEntry, setDexEntry] = useState('');
  const [evolutionData, setEvolutionData] = useState('Nenhuma evolução registada.');

  const getPrimaryType = () => {
    if (!character.description) return TYPE_BACKGROUNDS['default'];
    const typePart = character.description.replace('TYPE: ', '').split(' / ')[0].toLowerCase().trim();
    return TYPE_BACKGROUNDS[typePart] ? TYPE_BACKGROUNDS[typePart] : TYPE_BACKGROUNDS['default'];
  };

  useEffect(() => {
    fetchExtraData();
  }, []);

  const fetchExtraData = async () => {
    try {
      const speciesRes = await pokeApi.get(`/pokemon-species/${character.pokeId}`);
      
      const flavor = speciesRes.data.flavor_text_entries.find(f => f.language.name === 'en');
      if (flavor) {
        setDexEntry(flavor.flavor_text.replace(/[\n\f\r]/g, ' '));
      } else {
        setDexEntry('Sem registo de dados na National Dex.');
      }

      const evoUrl = speciesRes.data.evolution_chain.url;
      const evoRes = await axios.get(evoUrl);
      
      const chain = evoRes.data.chain;
      let evoText = `Forma Base: ${chain.species.name.toUpperCase()}\n`;
      
      if (chain.evolves_to.length > 0) {
        const nextEvo = chain.evolves_to[0];
        const minLevel = nextEvo.evolution_details[0]?.min_level;
        const levelText = minLevel ? `(Nível ${minLevel})` : '(Requisito Especial)';
        evoText += `Evolui para: ${nextEvo.species.name.toUpperCase()} ${levelText}`;
      } else {
        evoText = 'Este Pokémon não evolui.';
      }
      setEvolutionData(evoText);

    } catch (error) {
      setDexEntry('Não foi possível aceder à Pokedex Network.');
      setEvolutionData('Erro ao ler registo fóssil.');
    } finally {
      setLoadingExtra(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'RELEASE POKÉMON',
      `Deseja libertar ${character.name} na natureza?`,
      [
        { text: 'CANCEL', style: 'cancel' },
        { 
          text: 'RELEASE', 
          style: 'destructive',
          onPress: async () => {
            const roster = await getRoster();
            const filteredRoster = roster.filter(c => c.pokeId !== character.pokeId);
            await saveRoster(filteredRoster);
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ImageBackground 
        source={getPrimaryType()} 
        style={styles.container}
        imageStyle={{ opacity: 0.25 }}
      >
        <ScrollView contentContainerStyle={styles.scrollCenter}>
          <View style={styles.headerRow}>
            <Text style={styles.gameTitle}>POKÉDEX DATA</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.logoutText}>BACK</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.characterName, { marginTop: 20 }]}>{character.name}</Text>
          
          <CharacterSprite 
            idleFrames={character.idleFrames} 
            cryUrl={character.cryUrl}
          />

          <View style={styles.formContainer}>
            <Text style={styles.label}>NATIONAL DEX ENTRY</Text>
            {loadingExtra ? (
              <ActivityIndicator size="small" color="#FBC02D" />
            ) : (
              <Text style={{ color: '#FFF', fontFamily: 'monospace', lineHeight: 20 }}>{dexEntry}</Text>
            )}

            <Text style={[styles.label, { marginTop: 25 }]}>EVOLUTION CHAIN</Text>
            {loadingExtra ? (
              <ActivityIndicator size="small" color="#43A047" />
            ) : (
              <Text style={{ color: '#FBC02D', fontFamily: 'monospace', fontWeight: 'bold' }}>{evolutionData}</Text>
            )}
            
            <Text style={[styles.label, { marginTop: 25 }]}>LOCAL DATA</Text>
            <Text style={{ color: '#43A047', fontFamily: 'monospace' }}>{character.description}</Text>
          </View>

          <View style={styles.actionButtonsForm}>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: '#E53935', marginTop: 10 }]} onPress={handleDelete}>
              <Text style={styles.btnText}>RELEASE POKÉMON</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}