import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Main from './pages/main';
import CharacterDetail from './pages/characterDetail';
import AddCharacter from './pages/addCharacter';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      {/* headerShown: false remove a barra superior padrão, deixando o visual mais imersivo */}
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetail} />
        <Stack.Screen name="AddCharacter" component={AddCharacter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}