import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Pressable,
  Modal,
} from "react-native";
import Meta from "./Meta";
import AgregarMeta from "./AgregarMeta";

export default function Ruta({ ruta, onToggle, onAgregarMeta }) {
  const [abierto, setAbierto] = useState(false);

  const totalAccionablesRuta = ruta.metas.reduce((acc, meta) => acc + meta.accionables.length, 0);
  const completadosRuta = ruta.metas.reduce((acc, meta) => 
    acc + meta.accionables.filter(a => a.checked).length, 0
  );
  const progresoRuta = totalAccionablesRuta > 0 ? (completadosRuta / totalAccionablesRuta) * 100 : 0;

  const toggleDropdown = () => {
    // Esto hace que el cambio de altura sea fluido
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAbierto(!abierto);
  };

  useEffect(() => {}, []);

  return (
    <View style={[styles.card, { backgroundColor: ruta.color || "#fff" }]}>
      <TouchableOpacity
        style={[styles.header, { backgroundColor: ruta.color || "#fff" }]}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={styles.titulo}>RUTA DE {ruta.titulo}</Text>
        <Text style={styles.icono}>{abierto ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {abierto && (
        <View style={styles.listaMetas}>
          {ruta.metas.map((meta, index) => (
            <Meta
              key={index}
              titulo={meta.titulo}
              accionables={meta.accionables}
              onToggle={onToggle}
            />
          ))}

          <AgregarMeta rutaId={ruta.id} onConfirmar={onAgregarMeta} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    margin: 10,
    borderRadius: 8,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 3,
    overflow: "hidden", // Importante para mantener los bordes redondeados
    borderColor: "#615e5eff",
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    backgroundColor: "#615e5eff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  icono: {
    color: "#2e2d2dff",
    fontSize: 12,
  },
  listaMetas: {
    borderTopColor: "#615e5eff",
    borderTopWidth: 1,
    margin: 0,
    padding: 10,
  },
});
