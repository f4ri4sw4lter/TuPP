import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Pressable,
} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Meta from "./Meta";
import AgregarMeta from "./AgregarMeta";
import InfoRuta from "./InfoRuta";
import infoRutas from "../data/infoRutas.json";

export default function Ruta({ 
  ruta,
  onToggle,
  onAgregarMeta,
  onEditarMeta,
  onEliminarMeta,
  onAgregarAccionable,
  onEditarAccionable,
  onEliminarAccionable,
}) {
  const [abierto, setAbierto] = useState(false);

  const toggleDropdown = () => {
    // Esto hace que el cambio de altura sea fluido
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAbierto(!abierto);
  };

  return (
    <View style={[styles.card, { backgroundColor: ruta.color || "#fff" }]}>
      <TouchableOpacity
        style={[styles.header, { backgroundColor: ruta.color || "#fff" }]}
        activeOpacity={0.7}
        onPress={toggleDropdown}
      >
        <Text style={styles.titulo}>RUTA DE {ruta.titulo}</Text>
        <AntDesign 
          name={abierto ? "up" : "down"} 
          size={12} 
          color="#2e2d2dff"
        />
      </TouchableOpacity>

      {abierto && (
        <View style={styles.listaMetas}>
          {ruta.metas.map((meta, index) => (
            <Meta
              key={meta.id}
              meta={meta}
              rutaId={ruta.id}
              onToggle={onToggle}
              onEditarMeta={onEditarMeta}
              onEliminarMeta={onEliminarMeta}
              onEditarAccionable={onEditarAccionable}
              onAgregarAccionable={onAgregarAccionable}
              onEliminarAccionable={onEliminarAccionable}
            />
          ))}

          <AgregarMeta rutaId={ruta.id} onConfirmar={onAgregarMeta} />
          <InfoRuta descripcion={infoRutas[ruta.id].descripcion} competencias={infoRutas[ruta.id].competencias}/>
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
