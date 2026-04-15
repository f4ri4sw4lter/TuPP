import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
  const [conf, setConf] = useState(config);
  const [cargando, setCargando] = useState(true);
  const insets = useSafeAreaInsets();

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

  // --- WRAPPERS DE LOS SERVICIOS (Iguales a los que tenías) ---
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
      <StatusBar style={"dark"} />

      <View style={[styles.head, { paddingTop: insets.top + 10 }]}>
        <MaterialCommunityIcons
          name="fleur-de-lis"
          size={36}
          color="#8c30b1ff"
        />
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          NOMBRE APELLIDO
        </Text>
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
        <Menu rutaActual={rutaActual} setRutaActual={setRutaActual} onGoToConfiguration={onGoToConfiguration} />
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
    justifyContent: "center",
    paddingBottom: 15,
    backgroundColor: "#161b22ff",
  },
  container: {
    padding: 20,
  },
});
