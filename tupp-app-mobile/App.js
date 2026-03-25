import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import Ruta from "./components/Ruta";
import config from "./data/config.json";
import { guardarRutas, cargarRutas } from "./lib/storage";
import { INITIAL_DATA } from "./data/rutas";
import { toggleAccionable, agregarNuevaMeta, eliminarMeta, editarMeta } from "./services/MetaService";

export default function App() {
  const [rutas, setRutas] = useState(INITIAL_DATA);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const inicializar = async () => {
      const datosPersistidos = await cargarRutas();
      if (datosPersistidos) {
        setRutas(datosPersistidos);
      } else {
        setRutas(INITIAL_DATA);
      }
      setCargando(false);
    };
    inicializar();
  }, []);

  useEffect(() => {
    if (!cargando) {
      guardarRutas(rutas);
    }
  }, [rutas]);

  if (cargando) return null;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <StatusBar style={config.modo === "dark" ? "light" : "dark"} />

        <Pressable style={styles.header}>
          <Text style={styles.btnModo}>
            {config.modo === "light" ? "☀️" : "🌕"}
          </Text>
        </Pressable>

        {/* Puedes usar `hydrated` para mostrar spinner mientras cargan datos si lo deseas */}
        {rutas.map((ruta, index) => (
          <Ruta
            key={index}
            ruta={ruta}
            onToggle={toggleAccionable}
            onAgregarMeta={agregarNuevaMeta}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    minHeight: "auto",
  },
  container: {
    alignItems: "center",
    backgroundColor: config.modo === "light" ? "#fff" : "#191b2cff",
    flex: 1,
    justifyContent: "flex-start",
    height: "100%",
    padding: 20,
    paddingBottom: 250,
  },
  header: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
  },
  btnModo: {
    padding: 10,
    backgroundColor: "#474646ff",
    borderRadius: 50,
    marginBottom: 20,
  },
});
