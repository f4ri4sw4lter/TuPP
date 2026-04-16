import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Ruta from "../components/Card/Ruta";
import Menu from "../components/Menu";
import config from "../data/config";
import { guardarRutas, cargarRutas } from "../lib/storage";
import { INITIAL_DATA } from "../data/rutas";
import {
  agregarNuevaMeta,
  editarMeta,
  eliminarMeta,
} from "../services/MetaService";
import {
  agregarAccionable,
  toggleAccionable,
  editarAccionable,
  eliminarAccionable,
} from "../services/AccionableService";

export default function PerfilUsuario({ onGoToConfiguration }) {
  const [rutas, setRutas] = useState(INITIAL_DATA);
  const [rutaActual, setRutaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [configuracion, setConfiguracion] = useState();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const inicializar = async () => {
      const configuracion = await AsyncStorage.getItem("configuracion");
      setConfiguracion(JSON.parse(configuracion));
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

  // --- WRAPPERS DE LOS SERVICIOS ---
  const handleToggle = (rutaId, metaId, accionableId) =>
    setRutas(toggleAccionable(rutas, rutaId, metaId, accionableId));
  const handleNuevoAccionable = (rutaId, metaId, tituloAcc) =>
    setRutas(agregarAccionable(rutas, rutaId, metaId, tituloAcc));
  const handleEditarAccionable = (rutaId, metaId, accId, texto) =>
    setRutas(editarAccionable(rutas, rutaId, metaId, accId, texto));
  const handleEliminarAccionable = (rutaId, metaId, accId) =>
    setRutas(eliminarAccionable(rutas, rutaId, metaId, accId));
  const handleNuevaMeta = (rutaId, nuevoTitulo) =>
    setRutas(agregarNuevaMeta(rutas, rutaId, nuevoTitulo));
  const handleEditarMeta = (rutaId, metaId, nuevoTitulo) =>
    setRutas(editarMeta(rutas, rutaId, metaId, nuevoTitulo));
  const handleEliminarMeta = (rutaId, metaId) =>
    setRutas(eliminarMeta(rutas, rutaId, metaId));

  if (cargando) return null;

  return (
    <View style={[styles.mainWrapper, { backgroundColor: "#0D1117" }]}>
      <View style={[styles.head, { paddingTop: insets.top + 10 }]}>
        
        <View style={styles.headComponent}>
          <MaterialCommunityIcons
            name="fleur-de-lis"
            size={36}
            color="#8c30b1ff"
          />
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            {configuracion.rama}
          </Text>
        </View>

        <View style={styles.headComponent}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            {configuracion.nombre}
          </Text>
          {configuracion.foto ? (
            <Image source={{ uri: configuracion.foto }} style={styles.fotoPerfil} />
          ) : (
            <FontAwesome
              name="user-circle"
              size={120}
              color="#558DFF"
              style={styles.foto}
            />
          )}
        </View>

      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          {rutas
            .filter((ruta) => ruta.id === rutaActual)
            .map((ruta) => (
              <Ruta
                key={ruta.id}
                ruta={ruta}
                onToggle={handleToggle}
                onAgregarMeta={handleNuevaMeta}
                onEditarMeta={handleEditarMeta}
                onEliminarMeta={handleEliminarMeta}
                onAgregarAccionable={handleNuevoAccionable}
                onEditarAccionable={handleEditarAccionable}
                onEliminarAccionable={handleEliminarAccionable}
              />
            ))}
        </View>
      </ScrollView>

      <View
        style={{ paddingBottom: insets.bottom, backgroundColor: "#161b22ff" }}
      >
        <Menu
          rutaActual={rutaActual}
          setRutaActual={setRutaActual}
          onGoToConfiguration={onGoToConfiguration}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#161b22ff",
  },
  headComponent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  fotoPerfil: {
    width: 48,
    height: 48,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  container: {
    padding: 20,
  },
});
