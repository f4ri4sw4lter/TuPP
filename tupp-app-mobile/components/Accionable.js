import React, { useState } from "react"; // Necesitamos estado para el modal
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EditarAccionable from "./EditarAccionable";

export default function Accionable({
  titulo,
  checked,
  onPress,
  onEditar,
  onEliminar,
  color
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
        <View style={[styles.checkbox, checked && {backgroundColor: color}]}>
          {checked && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text style={[styles.label, checked && styles.labelChecked]}>
          {titulo}
        </Text>
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
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 14,
    color: "#cccbcbff",
    flex: 1,
  },
  labelChecked: {
    color: "#aaa",
    textDecorationLine: "line-through", // Efecto de tarea completada
  },
  checkbox: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 6,
    height: 35,
    justifyContent: "center",
    margin: 10,
    width: 30,
  },
  checkboxChecked: {
    backgroundColor: "#2979FF",
  },
  checkMark: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
