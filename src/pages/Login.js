
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Image, TextInput, Text, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api';
var account = {
    name: '',
    email: '',
    password: '',
    id: ''
}
export default function Login({ navigation }) {
    useEffect(async () => {
        try {
            AsyncStorage.getItem('@account_id').then(stored_id => {
                try {
                    console.log(stored_id)
                    if (stored_id.length > 0) {
                        async function getAccount() {
                            const { data } = await api.get('/user/' + stored_id)
                            account = {
                                name: data.nm_usuario,
                                email: data.nm_email,
                                password: data.cd_senha,
                                id: data.cd_usuario,
                            }
                        }
                        getAccount()
                        navigation.navigate('Produtos', account)
                    }
                } catch{

                }

            })

        } catch (err) {

        }

    }, []);
    async function handleLogin() {
        // await AsyncStorage.setItem('username', username);
        // navigation.navigate('Produtos')
        if (account.email.trim().length > 0 && account.password.trim().length > 0) {
            async function getAccount() {
                // var registered_account = {};
                // console.log(account)
                try {
                    const { data } = await api.post('/user/login', { email: account.email, password: account.password })
                    const response = JSON.parse(JSON.stringify(data))
                    if (response.length > 0) {
                        accessGranted(response[0])
                        // console.log(response[0])
                    } else {
                        ToastAndroid.show("Login ou senha invalidos", ToastAndroid.SHORT)
                    }
                } catch (err) {
                    console.log(err)

                }


                // navigation.navigate('Produtos')//, account)
                // registered_account.id.length != null ? checkCredencials(registered_account.password) : ToastAndroid.show("Login inválido", ToastAndroid.SHORT);;
            }
            getAccount();
        } else {
            ToastAndroid.show("Digite corretamente os campos", ToastAndroid.SHORT)
        }

    }
    function handleRegister() {
        navigation.navigate('CadastrarLogin');
    }

    async function accessGranted(user) {
        await AsyncStorage.setItem('@account_id', user.cd_usuario.toString());
        navigation.navigate('Produtos', user);
    }
    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}>
            <TextInput placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={val => account.email = val}
                style={[styles.input]}
            />
            <TextInput placeholder="Digite sua senha"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={val => account.password = val}
                secureTextEntry={true}
                style={[styles.input]}
            />
            <TouchableOpacity style={[styles.button, styles.colorBackground]} onPress={handleLogin} >
                <Text style={styles.buttontext}>Fazer login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.colorBorder]} onPress={handleRegister} >
                <Text style={[styles.buttontext, styles.textColor]}>Não tem uma conta? clique aqui</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        padding: 30,
        backgroundColor: '#fff'
    },
    input: {
        height: 46,
        alignSelf: "stretch",
        backgroundColor: "#fcfcfc",
        borderRadius: 4,
        marginTop: 10,
        color: "#000",
        borderColor: "#4E7AF3",
        borderBottomWidth: 1,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: "stretch",
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    colorBackground: {
        backgroundColor: '#4E7AF3',
    },
    colorBorder: {
        borderWidth: 1,
        borderColor: "#4E7AF3",
        marginBottom: 100
    },
    textColor: {
        color: "#4E7AF3",
    },
    buttontext: {
        color: "#FFF",
        fontWeight: 'bold',
        fontSize: 16
    },
})