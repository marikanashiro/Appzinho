import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AnimalCard = ({ animal }) => {
  const navigation = useNavigation();
  const truncatedDescription = animal.description
    ? `${animal.description.substring(0, 50)}${animal.description.length > 50 ? '...' : ''}`
    : 'Sem descrição disponível';

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: animal.photos[0]?.medium || 'https://via.placeholder.com/130' }}
      />
      <Text style={styles.name}>{animal.name || 'Sem nome'}</Text>
      <Text style={styles.description} numberOfLines={1}>{truncatedDescription}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Detalhes', { animal })}
      >
        <Text style={styles.buttonText}>Ver detalhes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    width: 343,
    height: 320,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 130,
    height: 174,
    borderRadius: 10,
    marginTop: 15,
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 8,
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    width: 300,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#9A554C',
    width: 290,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default AnimalCard;