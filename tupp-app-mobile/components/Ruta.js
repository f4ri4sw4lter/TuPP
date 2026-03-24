import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import Meta from './Meta';

export default function Ruta({titulo, colorFondo, metas}) {

    const [abierto, setAbierto] = useState(false);

    const toggleDropdown = () => {
    // Esto hace que el cambio de altura sea fluido
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAbierto(!abierto);
    };

    useEffect(() => {
    }, []);

    return (
        <View 
            style={[
                styles.card, 
                { backgroundColor: colorFondo || '#fff' }
        ]}>
            <TouchableOpacity 
                style={[
                    styles.header,
                    { backgroundColor: colorFondo || '#fff' }
                ]} 
                onPress={toggleDropdown}
                activeOpacity={0.7}
            >
                <Text style={styles.titulo}>RUTA DE {titulo}</Text>
                <Text style={styles.icono}>{abierto ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            <View style={styles.listaMetas}>
            {abierto && (
                metas.map((meta, index) => (
                    <Meta key={index} titulo={meta.titulo} accionables={meta.accionables} />
                ))
            )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    margin: 10,
    borderRadius: 8,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 3,
    overflow: 'hidden', // Importante para mantener los bordes redondeados
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icono: {
    fontSize: 12,
    color: '#020202ff',
  },
  contenido: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  listaMetas: {
    padding: 10,
    margin: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
