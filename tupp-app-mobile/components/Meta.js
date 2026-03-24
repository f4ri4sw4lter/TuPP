import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import Accionable from './Accionable';

export default function Meta({titulo, accionables}) {

    const [abierto, setAbierto] = useState(false);
    const [anchoProgreso, setAnchoProgreso] = useState('0%');

    const toggleDropdown = () => {
    // Esto hace que el cambio de altura sea fluido
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAbierto(!abierto);
    };

    useEffect(() => {
        var completados = accionables.filter(a => a.checked).length;
        var total = accionables.length;
        var progreso = total > 0 ? completados / total : 0;
        var progresoTotal = Math.min(Math.max(progreso, 0), 1) * 100;
        setAnchoProgreso(`${progresoTotal}%`);
    }, []);

    return (
        <View 
            style={[
                styles.card, 
                { backgroundColor: '#fff' }
        ]}>

            <TouchableOpacity style={styles.header} onPress={toggleDropdown} activeOpacity={0.8}>
                <View style={styles.headerTexto}>
                    <Text style={styles.titulo}>{titulo}</Text>
                    {/* Barra de progreso */}
                    <View style={styles.contenedorBarra}>
                    <View style={[styles.barraRelleno, { width: anchoProgreso }]} />
                    </View>
                </View>
                <Text style={styles.icono}>{abierto ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {abierto && (
                accionables.map((accionable, index) => (
                    <Accionable key={index} titulo={accionable.titulo} checkedInicial={accionable.checked} />
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
card: {
    margin: 10,
    borderRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  headerTexto: {
    flex: 1, // Para que ocupe el espacio sobrante antes del icono
    marginRight: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contenedorBarra: {
    height: 6,
    backgroundColor: '#e0e0e0', // Fondo gris de la barra
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  barraRelleno: {
    height: '100%',
    backgroundColor: '#4CAF50', // Color verde del progreso
  },
  icono: {
    fontSize: 12,
    color: '#000000ff',
  },
  contenido: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
});
