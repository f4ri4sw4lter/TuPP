import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';

export default function Accionable({titulo, checkedInicial = false}) {

    const [isSelected, setSelection] = useState(checkedInicial);

    useEffect(() => {
    }, []);

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => setSelection(!isSelected)}
            activeOpacity={0.8}
        >
            <Text style={styles.label}>{titulo}</Text>
            
            {/* Representación visual del Checkbox */}
            <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                {isSelected && <Text style={styles.checkMark}>✓</Text>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Manda el texto a la izquierda y checkbox a la derecha
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
  checkMark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
