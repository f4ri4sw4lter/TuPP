import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native"; // Quitamos FlatList
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function InfoRuta({ descripcion, competencias }) {
  const [show, setShow] = useState(false);

  const toggleInfo = () => setShow(!show);

  return (
    <View style={styles.container}> 
      <View style={styles.footer}>
        <Pressable 
          style={({ pressed }) => [
            styles.info, 
            { opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }
          ]} 
          onPress={toggleInfo}
        >
          <MaterialCommunityIcons
            name={show ? "close-circle" : "information-slab-circle-outline"}
            size={28}
            color={show ? "#d32f2f" : "#191b2c"}
          />
        </Pressable>
      </View>

      {show && (
        <View style={styles.containerInfo}>
          <Text style={styles.descripcion}><Text style={{ fontWeight: "bold" }}>Descripción:</Text> {descripcion}</Text>
          
          <Text style={styles.tituloCompetencias}>Competencias</Text>
          
          <View style={styles.listaCompetencias}>
            {competencias.map((competencia, index) => (
              <View key={index} style={styles.competenciaContainer}>
                <Text style={styles.competencia}>
                   <MaterialCommunityIcons name="fleur-de-lis" size={20} color="#5513a1ff" /> {competencia}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerInfo: {
    backgroundColor: "#e7ec9cff",
    borderColor: "#191b2c",
    borderWidth: 1,
    borderRadius: 12,
    padding: 6,
    marginTop: 10,
  },
  footer: {
    marginTop: 10,
    alignItems: "flex-end",
    width: "100%",
  },
  info: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 2,
  },
  containerInfo: {
    marginTop: 10,
  },
  tituloCompetencias: {
    fontWeight: "bold", 
    textAlign: "center",
    marginBottom: 5,
    color: "#191b2c",
    fontSize: 18,
    color: "#fff",
    textShadowColor: 'rgba(10, 10, 10, 0.75)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 8,
  },
  descripcion: {
    backgroundColor: "#191b2c",
    borderRadius: 12,
    color: "#fff",
    fontSize: 16,
    padding: 15,
    marginBottom: 15,
    lineHeight: 20,
    textAlign: "center",
  },
  competenciaContainer: {
    width: "100%",
  },
  competencia: {
    color: "#fff",
    padding: 10,
    fontSize: 16,
    textShadowColor: 'rgba(10, 10, 10, 0.75)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 8,
  },
});