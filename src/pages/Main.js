
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, Dimensions, StyleSheet, Image, View, Text, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'
// var product = [{
//   nm_produto: 'eita',
//   cd_produto: 1,
//   qt_produto_atual: 10
// }]
export default function Main({ navigation }) {
  const [products, setProduct] = useState([]);
  useEffect(async () => {
    try {
      const response = await api.get('/product/list')
      var tempArray = response.data
      // console.info(response.data);
      response.data.forEach(async (prod, index) => {
        const { data } = await api.get('/category/' + prod.fk_categoria)
        console.log(data[0].nm_categoria + tempArray[index].fk_categoria)
        tempArray[index].fk_categoria =  data.nm_categoria
      })
      setProduct(response.data)

      // console.log("EITA POURA: " +products)

      // setProduct(product)

      //const { docs } = response.data;

      //console.log(docs);

    } catch (err) {
      // TODO
      // adicionar tratamento da exceção
      console.log(err);
    }
    // const response = await api.get('/product/list')

    // console.log(response)
  }, []);

  // AsyncStorage.getItem('host').then(host => {
  // })

  return (

    <View style={styles.container}>
      <ScrollView>
        {products.map(product => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Product', product)} key={product.cd_produto} style={styles.productItem}>
              <View style={styles.productInfo}>
                <Text style={[styles.productName, styles.productInfoItem]}>{product.nm_produto}</Text>
                <View style={[styles.infoView]}>

                  <View style={[styles.qntView]}>
                    <Text style={[styles.productTag, styles.productInfoItem]}>{product.qt_produto_min}</Text>
                    <Text style={[styles.productTagInfo, styles.productDetais]}>qnt
                    minima</Text>
                  </View>
                  <View style={[styles.qntView]}>
                    <Text style={[styles.productTag, styles.productInfoItem]}>{product.qt_produto_atual}</Text>
                    <Text style={[styles.productTagInfo, styles.productDetais]}>qnt atual</Text>
                  </View>
                  <View style={[styles.qntView]}>
                    <Text style={[styles.productTag, styles.productInfoItem]}>{product.fk_categoria}</Text>
                    <Text style={[styles.productTagInfo, styles.productDetais]}>categoria</Text>
                  </View>
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
    fontSize: 14,
    width: '30%'
  },
  qntView: {
    alignSelf: 'center',
    paddingHorizontal: 12
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
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
  connect: {
    left: 0,
    backgroundColor: '#00c903',
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