
import React from 'react';
import { View, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api';
var account = {
  name: '',
  email: '',
  password: '',
  id: ''
}

export default function Main({ navigation }) {
  async function handleRegister() {
    if (validateInputs()) {
      try {
        const { data } = await api.post('/user/add', {
          username: account.name,
          password: account.password,
          email: account.email
        })
        data.error ?
          ToastAndroid.show("E-mail já cadastrado", ToastAndroid.SHORT) :
          accessGranted(data.recordset[0])
      } catch (error) {
        ToastAndroid.show("problema ao criar conta", ToastAndroid.SHORT);
      }


    }
    //const response = await api.post('/users', { username: user })

  }
  async function accessGranted(user) {
    try {
      account.id = user.cd_usuario;
      await AsyncStorage.setItem('@account_id', user.cd_usuario.toString());
      console.info(account)
      navigation.navigate("Produtos", account)
    } catch{

    }
  }
  function validateInputs() {
    if (account.name.trim().length != 0 && account.email.trim().length != 0 && account.password.trim().length != 0) {
      return true;
    } else {
      ToastAndroid.show('Digite os campos', ToastAndroid.SHORT);
      return false;
    }
  }
  return (
    <View style={styles.body}>
      <View style={styles.form}>
        <TextInput
          onChangeText={val => account.name = val}
          placeholder="Digite seu nome"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          maxLength={15}
        />
        <TextInput
          onChangeText={val => account.email = val}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          onChangeText={val => account.password = val}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
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
    backgroundColor: '#fff'
  }, form: {

  },
  input: {
    height: 46,
    backgroundColor: "#fcfcfc",
    borderColor: "#4E7AF3",
    borderBottomWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    marginHorizontal: 10,
    color: '#000',
    paddingHorizontal: 15,
  },
  submitBtn: {
    borderRadius: 10,
    backgroundColor: "#4E7AF3",
    width: 310,
    margin: 25,
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
    color: '#999',
    marginTop: 2,
    marginLeft: 10,
  }
})