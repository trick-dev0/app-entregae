// Login.tsx (corrigido)
import { SafeAreaView } from 'react-native-safe-area-context';

import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from 'react-native';

const Login = ({ navigation }: any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginComConta = () => {
    // Validação básica
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }

    // Se tudo estiver ok, navega para Main (que contém as tabs)
    navigation.replace('Main'); // Usar replace para não permitir voltar para o login
  };

  const handleLoginSemConta = () => {
    // Login sem conta - vai direto para Main
    navigation.replace('Main'); // Usar replace para não permitir voltar para o login
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.espaceLogo}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLoginComConta}
        >
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.testText}>Não possui conta ainda?</Text>

        <TouchableOpacity
          style={styles.buttonNoLogin}
          onPress={handleLoginSemConta}
        >
          <Text style={styles.textButton}>Entrar sem conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // wrapper da loja 
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  //
  espaceLogo: {
    marginTop: 100
  },

  // Logo
  logo: {
    width: 250,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30
  },


  // form
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10
  },

  button: {
    backgroundColor: '#E53935',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20
  },

  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },

  // Entrar sem login


  testText: {
    marginTop: 100,
    fontSize: 16,
    color: '#292929',
    minHeight: 20,
    textAlign: 'center'
  },

  buttonNoLogin: {
    backgroundColor: '#ec691d',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20
  }
});

export default Login;