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

// AgregarMeta receives an optional `ruta` prop (string or object) that identifies
// the route (ruta) to which the new meta will belong. When the user presses
// "Aceptar" we log that ruta together with the new meta text.
export default function AgregarMeta({ rutaId, onConfirmar }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");

  useEffect(() => {}, []);

  const saveMeta = () => {
    if (text.trim().length === 0) return;

    onConfirmar(rutaId, text);

    setModalVisible(false);
    onChangeText("");
  };

  return (
    <View>
      <Pressable
        style={styles.btnAgregarMeta}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Agregar meta</Text>

            <TextInput
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
    backgroundColor: "rgba(58, 177, 28, 1)",
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 2,
    color: "#ddd",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 9,
    textAlign: "center",
    textShadowRadius: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    marginTop: 5,
    width: "98%",
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
    width: "100%",
  },
});
