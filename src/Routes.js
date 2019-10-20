
import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, Dimensions, StyleSheet, Image, View, Text, TouchableOpacity, SafeAreaView, ToastAndroid } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './pages/Login'
import Produtos from './pages/Main'
import Cadastrar from './pages/Register'
import CadastrarProduto from './pages/RegisterProduct'
import Configurações from './pages/Config'
import Product from './pages/Product'

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ backgroundColor: '#fff' }}></View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)
//createAppContainer
const drawerNav = createDrawerNavigator({
  Produtos: Produtos
}, { contentComponent: CustomDrawerComponent, drawerWidth: Dimensions.get('window').width - 120, }
)
const tabNav = createBottomTabNavigator({
  Produtos: {
    screen: Produtos,
    navigationOptions: ({ navigation }) => ({
      title: 'Lista de Produtos',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='home' size={24} />
      ),
    }),
  },
  Configurações: {
    screen: Configurações,
    navigationOptions: ({ navigation }) => ({
      title: 'Configurações',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='cogs' size={24} />
      ),
    }),
  }
}, {
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: routeName
    }
  }
})

const appNav = createStackNavigator({

  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Login',
      headerLeft: null
    }),
  },
  tabNav: {
    screen: tabNav,
    navigationOptions: ({ navigation }) => ({
      title: 'Configurações',
      headerLeft: null,
      title: 'Configurações',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='cogs' size={24} />
      ),
    }),
  },
  Product: {
    screen: Product,
    navigationOptions: ({ navigation }) => ({

    }),
  },
  CadastrarProduto: {
    screen: CadastrarProduto,
    navigationOptions: ({ navigation }) => ({
      title: 'Cadastrar Produto',
    }),
  },
  CadastrarLogin: {
    screen: Cadastrar,
    navigationOptions: ({ navigation }) => ({
      title: 'Criar Conta',
    }),
  },
  
  // {
  //   defaultNavigationOptions: ({ navigation }) => {
  //     return {
  //       headerLeft: (
  //         <Icon style={{ paddingLeft: 10 }}
  //           onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
  //           name="bars" size={30} />
  //       )
  //     }
  //   }
},
{ contentComponent: CustomDrawerComponent, drawerWidth: Dimensions.get('window').width - 120, }
);
export default createAppContainer(appNav)

// headerLeft: (
//   <Icon style={{ paddingLeft: 10 }}
//     onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//     name="bars" size={30} />
// )
