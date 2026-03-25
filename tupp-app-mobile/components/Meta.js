import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Pressable,
} from "react-native";
import Accionable from "./Accionable";
import AgregarAccionable from "./AgregarAccionable";
import EditarMeta from "./EditarMeta";

export default function Meta({
  titulo,
  accionables,
  onToggle,
  rutaId,
  metaId,
}) {
  const [abierto, setAbierto] = useState(false);
  const [editarMetaVisible, setEditarMetaVisible] = useState(false);

  const toggleDropdown = () => {
    // Esto hace que el cambio de altura sea fluido
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAbierto(!abierto);
  };

  const toggleModalEditarMeta = () => {
    setEditarMetaVisible(true);
  };

  const completados = accionables.filter((a) => a.checked).length;
  const total = accionables.length;
  const progreso = total > 0 ? (completados / total) * 100 : 0;
  const anchoProgreso = `${progreso}%`;

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <View style={styles.headerTexto}>
          <Text style={styles.titulo}>{titulo}</Text>
          <View style={styles.contenedorBarra}>
            {/* Ahora es reactivo al prop 'accionables' */}
            <View style={[styles.barraRelleno, { width: anchoProgreso }]} />
          </View>
        </View>
        <Text style={styles.icono}>{abierto ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {abierto && (
        <View style={styles.contenido}>
          {accionables.map((acc) => (
            <Accionable
              key={acc.id}
              titulo={acc.titulo}
              checked={acc.checked}
              onPress={() => onToggle(rutaId, metaId, acc.id)} // Subimos el evento
            />
          ))}
          <AgregarAccionable />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 3,
    borderRadius: 12,
    elevation: 3,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  headerTexto: {
    flex: 1, // Para que ocupe el espacio sobrante antes del icono
    marginRight: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contenedorBarra: {
    height: 6,
    backgroundColor: "#e0e0e0", // Fondo gris de la barra
    borderRadius: 3,
    width: "100%",
    overflow: "hidden",
  },
  barraRelleno: {
    height: "100%",
    backgroundColor: "#4CAF50", // Color verde del progreso
  },
  icono: {
    fontSize: 12,
    color: "#000000ff",
  },
  contenido: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  btnAgregarMeta: {
    alignItems: "center",
    borderRadius: 5,
    marginTop: 2,
    padding: 2,
  },
  agregarMetaTexto: {
    backgroundColor: "rgba(58, 177, 28, 1)",
    borderRadius: 5,
    color: "#ddd",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 6,
    textAlign: "center",
    textShadowRadius: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    width: "100%",
  },
});
