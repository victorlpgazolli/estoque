
import React, { useEffect, useState } from 'react';
import { FlatList, Dimensions, StyleSheet, TextInput, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'
const { width, height } = Dimensions.get('window');
global.operation = false
global.transaction = false;
global.pastTransactions = [];
export default function Product({ navigation }) {
    const [qnt, updateQnt] = useState('')
    const [isNew, updateisNew] = useState(false);
    const [product, setProduct] = useState([]);
    const [pastTransactions, setPastTransactions] = useState([]);
    useEffect(() => {
        // setPastTransactions(pastTransactions.concat(newTransaction))
        const { account, produto, action, operation } = navigation.state.params
        setProduct(produto)
        global.transaction = action;
        global.account = account;
        global.operation = operation;
        setTimeout(async () => {
            try {
                if (product) {
                    if (product.Codigo != undefined) {
                        const { data } = await api.post('/product/operation/list', { id: product.Codigo });
                        global.pastTransactions = data.recordset;
                        setPastTransactions(global.pastTransactions)
                        console.log(pastTransactions)
                    }
                } else {
                }
            } catch (error) {
                console.log(error)
            }
        }, 500)
    }, [product]);

    // if (global.pastTransactions.length == 0) {
    //     setTimeout(() => {
    //     }, 700)
    // }
    function handleConfirm() {
        // if ( product.Quantidade_Atual - qnt < 0) {
        // ToastAndroid.show('Imposível realizar operação', ToastAndroid.SHORT)
        // toastRef.show('hello toast');
        // } else {
        if (qnt.length == 0) {
            ToastAndroid.show('Defina uma quantidade primeiro', ToastAndroid.SHORT)
        } else {
            makeOperation();
        }
        // }
    }
    async function makeOperation() {
        try {
            if (global.account.id == undefined) {
                AsyncStorage.getItem('@account_id').then(stored_id => {
                    try {
                        if (stored_id.length > 0) {
                            async function getAccount() {
                                const { data } = await api.get('/user/' + stored_id)
                                const { recordset: results } = data
                                global.account = {
                                    name: results[0].nm_usuario,
                                    email: results[0].nm_email,
                                    password: results[0].cd_senha,
                                    id: results[0].cd_usuario,
                                }
                                const response = await api.post('/product/operation', { qnt: qnt, id: product.Codigo, type: global.operation ? 'compra' : 'venda', userId: global.account.id })
                                if (response.status == 200) {
                                    ToastAndroid.show(`Atualizado com sucesso`, ToastAndroid.SHORT);
                                    navigation.navigate('Produtos')
                                }
                            }
                            getAccount()
                        }
                    } catch{

                    }

                })
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (

        <View
            style={styles.container}>

            <View style={styles.infoView}>
                <View style={[styles.infoViewChild]}>
                    <Text style={[styles.itemsText]}>Nome: </Text>
                    <Text style={[styles.itemsText]}>Quantidade Atual: </Text>
                    <Text style={[styles.itemsText]}>Quantidade Min: </Text>
                    <Text style={[styles.itemsText]}>Preço: </Text>
                </View>
                <View style={[styles.infoViewChild]}>
                    <Text style={[styles.itemsText]}>{product.Produto}</Text>
                    <Text style={[styles.itemsText]}>{product.Quantidade_Atual} {global.operation ?
                        qnt.length > 0 ?
                            <Text>+ {qnt}</Text> : null :
                        qnt.length > 0 ?
                            <Text>- {qnt}</Text> : null
                    }</Text>
                    <Text style={[styles.itemsText]}>{product.Quantidade_Min}</Text>
                    <Text style={[styles.itemsText]}>{product.Valor_Produto}</Text>
                </View>
            </View>
            {
                global.transaction ?
                    <View style={[styles.shadow, {}]}>
                        <View style={[]}>
                            <TextInput
                                onChangeText={val => updateQnt(val)}
                                placeholder={global.operation ? 'Adicionar' : 'Remover'}
                                keyboardType='numeric'
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                            />
                            <View style={[{ backgroundColor: '#ffffff00', flexDirection: 'row' }]}>
                                <View style={[{ marginRight: 'auto' }]}>
                                    <TouchableOpacity onPress={() => { global.operation = false; navigation.navigate('Produtos') }} style={[styles.submitBtn, styles.shadow]}>
                                        <Text style={[styles.submitBtnText, styles.colorBlack]}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[{ marginLeft: 'auto' }]}>
                                    <TouchableOpacity onPress={handleConfirm} style={[styles.submitBtn, styles.shadow]}>
                                        <Text style={[styles.submitBtnText, styles.colorBlack]}>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={[]}>
                        <Text style={[{ color: "#000", fontSize: 18, alignItems: 'center' }]}>Histórico de transferências</Text>
                        <FlatList
                            data={global.pastTransactions}
                            contentContainerStyle={[styles.shadow, styles.productItem, { alignItems: 'center' }]}
                            keyExtractor={(item) => item.codigo}
                            renderItem={({ item }) => (
                                <View style={[{ paddingVertical: 3 }]}>
                                    <Text style={[{ color: "#000", fontSize: 18 }]}>{item.tipo} de {item.quantidade} Un. pelo {item.usuario}</Text>
                                </View>
                            )}>
                        </FlatList>
                    </View>
            }


            {/* <Footer style={{ backgroundColor: '#fff' }}>
                <TouchableOpacity onPress={() => { global.operation = true; global.transaction = false; forceUpdate() }} style={[styles.submitBtn, styles.floatRight, styles.colorRed]}>
                    <Text style={styles.submitBtnText}>Remover</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { global.operation = true; global.transaction = true; forceUpdate() }} style={[styles.submitBtn, styles.floatLeft, styles.colorBlue]}>
                    <Text style={styles.submitBtnText}>Adicionar</Text>
                </TouchableOpacity>
            </Footer> */}
        </View>
    );
};
// };
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    images: {
        height: 120,
        width: "100%",
    },
    colorBlack: {
        color: '#000',
        fontSize: 16
    },
    infoView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    infoViewChild: {
        paddingHorizontal: 40,
        borderColor: '#000',
        borderWidth: 1,
        height: 120,
        paddingTop: 10,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    submitBtn: {
        borderColor: '#00000000',
        backgroundColor: '#fff',
        borderWidth: 1,
        width: width / 2 - 11,
        height: 55,
        margin: 10,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        fontSize: 20,
        color: "#fff",

    },
    colorRed: {
        backgroundColor: '#c43b3b',
    },
    colorBlue: {
        backgroundColor: '#4E7AF3',
    },
    floatCenter: {
        alignSelf: 'center'
    },
    input: {
        height: 46,
        backgroundColor: "#f9f9f9",
        borderColor: '#4E7AF3',
        borderBottomWidth: 1,
        borderRadius: 4,
        marginVertical: 0,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginTop: 10
    },
    itemsText: {
        color: '#000',
        fontSize: 18,
    },
    description: {
        height: 100
    },
    productItem: {
        borderBottomWidth: 0.5,
        borderRadius: 10,
        borderColor: 'rgba(0,0,0,0.3)',
        marginVertical: 3,
        marginHorizontal: 10,
        backgroundColor: "#fff",
    },

})