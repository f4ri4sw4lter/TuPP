import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import Ruta from "./components/Ruta";
import Menu from "./components/Menu";
import config from "./data/config.json";
import { guardarRutas, cargarRutas } from "./lib/storage";
import { INITIAL_DATA } from "./data/rutas";
import {
  agregarNuevaMeta,
  editarMeta,
  eliminarMeta,
} from "./services/MetaService";
import {
  agregarAccionable,
  toggleAccionable,
  editarAccionable,
  eliminarAccionable,
} from "./services/AccionableService";

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

  // --- WRAPPERS DE LOS SERVICIOS ---

  const handleToggle = (rutaId, metaId, accionableId) => {
    const nuevasRutas = toggleAccionable(rutas, rutaId, metaId, accionableId);
    setRutas(nuevasRutas);
  };

  const handleNuevoAccionable = (rutaId, metaId, tituloAcc) => {
    const nuevasRutas = agregarAccionable(rutas, rutaId, metaId, tituloAcc);
    setRutas(nuevasRutas);
  };

  const handleEditarAccionable = (rutaId, metaId, accId, texto) => {
    setRutas(editarAccionable(rutas, rutaId, metaId, accId, texto));
  };

  const handleEliminarAccionable = (rutaId, metaId, accId) => {
    setRutas(eliminarAccionable(rutas, rutaId, metaId, accId));
  };

  const handleNuevaMeta = (rutaId, nuevoTitulo) => {
    const nuevasRutas = agregarNuevaMeta(rutas, rutaId, nuevoTitulo);
    setRutas(nuevasRutas);
  };

  const handleEditarMeta = (rutaId, metaId, nuevoTitulo) => {
    const nuevasRutas = editarMeta(rutas, rutaId, metaId, nuevoTitulo);
    setRutas(nuevasRutas);
  };

  const handleEliminarMeta = (rutaId, metaId) => {
    const nuevasRutas = eliminarMeta(rutas, rutaId, metaId);
    setRutas(nuevasRutas);
  };

  if (cargando) return null;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <StatusBar style={config.modo === "dark" ? "light" : "dark"} />

        <View style={styles.header}>
          <Image
            source={require("./assets/icon.png")}
            style={styles.logo}
          />
        </View>

        {rutas.map((ruta, index) => (
          <Ruta
            key={index}
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
      <Menu />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    minHeight: "auto",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#0D1117",
    flex: 1,
    justifyContent: "flex-start",
    height: "100%",
    padding: 20,
    paddingBottom: 250,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  btnModo: {
    padding: 10,
    backgroundColor: "#474646ff",
    borderRadius: 50,
    marginBottom: 20,
  },
  footer: {
    position: "relative",
    padding: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
  },
  info: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});
