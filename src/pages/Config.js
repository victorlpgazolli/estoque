
import React, { useEffect, useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TextInput, StyleSheet, Image, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api';
var account = {
    cd_usuario: '',
    nm_usuario: '',
    cd_senha: '',
    nm_email: '',
}
var newPass = ''

export default function Main({ navigation }) {
    const [isNew, updateisNew] = useState(false);
    useEffect(async () => {
        try {
            AsyncStorage.getItem('@account_id').then(stored_id => {
                try {
                    if (stored_id.length > 0) {
                        async function getAccount() {
                            const { data } = await api.get('/user/' + stored_id)
                            account = {
                                name: data.nm_usuario,
                                email: data.nm_email,
                                password: data.cd_senha,
                                id: data.cd_usuario,
                            }
                            updateisNew(!isNew)
                        }
                        getAccount()
                    }
                } catch{

                }

            })

        } catch (err) {

        }

    }, []);
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
    return (

                <View style={styles.body}>
                    <View style={styles.form}>
                        <Text style={styles.label}>Nome de usuario</Text>
                        <TextInput
                            onChangeText={val => account.nm_usuario = val}
                            placeholder="NOME"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={account.nm_usuario}
                            style={styles.input}
                            maxLength={40}
                        />
                        <Text style={styles.label}>E-mail </Text>
                        <TextInput
                            onChangeText={val => account.nm_email = val}
                            placeholder="E-MAIL"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={account.nm_email}
                            style={styles.input}
                            maxLength={40}
                        />
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            onChangeText={val => account.cd_senha = val}
                            placeholder="SENHA"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            value={account.cd_senha}
                            secureTextEntry={true}
                            maxLength={40}
                        />
                        <Text style={styles.label}>Digite novamente a senha</Text>
                        <TextInput
                            onChangeText={val => newPass = val}
                            placeholder="SENHA"
                            autoCapitalize="none"
                            value={account.cd_senha}
                            autoCorrect={false}
                            style={styles.input}
                            maxLength={40}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={[styles.submitBtn,styles.backBlue]}>
                        <Text style={styles.submitBtnText}>Salvar</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={handleSubmit} style={[styles.submitBtn,styles.backRed]}>
                        <Text style={styles.submitBtnText}>Apagar conta</Text>
                    </TouchableOpacity> */}
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
    }
})