import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../services/storage';
import styles from '../styles';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleCadastrar = async () => {
    if (!nome || !telefone || !cpf || !email || !curso || !password) {
      Alert.alert('ERROR', 'Todos os dados do lutador são obrigatórios.');
      return;
    }

    const newUser = { nome, telefone, cpf, email, curso, password };

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      Alert.alert('SUCCESS', 'Jogador registrado! Retornando ao menu principal.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('ERROR', 'Falha ao salvar no Memory Card.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollCenter}>
        <Text style={styles.gameTitle}>NEW CHALLENGER</Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>NOME</Text>
          <TextInput style={styles.input} placeholder="Ex: Peter Parker" placeholderTextColor="#555" value={nome} onChangeText={setNome} />

          <Text style={styles.label}>E-MAIL</Text>
          <TextInput style={styles.input} placeholder="Ex: peter@avengers.com" placeholderTextColor="#555" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

          <Text style={styles.label}>SENHA</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#555" secureTextEntry value={password} onChangeText={setPassword} />

          <Text style={styles.label}>CPF</Text>
          <TextInput style={styles.input} placeholder="000.000.000-00" placeholderTextColor="#555" keyboardType="numeric" value={cpf} onChangeText={setCpf} />

          <Text style={styles.label}>TELEFONE</Text>
          <TextInput style={styles.input} placeholder="(00) 00000-0000" placeholderTextColor="#555" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />

          <Text style={styles.label}>CURSO</Text>
          <TextInput style={styles.input} placeholder="Ex: DSM4" placeholderTextColor="#555" value={curso} onChangeText={setCurso} />
        </View>

        <View style={styles.actionButtonsForm}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleCadastrar}>
            <Text style={styles.btnText}>SALVAR E VOLTAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}