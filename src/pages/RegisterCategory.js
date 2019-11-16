
import React, { useEffect, useState, useCallback, Component } from 'react';
import { View, StyleSheet, Text, BackHandler, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
var _category = {
    name: ''
}

// import SelectBox from '../assets/SelectBox'
import api from '../services/api';
var categories = []

export default function RegisterCategory({ navigation }) {

    useEffect(() => {
        categories.push(navigation.state.params)
    }, [])
    const handleBackButton = function () {
        navigation.navigate('Produtos', { ok: 'ok' })
        return true;
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    async function handleSubmit() {
        if (validateInputs()) {
            if (categoryNotExists()) {
                try {
                    const response = await api.post('/category/add', _category)
                    if (response.status == 200) {
                        ToastAndroid.show("Categoria criada com sucesso!", ToastAndroid.SHORT);
                        navigation.navigate("Produtos")
                    }
                } catch (error) {
                    console.error(error)
                    ToastAndroid.show("problema ao cadastrar categoria", ToastAndroid.SHORT);
                }
            } else {
                console.log('categoria já existe')
                ToastAndroid.show("Categoria já existe", ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show("Digite o nome da categoria", ToastAndroid.SHORT);
        }
    }
    function categoryNotExists() {
        for (var category in categories) {
            if (category.nm_categoria != _category.name) {
                continue
            } else {
                return false
            }
        }
        return true;
    }
    function validateInputs() {
        if (_category.name.trim().length != 0) {
            return true;
        } else {
            ToastAndroid.show('Digite o nome', ToastAndroid.SHORT)
            return false;
        }
    }
    return (
        <View style={styles.body}>
            <View style={styles.form}>
                <Text style={styles.label}>Digite o nome da categoria</Text>
                <TextInput
                    onChangeText={val => _category.name = val}
                    placeholder="Nome da categoria"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    maxLength={15}
                />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>Cadastrar Categoria</Text>
            </TouchableOpacity>
        </View>
    );
};
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
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