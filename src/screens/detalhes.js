import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function DetalhesScreen({ route }) {
  const navigation = useNavigation();
  const { animal } = route.params || {};

  const defaultAnimal = {
    name: 'Sem nome',
    description: 'Sem descrição disponível',
    photos: [{ medium: 'https://via.placeholder.com/300x200' }],
    breeds: { primary: 'Desconhecida' },
    age: 'Desconhecida',
    gender: 'Desconhecido',
    size: 'Desconhecido',
    attributes: {
      spayed_neutered: false,
      house_trained: false,
      shots_current: false,
    },
    contact: { address: { city: 'Desconhecida', state: '' } },
  };

  const displayAnimal = { ...defaultAnimal, ...animal };

  const animalDetails = `
    Vacina: ${displayAnimal.attributes.shots_current ? 'Sim' : 'Não'}
    Vermifugo: ${displayAnimal.attributes.dewormed ? 'Sim' : 'Não' || 'Desconhecido'}
    Localização: ${displayAnimal.contact.address.city || 'Desconhecida'}, ${displayAnimal.contact.address.state || ''}
    Idade: ${displayAnimal.age || 'Desconhecida'}
    Sexo: ${displayAnimal.gender || 'Desconhecido'}
    Raça: ${displayAnimal.breeds.primary || 'Sem raça definida'}
    Porte: ${displayAnimal.size || 'Desconhecido'}
    Espécie: ${displayAnimal.species || 'Desconhecida'}
  `;

  // Estado para controlar o modal
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleAdotar = () => {
    setModalVisible(true);
  };

  const handleConfirmAdotar = () => {
    alert(`Solicitação de adoção enviada!\nNome: ${nome}\nTelefone: ${telefone}\nE-mail: ${email}\nEndereço: ${endereco}`);
    setModalVisible(false);
    setNome('');
    setTelefone('');
    setEmail('');
    setEndereco('');
  };

  const handleFechar = () => {
    setModalVisible(false);
    setNome('');
    setTelefone('');
    setEmail('');
    setEndereco('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon style={styles.setaButton} name="arrow-back" size={24} color="#9A554C" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes do Animal</Text>
      </View>

      <View style={styles.photoContainer}>
        <Image
          style={styles.animalPhoto}
          source={{ uri: displayAnimal.photos[0]?.medium || 'https://via.placeholder.com/300x200' }}
        />
      </View>

      <Text style={styles.animalName}>{displayAnimal.name}</Text>

      <Text style={styles.animalDescription}>{displayAnimal.description}</Text>

      <Text style={styles.animalDetails}>{animalDetails}</Text>

      <TouchableOpacity style={styles.button} onPress={handleAdotar}>
        <Text style={styles.buttonText}>Quero adotar!</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleFechar}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adote o(a) {displayAnimal.name}</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
              placeholderTextColor="#9FB3C8"
            />
            <TextInput
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone}
              placeholder="Telefone"
              placeholderTextColor="#9FB3C8"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
              placeholderTextColor="#9FB3C8"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Endereço"
              placeholderTextColor="#9FB3C8"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleConfirmAdotar}>
              <Text style={styles.modalButtonText}>Adotar!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleFechar}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 130,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    marginTop: 0,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: '#9A554C',
    marginLeft: 90,
    flex: 1,
  },
  setaButton: {
    marginRight: 10,
    zIndex: 1,
  },
  photoContainer: {
    width: 300,
    height: 200,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    alignItems: 'center', 
    paddingTop: 10,
    marginLeft: 75,
    marginBottom: 20,
    marginTop: 20
  },
  animalPhoto: {
    width: 150,
    height: 200,
    resizeMode: 'contain', 
  },
  animalName: {
    fontFamily: 'Roboto',
    fontSize: 24,
    color: '#9A554C',
    textAlign: 'center',
    marginBottom: 21,
  },
  animalDescription: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 21,
  },
  animalDetails: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    paddingHorizontal: 45,
    marginBottom: 21,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#9A554C',
    width: 343,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    alignSelf: 'center'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 314,
    height: 400,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#9FB3C8',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: 280,
    height: 40,
    borderColor: '#9FB3C8',
    borderWidth: 1,
    borderRadius: 5,
  
    backgroundColor: 'white',
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'black',
  },
  modalButton: {
    backgroundColor: '#9A554C',
    width: 200,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});