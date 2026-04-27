import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function InfoRuta({ descripcion, competencias, color, modo}) {
  const [show, setShow] = useState(false);

  return (
    <View style={[styles.infoRutaContainer, { backgroundColor: modo == "dark" ? "#161b22ff" : "#ffffff" }]}>
      <View style={styles.titleContainer}>
        <FontAwesome name="question-circle" size={24} color={color} style={styles.icon} />
        <Text 
          style={[
            styles.title, 
            { 
              color: modo == "dark" ? "#ffffffff" : "#161b22ff" 
            }]}>SOBRE ESTA RUTA</Text>
      </View>

      <Text style={[styles.descripcion, { color: modo == "dark" ? "#ffffffff" : "#161b22ff" }]}>{descripcion}</Text>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            transform: [{ scale: pressed ? 0.96 : 1 }],
          },
        ]}
        onPress={() => setShow(!show)}
      >
        <Text style={[styles.verCompetencias, { color: color }]} onPress={() => setShow(!show)}>
          {show ? "OCULTAR COMPETENCIAS" : "VER COMPETENCIAS"} {" "}
          {show 
            ?
            <AntDesign name="arrow-up" size={12} color={color} />
            :
            <AntDesign name="arrow-down" size={12} color={color} />
          }
        </Text>
      </Pressable>

      <View onShow={show} style={[{ display: show ? "flex" : "none" }, styles.competenciasContainer]}>
        <Text style={[styles.competenciasTitulo, { fontWeight: "700", color: modo == "dark" ? "#ffffffff" : "#161b22ff" }]}>COMPETENCIAS:</Text>
        {competencias.map((comp, index) => (
          <Text key={index} style={[styles.competencia, { color: modo == "dark" ? "#ffffffff" : "#161b22ff" }]}>
            <MaterialCommunityIcons name="fleur-de-lis" size={18} color={color} />
            {" "}{comp}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoRutaContainer: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    elevation: 20,
    marginBottom: 60,
    overflow: "hidden",
    padding: 20,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
  icon: {
    margin: 0,
  },
  descripcion: {
    fontSize: 16,
    fontWeight: "600",
  },
  verCompetencias: {
    fontWeight: "600", 
    textAlign: "right",
    paddingTop: 10,
  },
  competenciasContainer: {
    marginTop: 10,
    gap: 5,
  },
  competenciasTitulo: {
    fontSize: 14,
    marginBottom: 5,
  },
  competencia: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 3,
  },
});
