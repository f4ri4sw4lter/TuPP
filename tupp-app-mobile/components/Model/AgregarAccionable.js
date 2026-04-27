import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AgregarAccionable({ onConfirmar, modo }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");

  const handleAceptar = () => {
    if (text.trim().length > 0) {
      onConfirmar(text.trim());
      onChangeText("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.btnAgregarAccionable,
          {
            opacity: pressed ? 0.5 : 1,
            transform: [{ scale: pressed ? 0.96 : 1 }],
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.textStyle, { color: modo == "dark" ? "#ffffffff" : "#161b22ff" }]}>
          + AGREGAR NUEVO ACCIONABLE
        </Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              <AntDesign name="form" size={16} color="black" /> Titulo del accionable
            </Text>

            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="..."
              autoFocus={true}
            />

            <View style={styles.botoneraModal}>
              <Pressable
                style={[
                  styles.btnModal,
                  { backgroundColor: "rgba(54, 109, 192, 1)" },
                ]}
                onPress={handleAceptar}
              >
                <Text style={styles.textStyle}>Aceptar</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.btnModal,
                  { backgroundColor: "rgba(192, 54, 54, 1)" },
                ]}
                onPress={() => {
                  setModalVisible(false);
                  onChangeText("");
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAgregarAccionable: {
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderStyle: "dotted",
    color: "#ddd",
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    textShadowRadius: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    width: "100%",
  },
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
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    width: "90%",
  },
  modalText: {
    marginBottom: 15,
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
    minWidth: 300,
    maxWidth: "100%",
    width: "100%",
  },
});
