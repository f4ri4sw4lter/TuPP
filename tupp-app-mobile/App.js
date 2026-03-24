import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Ruta from './components/Ruta';
import { rutas } from './data/rutas';
import config from './data/config.json';

export default function App() {

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style={config.modo === "dark" ? "dark" : "light"} />

      <Pressable 
        style={styles.header}
      >
        <Text style={styles.btnModo}>{config.modo === 'light' ? '☀️' : '🌕'}</Text>
      </Pressable>

      {rutas.map((ruta, index) => (
        <Ruta
          key={index}
          titulo={ruta.titulo} 
          colorFondo={ruta.color}
          metas={ruta.metas}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.modo === 'light' ? '#fff' : '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
  },
  btnModo: {
    padding: 10,
    backgroundColor: '#474646ff',
    borderRadius: 50,
    marginBottom: 20,
  },
});
