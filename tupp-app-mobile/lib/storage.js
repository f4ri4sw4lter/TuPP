import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'rutas';

export const guardarRutas = async (rutas) => {
  try {
    const jsonValue = JSON.stringify(rutas);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Error guardando datos:", e);
  }
};

export const cargarRutas = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error cargando datos:", e);
    return null;
  }
};