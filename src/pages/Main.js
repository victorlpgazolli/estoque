
import React, { useEffect, useState, Component, useCallback } from 'react';
import { KeyboardAvoidingView, ScrollView, UIManager, TextInput, Dimensions, StyleSheet, Image, View, Text, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native'
import Modal from "react-native-modal";
import * as Animatable from 'react-native-animatable';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { Footer } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'
import Icon from 'react-native-vector-icons/FontAwesome';
// var product = [{
//   nm_produto: 'eita',
//   cd_produto: 1,
//   qt_produto_atual: 10
// }]
global.popup_actions = false;
global.popup_register = false;
global.products = []
global.categories = []
global.tempProd = {}
const KEYS_TO_FILTERS = ['product.nm_produto', 'nm_produto'];
var _text = 'Carregando...', _color = 'transparent', servidorIsOff = true, loading = true, searchTerms = false;
class ServidorState extends Component {
  state = { products: [] }
  async componentDidMount() {
    try {

      servidorIsOff = false;
      loading = false;
    } catch (err) {
      // TODO
      // adicionar tratamento da exceção
      ToastAndroid.show(`${err}`, ToastAndroid.SHORT);
      if (err.toString().includes("502")) {
        _text = 'Problemas na conexão';
        _color = '#FF5632'
        servidorIsOff = true;

      } else {
        // servidorIsOff = false;
        // forceUpdate();
      }
    }
  }
  render() {
    return (
      <View style={{
        width: this.props.barWidth, backgroundColor: this.props.colorToShow, justifyContent: 'center',
        alignItems: "center", padding: 2
      }}><Text>{this.props.textToShow}</Text></View>
    )
  }
}
export default function Main({ navigation }) {
  const [products, setProduct] = useState([]);
  const [, updateState] = React.useState();
  const [isNew, updateisNew] = useState(false);
  const [term, updateiTerm] = useState('');
  const forceUpdate = useCallback(() => updateState({}), []);
  useEffect(() => {
    setTimeout(async () => {
      try {
        const { data } = await api.get('/product/list')
        const { data: _categories } = await api.get('/category/list')
        global.categories = Object.keys(_categories).map(function (key) {
          return [_categories[key]];
        });
        console.log(global.categories)
        servidorIsOff = false;
        global.products = data
        loading = false;
        setProduct(global.products)
      } catch (err) {
        _text = 'Problemas na conexão';
        _color = '#FF5632'
        servidorIsOff = true;
        loading = false;
        forceUpdate()
      }
    }, 2000)
  }, [isNew])
  searchTerms = navigation.getParam('visible', false)

  var showPopup = function (popup, product) {
    global.tempProd = product;
    if (popup == 1) {
      global.popup_actions = true;
    } else if (popup == 2) {
      global.popup_register = true;
    }
    forceUpdate()
  }
  var hidePopup = function (popup, product) {
    global.tempProd = {};
    if (popup == 1) {
      global.popup_actions = false;
    } else if (popup == 2) {
      global.popup_register = false;
    }
    forceUpdate()
  }
  function handleConfirm() {

  }
  function searchUpdated(term) {
    updateiTerm(term)
  }
  async function deleteProd(codigo_prod) {
    let _produto = {
      codigo: codigo_prod
    }

    const response = await api.post('/product/delete', _produto)
    if (response.status == 200) {
      ToastAndroid.show(`Deletado com sucesso`, ToastAndroid.SHORT);
      global.popup_actions = false;
      _text = 'Carregando...', _color = 'transparent', servidorIsOff = true, loading = true;
      updateisNew(!isNew)
    }
  }
  const filteredProducts = global.products.filter(createFilter(term, KEYS_TO_FILTERS))
  return (
    //global.products
    <View style={styles.container}>
      {
        servidorIsOff ? <ServidorState barWidth={Dimensions.get('window').width} textToShow={_text || 'Problemas na conexão'} colorToShow={_color || '#FF5632'} /> : null
      }
      {
        searchTerms ?
          <SearchInput
            onChangeText={(term) => { searchUpdated(term) }}
            style={[styles.searchInput]}
            placeholder="Pesquisar por nome"
          /> : null
      }
      <ScrollView>
        {filteredProducts.map(product => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Product', { produto: product, action: null })} key={product.cd_produto} style={styles.productItem}>
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
                    {/* <Text style={[styles.productTag, styles.productInfoItem]}>{product.fk_categoria}</Text>
                    <Text style={[styles.productTagInfo, styles.productDetais]}>categoria</Text> */}
                    {/* <PopupMenu actions={['Editar quantidade', 'Apagar']} style={{ width: 50 }} onPress={onPopupEvent} /> */}
                    <TouchableOpacity style={{ width: 40, height: 30, alignItems: 'center', justifyContent: "center" }} onPress={() => { showPopup(1, product) }}>
                      <Icon name='ellipsis-v' size={24} />
                    </TouchableOpacity>
                    <Modal backdropColor={'#00000030'} isVisible={global.popup_actions}
                      backdropOpacity={1}
                      animationIn="slideInDown"
                      animationOut="slideOutDown"
                      animationInTiming={600}
                      animationOutTiming={600}
                      onBackdropPress={() => { hidePopup(1, product) }}>
                      <View style={{ flex: 1 }}>
                        <View style={[styles.operation]}>
                          <View style={[styles.card, styles.shadow]}>
                            {/* <TextInput
                              onChangeText={val => qnt_atual = val}
                              placeholder={global.transaction ? 'Adicionar' : 'Remover'}
                              autoCapitalize="none"
                              autoCorrect={false}
                              style={styles.input}
                            /> */}
                            <Text style={[styles.submitBtnText, styles.colorBlack]}>Operação que deseja fazer:</Text>
                            <View style={[styles.actions]}>
                              <TouchableOpacity onPress={() => { navigation.navigate('Product', { produto: global.tempProd, action: true }); hidePopup(1); }} style={[styles.submitBtn, styles.indivAction, styles.floatRight]}>
                                <Text style={[styles.submitBtnText, styles.colorBlack]}>Adicionar quantidade de produtos</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { navigation.navigate('Product', { produto: global.tempProd, action: false }); hidePopup(1); }} style={[styles.submitBtn, styles.indivAction, styles.floatLeft,]}>
                                <Text style={[styles.submitBtnText, styles.colorBlack]}>Remover quantidade de produtos</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { deleteProd(global.tempProd.cd_produto) }} style={[styles.submitBtn, styles.indivAction, styles.floatLeft,]}>
                                <Text style={[styles.submitBtnText, styles.colorBlack]}>Apagar produto</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Modal>

                    <Modal backdropColor={'#00000030'} isVisible={global.popup_register}
                      animationIn="slideInDown"
                      animationOut="slideOutDown"
                      animationInTiming={600}
                      animationOutTiming={600}
                      onBackdropPress={() => { hidePopup(2) }}>
                      <View style={{ flex: 1 }}>
                        <View style={[styles.operation]}>
                          <View style={[styles.card, styles.shadow, { height: 150 }]}>
                            {/* <TextInput
                              onChangeText={val => qnt_atual = val}
                              placeholder={global.transaction ? 'Adicionar' : 'Remover'}
                              autoCapitalize="none"
                              autoCorrect={false}
                              style={styles.input}
                            /> */}
                            <Text style={[styles.submitBtnText, styles.colorBlack]}>Operação que deseja fazer:</Text>
                            <View style={[styles.actions]}>
                              <TouchableOpacity onPress={() => { navigation.navigate("CadastrarProduto", global.categories); hidePopup(2); }} style={[styles.submitBtn, styles.indivAction, styles.floatRight]}>
                                <Text style={[styles.submitBtnText, styles.colorBlack]}>Cadastrar Novo Produto</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { navigation.navigate("CadastrarCategoria", global.categories); hidePopup(2); }} style={[styles.submitBtn, styles.indivAction, styles.floatLeft,]}>
                                <Text style={[styles.submitBtnText, styles.colorBlack]}>Cadastrar Nova Categoria</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <TouchableOpacity disabled={servidorIsOff} onPress={() => { showPopup(2) }} style={[styles.floatingBtn, styles.floatRight]}>
        <Text style={styles.floatingBtnText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={loading} onPress={() => { servidorIsOff = true; updateisNew(!isNew) }} style={[styles.floatingBtn, styles.floatLeft]}>
        <Text style={styles.floatingBtnText}>↻</Text>
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
  actions: {
    margin: 10,
  },
  indivAction: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#00000060',
    borderWidth: 1,
  },
  colorBlack: {
    color: '#000',
    fontSize: 16
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
  operation: {
    paddingHorizontal: 10,
    top: 150,
    position: 'absolute',
    height: 140,
    paddingTop: 10,
    right: 0,
    left: 0
  },
  card: {
    padding: 10,
    backgroundColor: '#ffffff80',
    height: 200,
    margin: 0,
    minWidth: 330,
    alignSelf: "center"
  },
  operationBTN: {
    position: 'absolute',
    width: '30%',
    borderRadius: 12,
    borderWidth: 1,
    bottom: 10,
  },
  rightMargin: {
    marginRight: '50%',
    marginLeft: 20,
  },
  leftMargin: {
    marginLeft: '50%',
    marginRight: 0,
  },
  shadow: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  floatRight: {
    right: 0
  },
  floatLeft: {
    left: 0
  },
  floatingBtnText: {
    fontSize: 40,
    color: "#fff",
    justifyContent: 'center',
    alignSelf: 'center',
  }
});