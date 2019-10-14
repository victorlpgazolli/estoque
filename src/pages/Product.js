
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Image, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'

export default function Product({ navigation }) {

    const [evento, setEvento] = useState([]);
    useEffect(() => {
        try {
            if (evento) {
                setEvento(navigation.state.params)
            } else {
                
            }
        } catch{
            navigation.navigate('Principal')
        }
    }, []);
    return (

        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}>
            <View style={styles.infoView}>
                <Text style={[styles.itemsText]}>{evento.name}</Text>

            </View>

        </KeyboardAvoidingView>
    );
};
// };
const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: '#fff'
    },
    images: {
        height: 120,
        width: "100%",
    },
    infoView: {
        paddingHorizontal: 30,
        paddingTop: 10
    },
    itemsText: {
        color: '#000',
        fontSize: 18,
    },
    description: {
        height: 100
    },


})