import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Configuracion({
  onConfigurationSaved,
  onGoBack,
  isInitialSetup = false,
}) {
  const [nombre, setNombre] = useState("");
  const [rama, setRama] = useState("");
  const [foto, setFoto] = useState(null);
  const [modo, setModo] = useState("light");
  const insets = useSafeAreaInsets();

  const ramas = [{ label: "Rover", value: "Rover" }];

  const seleccionarImagen = async () => {
    try {
      // Solicitar permisos de acceso a la galería
      const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permiso.granted) {
        alert(
          "Necesitas permitir acceso a la galería para seleccionar una foto. Por favor, ve a Configuración > Aplicaciones > TuPP > Permisos y activa 'Fotos y videos'.",
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled) {
        setFoto(resultado.assets[0].uri);
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
      alert("Error al seleccionar imagen", error.message);
    }
  };

  const guardarConfiguracion = async () => {
    if (!nombre.trim() || !rama) {
      Toast.show({
        type: "error",
        text1: "Campos incompletos",
        text2: "Por favor completa nombre y rama ⚠️",
      });
      return;
    }

    try {
      const configuracion = { nombre, rama, foto, modo }; // Agregamos modo
      await AsyncStorage.setItem(
        "configuracion",
        JSON.stringify(configuracion),
      );

      Toast.show({
        type: "success",
        text1: "¡Listo! ✅",
        text2: "Configuración guardada correctamente",
        position: "bottom",
      });

      setTimeout(() => {
        if (onConfigurationSaved) onConfigurationSaved();
      }, 1500);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo guardar la configuración",
      });
    }
  };

  useEffect(() => {
    const cargarConfiguracion = async () => {
      try {
        const configuracionGuardada =
          await AsyncStorage.getItem("configuracion");
        if (configuracionGuardada) {
          const configuracion = JSON.parse(configuracionGuardada);
          setNombre(configuracion.nombre || "");
          setRama(configuracion.rama || "");
          setFoto(configuracion.foto || null);
          setModo(configuracion.modo || "light"); // Cargamos modo si existe
        }
      } catch (error) {
        console.error("Error al cargar la configuración:", error);
      }
    };
    cargarConfiguracion();
  }, []);

  return (
    <View style={[styles.mainWrapper, { backgroundColor: modo === "dark" ? "#000000" : "#FFFFFF" }]}>
      {!isInitialSetup && (
        <View 
          style={[
            styles.header, 
            { 
              paddingTop: insets.top + 10, 
              backgroundColor: modo === "dark" ? "#161b22ff" : "#F3F0F2",
              color: modo === "dark" ? "#ffffffff" : "#161b22ff",
            }]}>
          <Pressable onPress={onGoBack} style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#558DFF"
            />
          </Pressable>
          <Text style={[styles.headerTitle, { color: modo === "dark" ? "#ffffffff" : "#161b22ff" }]}>Configuración</Text>
          <View style={{ width: 28 }} />
        </View>
      )}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/*
        <View style={styles.fotoPerfilContainer}>
          <View>
            {foto ? (
              <Image source={{ uri: foto }} style={styles.fotoPerfil} />
            ) : (
              <FontAwesome
                name="user-circle"
                size={120}
                color="#558DFF"
                style={styles.foto}
              />
            )}
            <Pressable style={styles.editFoto} onPress={seleccionarImagen}>
              <FontAwesome5 name="edit" size={20} />
            </Pressable>
          </View>
          <Text style={styles.fotoPerfilText}>Foto de perfil</Text>
        </View>
        */}

        <View style={[styles.inputContainer, { backgroundColor: modo === "dark" ? "rgba(255, 255, 255, 0.1)" : "#F3F0F2" }]}>
          <View style={styles.inputContainerTitle}>
            <FontAwesome name="user" size={24} color="#558DFF" />
            <Text style={[styles.inputContainerTitleText, { color: modo === "dark" ? "#ffffffff" : "#161b22ff" }]}>
              Información personal
            </Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: modo === "dark" ? "#ffffffff" : "#161b22ff" }]}>Nombre</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNombre}
              value={nombre}
              placeholder="Ej: Marcela"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: modo === "dark" ? "#ffffffff" : "#161b22ff" }]}>Rama</Text>
            <Dropdown
              style={[styles.input, { paddingVertical: 0 }]}
              placeholderStyle={{ color: "#666" }}
              selectedTextStyle={{ color: "#ffffffff" }}
              data={ramas}
              labelField="label"
              valueField="value"
              placeholder="Selecciona..."
              value={rama}
              onChange={(item) => setRama(item.value)}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: modo === "dark" ? "#ffffffff" : "#161b22ff" }]}>Selecciona un modo</Text>
            <View style={styles.modoButtonsContainer}>
              <Pressable
                style={[
                  styles.modoButton,
                  modo === "light" && styles.modoButtonActive,
                ]}
                onPress={() => setModo("light")}
              >
                <FontAwesome
                  name="sun-o"
                  size={20}
                  color={modo === "light" ? "#fff" : "#558DFF"}
                />
                <Text
                  style={[
                    styles.modoButtonText,
                    modo === "light" && styles.modoButtonTextActive,
                  ]}
                >
                  Claro
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.modoButton,
                  modo === "dark" && styles.modoButtonActive,
                ]}
                onPress={() => setModo("dark")}
              >
                <FontAwesome
                  name="moon-o"
                  size={20}
                  color={modo === "dark" ? "#fff" : "#558DFF"}
                />
                <Text
                  style={[
                    styles.modoButtonText,
                    modo === "dark" && styles.modoButtonTextActive,
                  ]}
                >
                  Oscuro
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.guardarContainer}>
          <Pressable
            style={styles.guardarButton}
            onPress={() => guardarConfiguracion()}
          >
            <Entypo name="save" size={24} color="black" />
            <Text style={styles.guardarText}>Guardar cambios</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: "#161b22ff",
    borderBottomWidth: 1,
    borderBottomColor: "#30363dff",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffffff",
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
    marginTop: "auto",
    marginBottom: "auto",
  },
  fotoPerfilContainer: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 60,
    padding: 5,
  },
  foto: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 60,
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  editFoto: {
    backgroundColor: "#558DFF",
    borderColor: "#000000ff",
    borderRadius: 20,
    borderWidth: 1,
    bottom: 0,
    paddingVertical: 7,
    paddingHorizontal: 4,
    position: "absolute",
    right: 0,
  },
  fotoPerfilText: {
    color: "#ffffffff",
    marginTop: 10,
    textAlign: "center",
  },
  inputContainerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  inputContainerTitleText: {
    backgroundColor: "#558DFF",
    borderRadius: 20,
    borderWidth: 1,
    bottom: 0,
    padding: 5,
    position: "absolute",
    right: 0,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "#558DFF",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputContainerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  inputContainerTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffffff",
  },
  fieldGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#c9d1d9ff",
    marginBottom: 5,
    paddingLeft: 5,
  },
  input: {
    backgroundColor: "#0D1117",
    borderColor: "#30363dff",
    borderRadius: 5,
    borderWidth: 1,
    color: "#ffffffff",
    fontSize: 16,
    height: 60,
    padding: 10,
  },
  guardarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  guardarButton: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#00C564",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: "center",
  },
  modoButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  modoButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#558DFF",
    backgroundColor: "#0D1117",
  },
  modoButtonActive: {
    backgroundColor: "#558DFF",
    borderColor: "#558DFF",
  },
  modoButtonText: {
    color: "#558DFF",
    fontSize: 14,
    fontWeight: "600",
  },
  modoButtonTextActive: {
    color: "#fff",
  },
});
