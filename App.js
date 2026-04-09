import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [points, setPoints] = useState(0);
  const [isHero, setIsHero] = useState(false);

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelData => {
      setData(accelData);
      // Se o movimento for quase zero, você vira Herói
      if (Math.abs(accelData.x) < 0.1 && Math.abs(accelData.y) < 0.1) {
        setIsHero(true);
      } else {
        setIsHero(false);
      }
    });
    Accelerometer.setUpdateInterval(1000);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (isHero) {
      const interval = setInterval(() => {
        setPoints(p => p + 1);
      }, 5000); // Ganha 1 XP a cada 5 segundos parado
      return () => clearInterval(interval);
    }
  }, [isHero]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>OFFTIME HERO</Text>
      <View style={isHero ? styles.cardHero : styles.cardActive}>
        <Text style={styles.statusText}>{isHero ? "MODO HERÓI ATIVO" : "EM MOVIMENTO"}</Text>
        <Text style={styles.xpText}>{points} XP ACUMULADO</Text>
      </View>
      <Text style={styles.info}>Mantenha o celular parado para subir de nível!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#f1c40f', marginBottom: 40 },
  cardHero: { width: '80%', padding: 20, borderRadius: 15, backgroundColor: '#27ae60', alignItems: 'center' },
  cardActive: { width: '80%', padding: 20, borderRadius: 15, backgroundColor: '#e74c3c', alignItems: 'center' },
  statusText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  xpText: { color: '#fff', fontSize: 24, marginTop: 10 },
  info: { color: '#7f8c8d', marginTop: 30 }
});