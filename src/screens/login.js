import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === 'fulano@mail.com' && password === '123') {
      navigation.navigate('Dashboard');
    } else {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="fulano@mail.com"
        placeholderTextColor="#9FB3C8"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="***"
        placeholderTextColor="#9FB3C8"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} color="#9A554C" />
      <Text style={styles.register} onPress={() => navigation.navigate('Registro')}>
        Registrar
      </Text>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Icon name="error" size={30} color="red" style={styles.modalIcon} />
                <Text style={styles.modalText}>E-mail e/ou senha errados.</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontFamily: 'Pacifico',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
    color: '#9A554C',
    fontStyle: 'italic',
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#9FB3C8',
    marginBottom: 5,
  },
  input: {
    fontFamily: 'Roboto',
    fontSize: 16,
    height: 50,
    borderColor: '#9FB3C8',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    color: '#9FB3C8',
  },
  register: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#9A554C',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: 314,
    height: 200,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalIcon: {
    marginTop: 44,
  },
  modalText: {
    fontFamily: 'Roboto',
    fontSize: 24,
    marginTop: 24,
    color: 'black',
    textAlign: 'center',
  },
});