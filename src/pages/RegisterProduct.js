
import React from 'react';
import { View, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
var _product = {
  name: '',
  qnt: '',
  qnt_min: ''
}

export default function Main({ navigation }) {
  async function handleRegister() {
    if (validateInputs()) {
      try {
// funçao de inserir
      } catch (error) {
        ToastAndroid.show("problema ao cadastrar produto", ToastAndroid.SHORT);
        console.log(error)
      }
      
      navigation.navigate("Principal")
    }
    //const response = await api.post('/users', { username: user })

  }
  function validateInputs() {
    if (_product.name.length != 0) {
      if (_product.qnt.length != 0) {
        if (_product.qnt_min.length != 0) {
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
        <Text style={styles.label}>Digite o nome do produto</Text>
        <TextInput
          onChangeText={val => _product.name = val}
          placeholder="Nome do produto"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          maxLength={15}
        />
        <Text style={styles.label}>Digite a quantidade atual</Text>
        <TextInput
          onChangeText={val => _product.qnt = val}
          placeholder="Quantidade ATUAL"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <Text style={styles.label}>Digite o estoque mínimo</Text>
        <TextInput
          onChangeText={val => _product.qnt_min = val}
          placeholder="Estoque MÍNIMO"
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