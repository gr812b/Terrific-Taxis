import { View, Button, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView } from "react-native"
import { useState } from "react"
const terrificTaxi = require('../../assets/terrifictaxi.png');
export const HomeScreen = ({ navigation }) => {
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
                <Image source={terrificTaxi} style={styles.image} resizeMode="contain" />
            </View>
        </View>
    );
};
export const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10,
    },
    submitButton: {
        height: 40,
        width: 20,
    },
    text: {
        color: "red",
        fontSize: 10,
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    image: {
        width: 320,
        height: 440,

    }
});


