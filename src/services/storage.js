import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER: '@PokeHub:user',
  ROSTER: '@PokeHub:roster',
};

export const getRoster = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.ROSTER);
  return data ? JSON.parse(data) : null;
};

export const saveRoster = async (roster) => {
  await AsyncStorage.setItem(STORAGE_KEYS.ROSTER, JSON.stringify(roster));
};