import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text, StyleSheet } from "react-native";

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
  return (
    <View style={[styles.rutaContainer]}>
      <View
        style={[
          styles.header,
          { borderColor: ruta.color, shadowColor: ruta.color },
        ]}
      >
        <Text style={styles.titulo}>RUTA DE {ruta.titulo}</Text>
        <Text style={styles.cantidadMetas}>
          <AntDesign name="flag" size={12} color="#2979FF" />
          {" "} {ruta.metas.length} {ruta.metas.length === 1 ? "META" : "METAS"}
        </Text>
      </View>

      <View style={styles.listaMetas}>
        {ruta.metas.map((meta, index) => (
          <Meta
            key={meta.id}
            meta={meta}
            rutaId={ruta.id}
            rutaColor={ruta.color}
            onToggle={onToggle}
            onEditarMeta={onEditarMeta}
            onEliminarMeta={onEliminarMeta}
            onEditarAccionable={onEditarAccionable}
            onAgregarAccionable={onAgregarAccionable}
            onEliminarAccionable={onEliminarAccionable}
          />
        ))}

        <AgregarMeta
          rutaId={ruta.id}
          onConfirmar={onAgregarMeta}
          rutaColor={ruta.color}
        />
      </View>

      <InfoRuta
        descripcion={infoRutas[ruta.id].descripcion}
        competencias={infoRutas[ruta.id].competencias}
        color={ruta.color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cantidadMetas: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    color: "#ddd",
    fontWeight: "bold",
    fontSize: 12,
    padding: 6,
  },
  rutaContainer: {
    width: "100%",
  },
  header: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 30,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
});
