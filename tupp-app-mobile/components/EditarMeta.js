import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function EditarMeta({
  tituloMeta,
  show,
  onClose,
  onConfirmar,
  onEliminar,
}) {
  const [text, onChangeText] = useState(tituloMeta);

  useEffect(() => {
    if (show) onChangeText(tituloMeta);
  }, [show, tituloMeta]);

  const confirmarEliminar = () => {
    Alert.alert(
      "Eliminar Meta",
      `¿Estás seguro de que quieres eliminar "${tituloMeta}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: onEliminar,
        },
      ],
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalLabel}>Editar meta</Text>
            <Pressable style={styles.btnEliminar} onPress={confirmarEliminar}>
              <AntDesign name="delete" size={20} color="#ff0000" />
            </Pressable>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            autoFocus={true}
          />

          <View style={styles.botoneraModal}>
            <Pressable
              style={[
                styles.btnModal,
                { backgroundColor: "rgba(54, 109, 192, 1)" },
              ]}
              onPress={() => onConfirmar(text)}
            >
              <Text style={styles.textStyle}>Guardar</Text>
            </Pressable>

            <Pressable
              style={[
                styles.btnModal,
                { backgroundColor: "rgba(192, 54, 54, 1)" },
              ]}
              onPress={onClose}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  textEliminar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
  },
  botoneraModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 2,
  },
  btnModal: {
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
    width: "50%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  input: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
});
