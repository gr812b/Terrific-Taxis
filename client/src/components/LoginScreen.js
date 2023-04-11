import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, NativeModules, Alert } from "react-native"
import { useState } from "react"
import styles from '../styles/LoginScreen.style'
import AsyncStorage from '@react-native-async-storage/async-storage'

const terrificTaxiLogo = require('../../assets/terrifictaxi.png');

const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

export const LoginScreen = ({ navigation, route }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setToken } = route.params;

    const handleSubmit = (data) => {
        console.log(data)
        // Check if username and password are correct

        fetch(`http://${hostname}:5000/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                //'authorization': 'Bearer ' + JSON.parse(data).token
            },
            body: JSON.stringify({ username: username, password: password })
        }).then(response => {
            response.text().then(async data => {
                console.log(JSON.parse(data).token)
                if (JSON.parse(data).token) {
                    console.log("Login successful")
                    setToken(JSON.parse(data).token);
                    try {
                        await AsyncStorage.setItem('token', JSON.parse(data).token);
                    } catch (e) {
                        console.log(e);
                        console.log("A SHU")
                    }
                } else {
                    Alert.alert("Error", "There was an error logging in. Please try again. Reason: " + JSON.parse(data).message)
                }
            })
        }).catch(error => {
            console.log("error: " + error)
        });

        console.log("Login event occured")

    }

    return (
        <View>
            <TextInput
                placeholder="Enter Name"
                onChangeText={setUsername}
                value={username}
                style={styles.input}
            />
            <TextInput
                placeholder="Enter Password"
                onChangeText={setPassword}
                value={password}
                style={styles.input}
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Login"
                    onPress={() => { handleSubmit({ username: username, password: password }) }}
                    style={styles.submitButton}
                />
                <Text style={styles.text} onPress={() => { navigation.navigate('CreateProfile', { name: 'Jane' }) }}>Create an account</Text>
                <Image source={terrificTaxiLogo} style={styles.image} resizeMode="contain" />
            </View>
        </View>
    );
};
