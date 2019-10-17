
import React, { Component } from 'react';
import { SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TextInput, StyleSheet, Image, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'


var config = {
    host: '192.168.1.1', //ip address of the mssql database
    user: 'sa', //username to login to the database
    pass: 'password', //password to login to the database
    db: 'admin', //the name of the database to connect to
    port: 1433 //OPTIONAL, port of the database on the server
}

export default function Main({ navigation }) {

    async function handleConfig() {
        if (config.host.length > 0 && config.port.length > 0 && config.user.length > 0 && config.pass.length > 0 && config.db.length > 0) {
            try {
                navigation.navigate("Principal", config)
                ToastAndroid.show("Salvo!", ToastAndroid.SHORT);
            } catch (error) {
                ToastAndroid.show("Problema ao criar conta", ToastAndroid.SHORT);
                console.log(error)
            }

        } else {
            ToastAndroid.show("Digite o host", ToastAndroid.SHORT);
        }

    }
    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                {/* <SafeAreaView> */}
                    <View style={styles.body}>
                        <View style={styles.form}>
                            <Text style={styles.label}>Digite o host</Text>
                            <TextInput
                                onChangeText={val => config.host = val}
                                placeholder="HOST"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                maxLength={40}
                            />
                            <Text style={styles.label}>Digite a Porta</Text>
                            <TextInput
                                onChangeText={val => config.port = val}
                                placeholder="PORTA"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                maxLength={40}
                            />
                            <Text style={styles.label}>Digite o Username</Text>
                            <TextInput
                                onChangeText={val => config.user = val}
                                placeholder="USERNAME"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                maxLength={40}
                            />
                            <Text style={styles.label}>Digite a senha</Text>
                            <TextInput
                                onChangeText={val => config.pass = val}
                                placeholder="PASSWORD"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                maxLength={40}
                            />
                            <Text style={styles.label}>Digite o nome do banco de dados</Text>
                            <TextInput
                                onChangeText={val => config.db = val}
                                placeholder="DATABASE"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                maxLength={40}
                            />
                        </View>
                        <TouchableOpacity onPress={handleConfig} style={styles.submitBtn}>
                            <Text style={styles.submitBtnText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                {/* </SafeAreaView> */}
            </KeyboardAvoidingView>
        </ScrollView>
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
        backgroundColor: '#4E7AF3',
        width: 310,
        margin: 10,
        alignSelf: 'center',
        bottom: 0,
        // position: 'absolute'
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