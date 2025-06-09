import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native'; 

export default function PerfilScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSalvar = () => {
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 2000);
  };

  const handleFechar = () => {
    navigation.navigate('Dashboard');
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="person-circle" size={60} color="#9A554C" style={styles.profileIcon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail: fulano@mail.com"
          placeholderTextColor="#9FB3C8"
          editable={true}
        />
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome completo: não informado"
          placeholderTextColor="#9FB3C8"
        />
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Telefone: não informado"
          placeholderTextColor="#9FB3C8"
        />
        <TextInput
          style={styles.input}
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Endereço: não informado"
          placeholderTextColor="#9FB3C8"
        />
        <Text style={styles.historyTitle}>Histórico de Solicitações:</Text>
        <View style={styles.requestBox}>
          <Text>Animal: Micalateia</Text>
          <Text>Data: 29/05/2025</Text>
        </View>
        <View style={styles.requestBox}>
          <Text>Nenhuma solicitação encontrada.</Text>
        </View>
        <View style={styles.requestBox}>
          <Text>Nenhuma solicitação encontrada.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFechar}>
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalCheck}>✓</Text>
            <Text style={styles.modalText}>Perfil atualizado com sucesso!</Text>
          </View>
        </TouchableOpacity>
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
  menuButton: {
    marginRight: 10,
    zIndex: 1,
  },
  menuIcon: {
    fontSize: 24,
    color: '#9A554C',
  },
  headerTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: '#9A554C',
    marginLeft: 150,
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center', 
    paddingTop: 10, 
  },
  profileIcon: {
    marginTop: 20, 
    marginBottom: 20,
  },
  input: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#9FB3C8',
    width: 343,
    height: 40,
    borderWidth: 1,
    borderColor: '#9FB3C8',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    textAlign: 'left', 
  },
  historyTitle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#9A554C',
    marginTop: 20,
    textAlign: 'center',
  },
  requestBox: {
    width: 343,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#9A554C',
    width: 290,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
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
    backgroundColor: 'white',
    width: 300,
    height: 200,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCheck: {
    fontSize: 40,
    color: '#28A745',
    marginBottom: 20
  },
  modalText: {
    fontFamily: 'Roboto',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
});