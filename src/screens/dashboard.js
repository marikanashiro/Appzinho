import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
  try {
    const tokenResponse = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
      grant_type: 'client_credentials',
      client_id: 'ePVez3CpBfcmo2lS54LE0WynpKkkx7Xxx6BdDIGGRsxBQK6fta',
      client_secret: 'tMx14nYyJ6T0Satu7d0i23cxAaQptW4SN4EnGgIq',
    });
    const accessToken = tokenResponse.data.access_token;

    const animalsResponse = await axios.get('https://api.petfinder.com/v2/animals', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setAnimals(animalsResponse.data.animals || []);
  } catch (error) {
    console.error('Erro ao buscar animais:', error);
  } finally {
    setLoading(false);
  }
};

  const renderAnimalItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: item.photos[0]?.medium || 'https://via.placeholder.com/150' }}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description || 'Sem descrição disponível'}</Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('Ver detalhes: ' + item.name)}>
        <Text style={styles.buttonText}>Ver detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  if (loading) {
    return <Text style={styles.loading}>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Não compre, adote!</Text>
      <FlatList
        data={animals}
        renderItem={renderAnimalItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  menuIcon: {
    fontSize: 24,
    color: '#9A554C',
  },
  title: {
    fontFamily: 'Pacifico',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    color: '#9A554C',
  },
  list: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    width: 343,
    alignItems: 'center',
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#9A554C',
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#9A554C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#9A554C',
  },
});