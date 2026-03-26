import React, { useState } from "react"; // Necesitamos estado para el modal
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EditarAccionable from "./EditarAccionable";

export default function Accionable({
  titulo,
  checked,
  onPress,
  onEditar,
  onEliminar,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress} // Un solo touch: Toggle (Checked)
        onLongPress={() => setModalVisible(true)} // Mantener apretado: Abrir edición
        delayLongPress={500}
        activeOpacity={0.8}
      >
        <Text style={[styles.label, checked && styles.labelChecked]}>
          {titulo}
        </Text>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Text style={styles.checkMark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <EditarAccionable
        show={modalVisible}
        tituloAccionable={titulo}
        onClose={() => setModalVisible(false)}
        onConfirmar={(nuevoTexto) => {
          onEditar(nuevoTexto);
          setModalVisible(false);
        }}
        onEliminar={() => {
          onEliminar();
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 8,
    marginVertical: 2,
  },
  label: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  labelChecked: {
    color: "#aaa",
    textDecorationLine: "line-through", // Efecto de tarea completada
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
  },
  checkMark: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
