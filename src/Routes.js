
import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, Dimensions, StyleSheet, Image, View, Text, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native'
import { createStackNavigator, createAppContainer, HeaderBackButton } from 'react-navigation';
import Login from './pages/Login'
import Main from './pages/Main'
import Cadastrar from './pages/Register'
import CadastrarProduto from './pages/RegisterProduct'
import Config from './pages/Config'
import Product from './pages/Product'

const tabBarOptions = {
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
  style: {
    padding: 15,
    fontSize: 20,
  },
}
var navigationOptions_main = ({ navigation }) => {
  return {
    title: 'Lista de Produtos',
    headerRight: (<TouchableOpacity onPress={() => { navigation.navigate('Config') }}>
        {/* <Image
          style={{ width: 30, height: 30, marginRight: 10 }}
          source={require('./assets/information.png')}
        /> */}<Text>.</Text>
      </TouchableOpacity>)
  };
};
export default createAppContainer(
  createStackNavigator({
    Principal: {
      screen: Main,
      navigationOptions: navigationOptions_main
    },
    Config:{
      screen: Config,
      navigationOptions: ({ navigation }) => ({

        headerLeft: (<HeaderBackButton onPress={() => navigation.navigate('Principal')}/>)

    })
    },
    Product:{
      screen: Product,
      navigationOptions: () => ({

      }),
    },
    CadastrarProduto:{
      screen: CadastrarProduto,
      navigationOptions: () => ({
        title: 'Cadastrar Produto',
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: 'Login',
        headerLeft: null
      }),
    },
    CadastrarLogin: {
      screen: Cadastrar,
      navigationOptions: () => ({
        title: 'Criar Conta',
      }),
    },
  },
    {
      tabBarOptions: tabBarOptions,
    })
);