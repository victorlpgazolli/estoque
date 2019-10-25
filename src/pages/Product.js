
import React, { Component, useEffect, useState, useCallback } from 'react';
import { ScrollView, Platform, StyleSheet, Button, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { Footer } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';

global.operation = false
global.transaction = true;
var qnt_atual = ''
export default function Product({ navigation }) {
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        try {
            if (product) {
                setProduct(navigation.state.params)
            } else {
            }
        } catch{
            navigation.navigate('Principal')
        }
    }, [global.operation]);
    function handleConfirm(){

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
                    <Text style={[styles.itemsText]}>{product.nm_produto}</Text>
                    <Text style={[styles.itemsText]}>{product.qt_produto_atual}</Text>
                    <Text style={[styles.itemsText]}>{product.qt_produto_min}</Text>
                    <Text style={[styles.itemsText]}>{product.vl_produto_atual}</Text>
                </View>
            </View>
            {
                global.operation ? <View style={[styles.operation]}>
                <View style={[styles.card, styles.shadow]}>
                    <TextInput
                        onChangeText={val => qnt_atual = val}
                        placeholder={global.transaction  ? 'Adicionar': 'Remover'}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    />
                    <Footer style={{ backgroundColor: '#fff' }}>
                        <TouchableOpacity onPress={()=>{global.operation = false; forceUpdate()}} style={[styles.submitBtn, styles.floatRight]}>
                            <Text style={[styles.submitBtnText, styles.colorBlack]}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleConfirm} style={[styles.submitBtn, styles.floatLeft,]}>
                            <Text style={[styles.submitBtnText, styles.colorBlack]}>Confirmar</Text>
                        </TouchableOpacity>
                    </Footer>
                </View>
            </View> : null
            }


            <Footer style={{ backgroundColor: '#fff' }}>
                <TouchableOpacity onPress={() => { global.operation = true; global.transaction = false; forceUpdate() }} style={[styles.submitBtn, styles.floatRight, styles.colorRed]}>
                    <Text style={styles.submitBtnText}>Remover</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { global.operation = true; global.transaction = true; forceUpdate() }} style={[styles.submitBtn, styles.floatLeft, styles.colorBlue]}>
                    <Text style={styles.submitBtnText}>Adicionar</Text>
                </TouchableOpacity>
            </Footer>
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
        flex: 1,
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
        height: '90%',
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
        marginHorizontal: 30,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10
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
    floatRight: {
        alignSelf: 'center'
    },
    floatLeft: {
        alignSelf: 'center'
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
    itemsText: {
        color: '#000',
        fontSize: 18,
    },
    description: {
        height: 100
    },


})