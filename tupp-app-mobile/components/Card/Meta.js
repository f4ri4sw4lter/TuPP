import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Accionable from "./Accionable";
import AgregarAccionable from "../Model/AgregarAccionable";
import EditarMeta from "../Model/EditarMeta";

export default function Meta({
  onToggle,
  rutaId,
  rutaColor,
  meta,
  onEditarMeta,
  onEliminarMeta,
  onEditarAccionable,
  onAgregarAccionable,
  onEliminarAccionable,
  modo,
}) {
  const [abierto, setAbierto] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [accionableSeleccionado, setAccionableSeleccionado] = useState(null);
  const [modalAccionableVisible, setModalAccionableVisible] = useState(false);

  const handleLongPressAcc = (acc) => {
    setAccionableSeleccionado(acc);
    setModalAccionableVisible(true);
  };

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAbierto(!abierto);
  };

  const completados = meta.accionables.filter((a) => a.checked).length;
  const total = meta.accionables.length;
  const progreso = total > 0 ? (completados / total) * 100 : 0;
  const anchoProgreso = `${progreso}%`;

  return (
    <View style={[styles.card, { backgroundColor: modo == "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.75)" }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleDropdown}
        onLongPress={() => setModalEditar(true)}
      >
        <View style={styles.headerTexto}>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text 
              style={[styles.titulo, { color: modo == "dark" ? "#ffffffff" : "#161b22ff" }]}>
              {meta.titulo}
            </Text>
            <AntDesign name={abierto ? "up" : "down"} size={12} color="#afafafff" />
          </View>

          <View style={styles.progresoContainer}>
            <Text style={[styles.progresoTexto, { color: rutaColor }]}>
              PROGRESO DE META
            </Text>
            <Text style={styles.porcentaje}>{anchoProgreso}</Text>
          </View>

          <View style={styles.contenedorBarra}>
            <View style={{ width: anchoProgreso, backgroundColor: rutaColor, height: "100%" }} />
          </View>
        </View>
      </TouchableOpacity>

      {abierto && (
        <View style={styles.contenido}>
          {meta.accionables.map((acc) => (
            <Accionable
              key={acc.id}
              titulo={acc.titulo}
              checked={acc.checked}
              onPress={() => onToggle(rutaId, meta.id, acc.id)}
              onEditar={(nuevoTexto) =>
                onEditarAccionable(rutaId, meta.id, acc.id, nuevoTexto)
              }
              onEliminar={() => onEliminarAccionable(rutaId, meta.id, acc.id)}
              color={rutaColor}
              modo={modo}
            />
          ))}
          <AgregarAccionable
            onConfirmar={(texto) => onAgregarAccionable(rutaId, meta.id, texto)}
            modo={modo}
          />
        </View>
      )}

      <EditarMeta
        show={modalEditar}
        tituloMeta={meta.titulo}
        onClose={() => setModalEditar(false)}
        onConfirmar={(nuevoTitulo) => {
          onEditarMeta(rutaId, meta.id, nuevoTitulo);
          setModalEditar(false);
        }}
        onEliminar={() => {
          onEliminarMeta(rutaId, meta.id);
          setModalEditar(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  btnAgregarMeta: {
    alignItems: "center",
    borderRadius: 5,
    marginTop: 2,
    padding: 2,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  contenido: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  contenedorBarra: {
    height: 6,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: 3,
    width: "100%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  headerTexto: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ffffff",
  },
  porcentaje: {
    fontSize: 10,
    fontWeight: "600",
    color: "#ffffffff",
  },
  progresoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  progresoTexto: {
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 4,
    color: "#2e2d2dff",
  },
  icono: {
    fontSize: 12,
    color: "#fdfdfdff",
  },
});
