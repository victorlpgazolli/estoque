
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

var isVisible = false;
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ backgroundColor: '#fff' }}></View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
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
  Produtos: {
    screen: Produtos,
    navigationOptions: ({ navigation }) => ({
      title: 'Lista de Produtos',
      headerLeft: null,
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => navigation.navigate('Configurações')}>
            <Icon name='cogs' size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => { isVisible = !isVisible; navigation.setParams({ visible: isVisible }) }}>
            <Icon name='search' size={24} />
          </TouchableOpacity>
        </View>
      ),
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
  },
  tabNav: {
    screen: tabNav,
    navigationOptions: ({ navigation }) => ({
      title: 'Configurações',
      // headerRight: (
      //   <View style={[styles.iconContainer]}>
      //     <TouchableOpacity onPress={() => navigation.state.params.displaySearch()}>
      //       <Icon name='search' size={24} />
      //     </TouchableOpacity>
      //     <TouchableOpacity onPress={() => navigation.state.params.displaySearch()}>
      //       <Icon name='cogs' size={24} />
      //     </TouchableOpacity>
      //   </View>
      // ),
      // headerRight: (
      //   <View style={{ flexDirection: 'row' }}>
      //     <TouchableOpacity onPress={() => navigation.state.params.displaySearch()}>
      //       <Icon name='search' size={24} />
      //     </TouchableOpacity>
      //     <TouchableOpacity onPress={() => navigation.state.params.displaySearch()}>
      //       <Icon name='cogs' size={24} />
      //     </TouchableOpacity>
      //   </View>
      // ),
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
      headerLeft: null
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
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});
