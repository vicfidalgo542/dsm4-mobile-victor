import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, FlatList, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import pokeApi from '../services/pokeApi';
import { getRoster, saveRoster } from '../services/storage';
import styles from '../styles';

export default function AddCharacter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allPokemonList, setAllPokemonList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    pokeApi.get('/pokemon?limit=1000')
      .then(response => setAllPokemonList(response.data.results))
      .catch(() => console.log("Erro ao carregar lista de autocompletar."));
  }, []);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.length > 1) {
      const filtered = allPokemonList
        .filter(p => p.name.includes(text.toLowerCase()))
        .slice(0, 5); 
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const searchPokemon = async (queryToSearch) => {
    const finalQuery = queryToSearch || searchQuery;
    if (!finalQuery) return;
    
    setLoading(true);
    setResults([]);
    setSuggestions([]);
    setSearchQuery(finalQuery);

    try {
      const query = finalQuery.toLowerCase().trim();
      const response = await pokeApi.get(`/pokemon/${query}`);
      setResults([response.data]);
    } catch (error) {
      Alert.alert('NOT FOUND', 'Pokémon não encontrado na base de dados.');
    } finally {
      setLoading(false);
    }
  };

  const addToRoster = async (pokemonData) => {
    try {
      const roster = await getRoster() || [];
      if (roster.find(c => c.pokeId === String(pokemonData.id))) {
        Alert.alert('DUPLICATE', 'Este Pokémon já está na sua equipa!');
        return;
      }

      const types = pokemonData.types.map(t => t.type.name.toUpperCase()).join(' / ');
      const spriteUrl = pokemonData.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default 
                        || pokemonData.sprites?.front_default;
      
      const cryUrl = pokemonData.cries?.latest || `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonData.id}.ogg`;

      const newCharacter = {
        id: String(Date.now()), 
        pokeId: String(pokemonData.id),
        name: pokemonData.name.toUpperCase(),
        description: `TYPE: ${types}`,
        isFavorite: false,
        idleFrames: spriteUrl ? [{ uri: spriteUrl }] : [require('../../assets/icon.png')],
        cryUrl: cryUrl
      };

      await saveRoster([...roster, newCharacter]);
      Alert.alert('SUCCESS', 'Captura bem sucedida!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('ERROR', 'Falha ao salvar no Memory Card.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.formContainer}>
      <Text style={styles.characterName}>{item.name.toUpperCase()}</Text>
      <Text style={styles.characterDesc}>DEX: #{item.id}</Text>
      <Image source={{ uri: item.sprites?.front_default }} style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 10 }} />
      <TouchableOpacity style={[styles.primaryBtn, { marginTop: 10 }]} onPress={() => addToRoster(item)}>
        <Text style={styles.btnText}>+ CATCH POKÉMON</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ImageBackground 
        source={require('../../assets/background/default.jpg')} 
        style={styles.container}
        imageStyle={{ opacity: 0.15 }}
      >
        <View style={styles.headerRow}>
          <Text style={styles.gameTitle}>NEW CHALLENGER</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.logoutText}>CANCEL</Text></TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>SEARCH POKÉDEX</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput 
              style={[styles.input, { flex: 1, marginRight: 10 }]} 
              placeholder="Ex: mewtwo..."
              placeholderTextColor="#555"
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
            <TouchableOpacity style={[styles.primaryBtn, { marginBottom: 0, padding: 10 }]} onPress={() => searchPokemon(searchQuery)}>
              <Text style={styles.btnText}>SEARCH</Text>
            </TouchableOpacity>
          </View>

          {suggestions.length > 0 && (
            <View style={{ backgroundColor: '#1E1E1E', borderWidth: 2, borderColor: '#FBC02D', marginTop: 5 }}>
              {suggestions.map((sug) => (
                <TouchableOpacity key={sug.name} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#333' }} onPress={() => searchPokemon(sug.name)}>
                  <Text style={{ color: '#FFF', fontFamily: 'monospace', textTransform: 'uppercase' }}>{sug.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FBC02D" style={{ marginTop: 50 }} />
        ) : (
          <FlatList 
            data={results}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={[styles.selectText, { marginTop: 50 }]}>AWAITING INPUT</Text>}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}