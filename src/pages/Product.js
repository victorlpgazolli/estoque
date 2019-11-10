
import React, { Component, useEffect, useState, useRef } from 'react';
import { ScrollView, Dimensions, StyleSheet, Button, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { Footer } from 'native-base';

import { TextInput } from 'react-native-gesture-handler';
const _height = Dimensions.get('window').height
const _width = Dimensions.get('window').width
global.operation = false
global.transaction = true;

export default function Product({ navigation }) {
    const [qnt, updateQnt] = useState('')
    const [product, setProduct] = useState([]);
    useEffect(() => {
        try {
            if (product) {
                var { produto } = navigation.state.params
                setProduct(produto)
                var { action } = navigation.state.params
                var { operation } = navigation.state.params
                global.transaction = action;
                global.operation = operation;
            } else {
            }
        } catch{
            navigation.navigate('Principal')
        }
    }, [global.operation]);
    function handleConfirm() {
        if (qnt < product.Quantidade_Atual) {
            ToastAndroid.show('Imposível realizar operação', ToastAndroid.SHORT)
            // toastRef.show('hello toast');
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
                            <Footer style={[{ backgroundColor: '#ffffff00', flexDirection: 'row' }]}>
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
                            </Footer>
                        </View>
                    </View> : null
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
        width: _width / 2 - 11,
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


})