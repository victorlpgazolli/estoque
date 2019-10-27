
import React, { useEffect, useState, useCallback, Component } from 'react';
import { View, StyleSheet, Text, BackHandler, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
var _product = {
  name: '',
  valor_atual: '',
  qnt_min: '',
  qnt_atual: '',
  category: ''
}

// import SelectBox from '../assets/SelectBox'
import api from '../services/api';
var categories = []
class SelectBox extends Component {
  state = { categories: [], selectedCategory: '' }
  updateUser = (_category) => {
    _product.category = _category;
    this.setState({ selectedCategory: _category })
  }
  UNSAFE_componentWillMount() {

    // console.log(this.props.categories);
    // var temp = Object.keys(this.props.categories).map(i => JSON.parse(this.props.categories[Number(i)])) 
    // this.setState({ categories: this.props.categories })
    // console.log(`${(this.props.categories)}`);
    for (let i = 0; i < this.props.categories.length; i++) {
      categories.pop()
    }
    for (let i = 0; i < this.props.categories.length; i++) {
      var key = this.props.categories[i][0].cd_categoria;
      var label = this.props.categories[i][0].nm_categoria;
      var color = '#000'
      if (categories.includes(`${label}`)) {
        console.info(categories[i])
      }
      categories.push({ label: label, value: key, color: color })
      this.setState({ categories: categories })

    }
    // this.props.categories.foreach((item) => { 
    //   this.setState({categories: categories.push(item)})
    // })
  }
  render() {
    return (
      <View style={[styles.selectView]}>
        <RNPickerSelect itemKey={this.state.selectedCategory}
          style={pickerSelectStyles}
          onValueChange={this.updateUser}
          items={categories}>
        </RNPickerSelect>
      </View>
    )
  }
}

export default function RegisterProduct({ navigation }) {
  useEffect(() => {

  }, [])
  const handleBackButton = function () {
    navigation.navigate('Produtos', { ok: 'ok' })
    return true;
  }
  BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  async function handleSubmit() {
    if (validateInputs(1)) {
      try {
        const response = await api.post('/product/add', _product)
        if(response.status == 200){
          ToastAndroid.show("Produto cadastrado", ToastAndroid.SHORT);
          navigation.navigate("Principal")
        }
      } catch (error) {
        ToastAndroid.show("problema ao cadastrar produto", ToastAndroid.SHORT);
      }

      navigation.navigate("Principal")
    }
    //const response = await api.post('/users', { username: user })

  }
  function validateInputs(_type) {
    if (_product.name.length != 0) {
      if (_product.qnt_atual.length != 0) {
        if (_product.qnt_min.length != 0) {
          if (_product.valor_atual.length != 0) {
            return true;
          } else {
            _type == 1 ? ToastAndroid.show('Digite o preço', ToastAndroid.SHORT) : null;
            return false;
          }
        } else {
          _type == 1 ? ToastAndroid.show('Digite a quantidade mínima', ToastAndroid.SHORT) : null;
          return false;
        }
      } else {
        _type == 1 ? ToastAndroid.show('Digite a quantidade atual', ToastAndroid.SHORT) : null;
        return false;
      }
    } else {
      _type == 1 ? ToastAndroid.show('Digite o nome', ToastAndroid.SHORT) : null
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
        <Text style={styles.label}>Digite o preço do produto</Text>
        <TextInput
          onChangeText={val => _product.valor_atual = val}
          placeholder="Preço do produto"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          maxLength={15}
        />
        <Text style={styles.label}>Digite a quantidade atual</Text>
        <TextInput
          onChangeText={val => _product.qnt_atual = val}
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
        />
      </View>
      <SelectBox categories={navigation.state.params} />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
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