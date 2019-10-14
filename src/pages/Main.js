
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, Dimensions, StyleSheet, Image, View, Text, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native'
import MSSQL from 'react-native-mssql';
import AsyncStorage from '@react-native-community/async-storage'
import products from '../assets/products';

export default function Main({ navigation }) {
  AsyncStorage.getItem('host').then(host => {
    if (host.length > 0) {
      console.log(host)
    } else {

    }
  })
  let config = {
    server: '192.168.1.1', //ip address of the mssql database
    username: 'sa', //username to login to the database
    password: 'password', //password to login to the database
    database: 'admin', //the name of the database to connect to
    port: 1234 //OPTIONAL, port of the database on the server
}
// MSSQL.connect(config);

  return (

    <View style={styles.container}>
      {/* {this.props.navigation.getParam(searchState, true) && */}

      <ScrollView>
        {products.map(product => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Product', product)} key={product.id} style={styles.productItem}>

              {/* <Image
                  style={styles.images}
                  source={product.image}
                  resizeMode='cover'
                /> */}
              <View style={styles.productInfo}>
                <Text style={[styles.productName, styles.productInfoItem]}>{product.name}</Text>
                <View style={[styles.qntView]}>
                  <Text style={[styles.productTag, styles.productInfoItem]}>{product.qnt}</Text>
                  <Text style={[styles.productTagInfo, styles.productDetais]}>quantidade</Text>
                </View>

              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("CadastrarProduto")} style={styles.floatingBtn}>
        <Text style={styles.floatingBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
// };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'flex-start'
  },
  productItem: {
    borderBottomWidth: 0.5,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.3)',
    marginVertical: 3,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  productInfoItem: {
    alignSelf: 'center'
  },
  productName: {
    color: '#000',
    fontSize: 16,
    width: '80%'
  },
  qntView: {
    width: '20%',
    alignSelf: 'center'
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 14,
  },
  productTag: {
    color: '#000',

    // paddingRight: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  productTagInfo: {

  },
  productDetais: {
    color: '#ccc',
    fontSize: 12,
  },
  images: {
    height: 60,
    width: "100%",
    flex: 1,

  },

  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  floatingBtn: {
    borderRadius: 30,
    backgroundColor: '#34a4eb',
    width: 60,
    height: 60,
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  floatingBtnText: {
    fontSize: 40,
    color: "#fff",
    justifyContent: 'center',
    alignSelf: 'center',
  }
});