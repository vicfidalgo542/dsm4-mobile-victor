import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../services/storage';
import styles from '../styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('INSERT COIN', 'Preencha o e-mail e a senha para jogar.');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === email && user.password === password) {
          // Login bem sucedido
          navigation.replace('Main');
        } else {
          Alert.alert('GAME OVER', 'E-mail ou senha incorretos.');
        }
      } else {
        Alert.alert('NO SAVE DATA', 'Nenhum jogador encontrado. Crie uma conta primeiro.');
      }
    } catch (error) {
      Alert.alert('ERROR', 'Falha ao acessar o Memory Card.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.titleGigante}>PokeHub DSM4</Text>
        <Text style={styles.gameTitle}>Pick your team!</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>PLAYER E-MAIL</Text>
          <TextInput 
            style={styles.input} 
            placeholder="ash@pallet.com"
            placeholderTextColor="#555"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••"
            placeholderTextColor="#555"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.actionButtonsForm}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
            <Text style={styles.btnText}>PRESS START (ENTRAR)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.btnText}>NEW CHALLENGER (CADASTRAR)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}