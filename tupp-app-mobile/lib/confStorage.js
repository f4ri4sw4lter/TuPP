import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'config';

export const guardarConfig = async (config) => {
  try {
    const jsonValue = JSON.stringify(config);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Error guardando datos:", e);
  }
};

export const cargarConfig = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error cargando datos:", e);
    return null;
  }
};