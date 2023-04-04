import { View, Button, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView } from "react-native"
import { useState } from "react"
import styles from '../styles/LoginScreen.style'

const terrificTaxiLogo = require('../../assets/terrifictaxi.png');

export const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (data) => {
        console.log(data)
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
                    onPress={() => { handleSubmit({ username: username, password: password }) }
                        //navigation.navigate('Profile', { name: 'Jane' })
                    }
                    style={styles.submitButton}
                />
                <Text style={styles.text}>Create an account</Text>
                <Image source={terrificTaxiLogo} style={styles.image} resizeMode="contain" />
            </View>
        </View>
    );
};
