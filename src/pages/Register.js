
import React from 'react';
import { View, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
var account = {
  name: '',
  email: '',
  password: ''
}

export default function Main({ navigation }) {
  async function handleRegister() {
    if (validateInputs()) {
      try {
        await AsyncStorage.setItem('@account_email',account.email);
      } catch (error) {
        ToastAndroid.show("problema ao criar conta", ToastAndroid.SHORT);
        console.log(error)
      }
      
      navigation.navigate("Principal", account)
    }
    //const response = await api.post('/users', { username: user })

  }
  function validateInputs() {
    if (account.name.length != 0) {
      if (account.email.length != 0) {
        if (account.password.length != 0) {
          return true;
        } else {
          ToastAndroid.show('Digite a senha', ToastAndroid.SHORT);
          return false;
        }
      } else {
        ToastAndroid.show('Digite o e-mail', ToastAndroid.SHORT);
        return false;
      }
    } else {
      ToastAndroid.show('Digite seu nome', ToastAndroid.SHORT);
      return false;
    }
  }
  return (
    <View style={styles.body}>
      <View style={styles.form}>
        <Text style={styles.label}>Digite seu nome</Text>
        <TextInput
          onChangeText={val => account.name = val}
          placeholder="Seu nome"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          maxLength={15}
        />
        <Text style={styles.label}>Digite seu e-mail</Text>
        <TextInput
          onChangeText={val => account.email = val}
          placeholder="Seu e-mail"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <Text style={styles.label}>Digite sua senha</Text>
        <TextInput
          onChangeText={val => account.password = val}
          placeholder="Sua senha"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Criar conta e Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff"
  }, form: {

  },
  input: {
    height: 46,
    backgroundColor: "#f9f9f9",
    borderColor: '#4E7AF3',
    borderBottomWidth: 1,
    borderRadius: 4,
    marginVertical: 0,
    marginHorizontal: 10,
    paddingHorizontal: 15,
  },
  submitBtn: {
    borderRadius: 10,
    backgroundColor: '#4E7AF3',
    width: 310,
    margin: 10,
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute'
  },
  submitBtnText: {
    fontSize: 20,
    color: "#fff",
    padding: 8,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    color: '#00000090',
    marginTop: 2,
    marginLeft: 10,
  }
})