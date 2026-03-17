import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>

        <View>
          <Text>Deseja entrar sem conta?</Text>
        </View>
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
    marginTop: '60%'
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
  }

  // Entrar sem login
});

export default Login;