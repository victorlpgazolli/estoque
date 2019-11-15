
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, KeyboardAvoidingView, ScrollView, Dimensions, TextInput, StyleSheet, Image, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from "react-native-modal";
global.newPass = ''
global.popup_actions = false;
global.popup_register = false;
const _width = Dimensions.get('window').width
const _height = Dimensions.get('window').height
export default function Main({ navigation }) {
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [conta, updateConta] = useState([]);
    useEffect(() => {
        try {
            updateConta(navigation.state.params.account)
            // const { account: conta } = navigation.state.params



        } catch (err) {

        }
    }, [conta]);
    async function handleSubmit() {
        if (account.cd_usuario.length > 0 && account.nm_usuario.length > 0 && account.cd_senha.length > 0 && account.nm_email.length > 0) {
            try {
                ToastAndroid.show("Salvo!", ToastAndroid.SHORT);
                navigation.navigate("Produtos", account)
            } catch (error) {
                ToastAndroid.show("Problema ao salvar", ToastAndroid.SHORT);
                console.log(error)
            }

        } else {
            ToastAndroid.show("Digite os campos", ToastAndroid.SHORT);
        }

    }
    var showPopup = function (popup, _account) {
        // global.tempProd = _account;
        global.popup_register = true;
        forceUpdate()
    }
    var hidePopup = function (popup) {
        // global.tempProd = {};
        global.popup_register = false;
        forceUpdate()
    }
    var deleteAccount = async function () {
        try {
            ToastAndroid.show("Deletando a conta...", ToastAndroid.SHORT);
            let _email = conta.nm_email || conta.email;
            const response = await api.post('/user/delete', {email: _email})
            await AsyncStorage.setItem('@account_id', '');
            navigation.navigate('Login')
        } catch (error) {
            console.log(error)
        }
    }
    var logout = async function () {
        try {
            ToastAndroid.show("Saindo da conta...", ToastAndroid.SHORT);
            await AsyncStorage.setItem('@account_id', '');
            navigation.navigate('Login')
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <View style={styles.body}>
            <View style={[{ backgroundColor: '#fff', flexDirection: 'row', height: 60, marginVertical: 10, marginHorizontal: 20, borderRadius: 10, borderWidth: 1, borderColor: '#00000090' }]}>
                <View style={[{ justifyContent: 'center', flex: 1, }]}>
                    <Text style={[{ textAlign: 'center', fontSize: 18 }]}>{conta.name || conta.nm_usuario}</Text>
                    <Text style={[{ textAlign: 'center', fontSize: 15 }]}>{conta.email || conta.nm_email}</Text>
                </View>
                <View style={[{ justifyContent: 'center', }]}>
                    <TouchableOpacity style={{ height: 50, width: 50, alignItems: 'flex-end', justifyContent: "center", marginRight: 40 }} onPress={() => { showPopup(1, conta) }}>
                        <Icon name='ellipsis-v' size={24} />
                    </TouchableOpacity>

                </View>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={[styles.submitBtn, styles.backBlue]}>
                <Text style={styles.submitBtnText}>Salvar</Text>
            </TouchableOpacity>


            <Modal backdropColor={'#00000060'} isVisible={global.popup_register}
                animationIn="slideInDown"
                animationOut="slideOutDown"
                animationInTiming={600}
                animationOutTiming={600}
                onBackdropPress={() => { hidePopup() }}>
                <View style={{ top: 0, position: 'absolute', right: 0, left: 0 }}>
                    <View style={[styles.operation]}>
                        <View style={[styles.card, styles.shadow, { height: 150 }]}>
                            {/* <TextInput
                              onChangeText={val => qnt_atual = val}
                              placeholder={global.transaction ? 'Adicionar' : 'Remover'}
                              autoCapitalize="none"
                              autoCorrect={false}
                              style={styles.input}
                            /> */}
                            <Text style={[styles.colorBlack]}>Operação que deseja fazer:</Text>
                            <View style={[styles.actions]}>
                                <TouchableOpacity onPress={() => { deleteAccount(); hidePopup(); }} style={[styles.indivAction, styles.floatLeft,]}>
                                    <Text style={[styles.colorBlack]}>Apagar conta</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { logout(); hidePopup(); }} style={[styles.indivAction, styles.floatLeft,]}>
                                    <Text style={[styles.colorBlack]}>Fazer Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
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

        width: 310,
        margin: 10,
        alignSelf: 'center',
        bottom: 0,
        position: 'absolute'
    },
    backBlue: {
        backgroundColor: '#4E7AF3',
    },
    backRed: {
        backgroundColor: '#4E7AF3',
    },
    submitBtn: {
        borderRadius: 10,

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
    },
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
        alignSelf: 'flex-start'
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
})
 /* <TouchableOpacity onPress={handleSubmit} style={[styles.submitBtn,styles.backRed]}>
               <Text style={styles.submitBtnText}>Apagar conta</Text>
           </TouchableOpacity> */

                        // <View style={styles.form}>


                        // <Text style={styles.label}>Nome de usuario</Text>
                        // <TextInput
                        //     onChangeText={val => account.nm_usuario = val}
                        //     placeholder="NOME"
                        //     autoCapitalize="none"
                        //     autoCorrect={false}
                        //     value={account.nm_usuario}
                        //     style={styles.input}
                        //     maxLength={40}
                        // />
                        // <Text style={styles.label}>E-mail </Text>
                        // <TextInput
                        //     onChangeText={val => account.nm_email = val}
                        //     placeholder="E-MAIL"
                        //     autoCapitalize="none"
                        //     autoCorrect={false}
                        //     value={account.nm_email}
                        //     style={styles.input}
                        //     maxLength={40}
                        // />
                        // <Text style={styles.label}>Senha</Text>
                        // <TextInput
                        //     onChangeText={val => account.cd_senha = val}
                        //     placeholder="SENHA"
                        //     autoCapitalize="none"
                        //     autoCorrect={false}
                        //     style={styles.input}
                        //     value={account.cd_senha}
                        //     secureTextEntry={true}
                        //     maxLength={40}
                        // />
                        // <Text style={styles.label}>Digite novamente a senha</Text>
                        // <TextInput
                        //     onChangeText={val => global.newPass = val}
                        //     placeholder="SENHA"
                        //     autoCapitalize="none"
                        //     value={account.cd_senha}
                        //     autoCorrect={false}
                        //     style={styles.input}
                        //     maxLength={40}
                        // />
                        // </View>
