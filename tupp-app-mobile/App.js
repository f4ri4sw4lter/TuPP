import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CONFIG from "./data/config.js";
import PerfilUsuario from "./pages/PerfilUsuario";
import Configuracion from "./pages/Configuracion";

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [estaConfigurado, setEstaConfigurado] = useState(false);
  const [configuracion, setConfiguracion] = useState({
    nombre: "",
    rama: "",
    foto: null,
    modo: "light",
  });
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);

  useEffect(() => {
    const cargarConfiguracion = async () => {
      try {
        const configuracionGuardada =
          await AsyncStorage.getItem("configuracion");
        if (configuracionGuardada) {
          const config = JSON.parse(configuracionGuardada);
          setConfiguracion({
            nombre: config.nombre || "",
            rama: config.rama || "",
            foto: config.foto || null,
            modo: config.modo || "light",
          });
          setEstaConfigurado(true);
        }
      } catch (error) {
        console.error("Error al cargar la configuración:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarConfiguracion();
  }, []);

  if (cargando) return null;

  const handleConfigurationSaved = () => {
    setEstaConfigurado(true);
    setMostrarConfiguracion(false);
    const cargarConfiguracion = async () => {
      try {
        const configuracionGuardada =
          await AsyncStorage.getItem("configuracion");
        if (configuracionGuardada) {
          const config = JSON.parse(configuracionGuardada);
          setConfiguracion({
            nombre: config.nombre || "",
            rama: config.rama || "",
            foto: config.foto || null,
            modo: config.modo || "light",
          });
        }
      } catch (error) {
        console.error("Error al cargar la configuración:", error);
      }
    };
    cargarConfiguracion();
  };

  const handleGoToConfiguration = () => {
    setMostrarConfiguracion(true);
  };

  const handleGoBack = () => {
    setMostrarConfiguracion(false);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style={configuracion.modo === "dark" ? "light" : "dark"} />
      {mostrarConfiguracion ? (
        <Configuracion
          onConfigurationSaved={handleConfigurationSaved}
          isInitialSetup={!estaConfigurado}
          onGoBack={handleGoBack}
        />
      ) : estaConfigurado ? (
        <PerfilUsuario 
          onGoToConfiguration={handleGoToConfiguration}
          configuracion={configuracion}
          setConfiguracion={setConfiguracion}
        />
      ) : (
        <Configuracion
          onConfigurationSaved={handleConfigurationSaved}
          isInitialSetup={true}
        />
      )}
    </SafeAreaProvider>
  );
}
