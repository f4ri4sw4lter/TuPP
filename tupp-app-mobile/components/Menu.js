import React, { useState } from "react";
import { Pressable, View, StyleSheet, Text, ScrollView } from "react-native";
import { INITIAL_DATA } from "../data/rutas";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur'; // Para mantener el efecto que traíamos

export default function Accionable({ rutaActual, setRutaActual, onGoToConfiguration }) {
  const [rutas, setRutas] = useState(INITIAL_DATA);

  return (
    // Usamos BlurView como contenedor principal para el efecto Glassmorphism
    <BlurView intensity={80} tint="dark" style={styles.menuContainer}>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {rutas.map((ruta) => (
          <Pressable key={ruta.id} style={styles.icon} onPress={() => setRutaActual(ruta.id)}>
            <Ionicons name={ruta.icono} size={26} color={ruta.id === rutaActual ? ruta.color : "grey"} />
            <Text style={[styles.textIcon, {color: ruta.id === rutaActual ? ruta.color : "grey"}]}>{ruta.titulo}</Text>
          </Pressable>
        ))}
        <Pressable style={styles.icon} onPress={onGoToConfiguration}>
          <FontAwesome name="cog" size={26} color="grey" />
          <Text style={[styles.textIcon, {color: "grey"}]}>Configuración</Text>
        </Pressable>
      </ScrollView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 50,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden", // Importante para el BlurView y bordes
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
  },
  scrollContent: {
    // Aquí es donde aplicamos el flex y el padding del contenido
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24, // Un poco más de espacio abajo para que respire
  },
  icon: {
    alignItems: "center",
    width: 80, // Ancho fijo para que todos los items ocupen lo mismo en el scroll
    marginHorizontal: 10,
  },
  textIcon: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: 'center'
  },
});