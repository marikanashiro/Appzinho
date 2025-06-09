import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Text as ErrorText, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RegistroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    validateFields();
  }, [nome, email, telefone, endereco, senha, repetirSenha]);

  const validateFields = () => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = 'Campo obrigatório';
    if (!email.trim()) newErrors.email = 'Campo obrigatório';
    if (!telefone.trim()) newErrors.telefone = 'Campo obrigatório';
    if (!endereco.trim()) newErrors.endereco = 'Campo obrigatório';
    if (!senha.trim()) newErrors.senha = 'Campo obrigatório';
    if (!repetirSenha.trim()) newErrors.repetirSenha = 'Campo obrigatório';
    if (senha && repetirSenha && senha !== repetirSenha) newErrors.repetirSenha = 'As senhas não coincidem';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'nome': setNome(value); break;
      case 'email': setEmail(value); break;
      case 'telefone': setTelefone(value); break;
      case 'endereco': setEndereco(value); break;
      case 'senha': setSenha(value); break;
      case 'repetirSenha': setRepetirSenha(value); break;
    }
    validateFields();
  };

  const handleSalvar = () => {
    if (validateFields()) {
      createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          // Registro bem-sucedido
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.navigate('Login');
          }, 2000);
        })
        .catch((error) => {
          // Erro no registro
          const newErrors = { ...errors };
          switch (error.code) {
            case 'auth/email-already-in-use':
              newErrors.email = 'E-mail já está em uso';
              break;
            case 'auth/invalid-email':
              newErrors.email = 'E-mail inválido';
              break;
            case 'auth/weak-password':
              newErrors.senha = 'Senha muito fraca (mínimo 6 caracteres)';
              break;
            default:
              newErrors.email = 'Erro ao registrar. Tente novamente.';
          }
          setErrors(newErrors);
          console.error('Erro no registro:', error.message);
        });
    }
  };

  const handleCancelar = () => {
    navigation.navigate('Login');
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registre-se!</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#9FB3C8"
          value={nome}
          onChangeText={(text) => handleInputChange('nome', text)}
        />
        {errors.nome && (
          <View style={styles.errorContainer}>
            <Icon name="error-outline" size={12} color="#F24822" />
            <ErrorText style={styles.error}>{errors.nome}</ErrorText>
          </View>
        )}
        <View style={styles.inputSpacing} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#9FB3C8"
          value={email}
          onChangeText={(text) => handleInputChange('email', text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email && (
          <View style={styles.errorContainer}>
            <Icon name="error-outline" size={12} color="#F24822" />
            <ErrorText style={styles.error}>{errors.email}</ErrorText>
          </View>
        )}
        <View style={styles.inputSpacing} />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#9FB3C8"
          value={telefone}
          onChangeText={(text) => handleInputChange('telefone', text)}
          keyboardType="phone-pad"
        />
        {errors.telefone && (
          <View style={styles.errorContainer}>
            <Icon name="error-outline" size={12} color="#F24822" />
            <ErrorText style={styles.error}>{errors.telefone}</ErrorText>
          </View>
        )}
        <View style={styles.inputSpacing} />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          placeholderTextColor="#9FB3C8"
          value={endereco}
          onChangeText={(text) => handleInputChange('endereco', text)}
        />
        {errors.endereco && (
          <View style={styles.errorContainer}>
            <Icon name="error-outline" size={12} color="#F24822" />
            <ErrorText style={styles.error}>{errors.endereco}</ErrorText>
          </View>
        )}
        <View style={styles.inputSpacing} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#9FB3C8"
          value={senha}
          onChangeText={(text) => handleInputChange('senha', text)}
          secureTextEntry
        />
        {errors.senha && (
          <View style={styles.errorContainer}>
            <Icon name="error-outline" size={12} color="#F24822" />
            <ErrorText style={styles.error}>{errors.senha}</ErrorText>
          </View>
        )}
        <View style={styles.inputSpacing} />
        <TextInput
          style={styles.input}
          placeholder="Repita sua senha"
          placeholderTextColor="#9FB3C8"
          value={repetirSenha}
          onChangeText={(text) => handleInputChange('repetirSenha', text)}
          secureTextEntry
        />
        {errors.repetirSenha && (
          <View style={styles.errorContainer}>
            <Icon name="error-outline" size={12} color="#F24822" />
            <ErrorText style={styles.error}>{errors.repetirSenha}</ErrorText>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <View style={styles.buttonSpacing} />
        <TouchableOpacity style={styles.button} onPress={handleCancelar}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={40} color="#28A745" />
            <Text style={styles.modalText}>Cadastro realizado com sucesso!</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Pacifico',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 34,
    marginTop: 104,
    color: '#9A554C',
    borderRadius: 10,
  },
  formContainer: {
    flex: 1, 
    width: '100%',
    paddingHorizontal: 25, 
  },
  input: {
    fontFamily: 'Roboto',
    fontSize: 16,
    width: 343,
    height: 40,
    borderColor: '#9FB3C8',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    color: '#9FB3C8',
    alignItems: 'center',
  },
  inputSpacing: {
    height: 20, 
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  error: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#F24822',
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 68,
    alignItems: 'center',
  },
  buttonSpacing: {
    height: 10,
  },
  button: {
    backgroundColor: '#9A554C',
    width: 200,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 20,
  },
  modalText: {
    fontFamily: 'Roboto',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});