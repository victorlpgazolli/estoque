
import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, TextInput, StyleSheet, Image, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

var host = '';

export default function Main({ navigation }) {

    async function handleConfig() {
        if(host.length > 0){
            try {
                await AsyncStorage.setItem('host', host);
                navigation.navigate("Principal", host)
                ToastAndroid.show("Salvo!", ToastAndroid.SHORT);
            } catch (error) {
                ToastAndroid.show("Problema ao criar conta", ToastAndroid.SHORT);
                console.log(error)
            }
            
        }else{
            ToastAndroid.show("Digite o host", ToastAndroid.SHORT);
        }
        
    }
    return (
        <View style={styles.body}>
            <View style={styles.form}>
                <Text style={styles.label}>Digite o host</Text>
                <TextInput
                    onChangeText={val => host = val}
                    placeholder="Seu nome"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    maxLength={15}
                />

            </View>
            <TouchableOpacity onPress={handleConfig} style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>Salvar</Text>
            </TouchableOpacity>
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
        backgroundColor: '#4E7AF3',
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