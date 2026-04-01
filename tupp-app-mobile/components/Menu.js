import React, { useState } from "react";
import { Pressable, View, StyleSheet, Text, ScrollView } from "react-native";
import { INITIAL_DATA } from "../data/rutas";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Accionable() {
  const [rutas, setRutas] = useState(INITIAL_DATA);

  return (
    <View style={styles.menuContainer}> 
      <ScrollView 
        horizontal={true}                         // Activa el scroll horizontal
        showsHorizontalScrollIndicator={false}    // Esconde la barra de scroll
        contentContainerStyle={styles.scrollContent} // ¡ESTO ES CLAVE!
        bounces={true}                            // Efecto rebote al final
      >
        {rutas.map((ruta) => (
          <Pressable key={ruta.id} style={styles.icon}>
            <Ionicons name={ruta.icono} size={26} color="white" />
            <Text style={styles.textIcon}>{ruta.titulo}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 50,
    backgroundColor: "rgba(26, 35, 50, 0.9)", // Aumenté opacidad por si no tienes Blur
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden", 
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
  },
  scrollContent: {
    // IMPORTANTE: El ScrollView horizontal necesita flexDirection: 'row' AQUÍ
    flexDirection: "row", 
    alignItems: "center",
    paddingHorizontal: 20, // Espacio al inicio y al final del scroll
    paddingTop: 20,
    paddingBottom: 35,    // Espacio extra para el área de "home" en iPhone
    // No pongas width: '100%' aquí, deja que crezca según los hijos
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,             // Ancho fijo para asegurar que el contenido exceda la pantalla
    marginHorizontal: 5,
  },
  textIcon: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: 'center'
  },
});