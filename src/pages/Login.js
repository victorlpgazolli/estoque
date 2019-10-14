
import React, {useEffect}from 'react';
import { KeyboardAvoidingView, Platform ,StyleSheet, Image, TextInput, Text, ToastAndroid,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

var email = '';
var password = '';
export default function Login ({ navigation }) {
    
    useEffect( async () => {
        try{
            AsyncStorage.getItem('@account_email').then(user => {
                if (user.length > 0) {
                    navigation.navigate('Principal')
                }else{
                    
                }
              })
        }catch(err){
            
        }
        
      }, []);

  async function handleLogin () {
        //await AsyncStorage.setItem('username', username);
        //const response = await api.post('/users', { username: user })
        AsyncStorage.getItem('@account_email').then(user => {
            if (user == email) {
                navigation.navigate('Principal')
            }else{
                ToastAndroid.show("Email não cadastrado", ToastAndroid.SHORT);
                
            }
          })
    }
    function handleRegister(){
        navigation.navigate('CadastrarLogin');
    }
    
    
  return (
    <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
            <Image
          style={{width: 150, height: 150, marginBottom: 25}}
          source={require('../assets/icon.png')}
        />
            <TextInput placeholder="Digite seu e-mail"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={val => email = val}
            style={[styles.input]}
            />
            <TextInput placeholder="Digite sua senha"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={val => password = val}
            secureTextEntry={true}
            style={[styles.input]}
            />
            <TouchableOpacity style={[styles.button,styles.colorBackground]} onPress={handleLogin} >
                <Text style={styles.buttontext}>Fazer login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.colorBorder]} onPress={handleRegister} >
                <Text style={[styles.buttontext,styles.textColor]}>Não tem uma conta? clique aqui</Text>
            </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        padding: 30,
        backgroundColor: '#fff'
    },
    input:{
        height:46,
        alignSelf: "stretch",
        backgroundColor: "#f9f9f9",
        borderRadius: 4,
        marginTop: 10,
        borderColor: "#4E7AF3",
        borderBottomWidth: 1,
        paddingHorizontal: 15,
    },
    button:{
        height:46,
        alignSelf: "stretch",
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    colorBackground:{
        backgroundColor: '#4E7AF3',
    },
    colorBorder:{
        borderWidth: 1,
        borderColor: "#4E7AF3",
        marginBottom: 100
    },
    textColor:{
        color: "#4E7AF3",
    },
    buttontext:{
        color: "#FFF",
        fontWeight: 'bold',
        fontSize: 16
    },
})