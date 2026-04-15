import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AgregarMeta({ rutaId, onConfirmar, rutaColor }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {}, []);

  const saveMeta = () => {
    if (text.trim().length === 0) return;
    onConfirmar(rutaId, text);
    setModalVisible(false);
    onChangeText("");
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Pressable
        style={({ pressed }) => [
          styles.btnAgregarMeta,
          {
            opacity: pressed ? 0.5 : 1,
            transform: [{ scale: pressed ? 0.96 : 1 }],
            backgroundColor: rutaColor
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>
          + AGREGAR NUEVA META
        </Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onShow={() => {inputRef.current?.focus();}}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              <AntDesign name="form" size={16} color="black" /> Titulo de la meta
            </Text>

            <TextInput
              ref={inputRef}
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="..."
            />

            <View style={styles.botoneraModal}>
              <Pressable
                style={[
                  styles.btnModal,
                  { backgroundColor: "rgba(54, 109, 192, 1)" },
                ]}
                onPress={() => saveMeta()}
              >
                <Text style={styles.textStyle}>Aceptar</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.btnModal,
                  { backgroundColor: "rgba(192, 54, 54, 1)" },
                ]}
                onPress={() => setModalVisible(false)}
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
  btnAgregarMeta: {
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
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
    width: "100%",
  },
});
