import React, { useState } from 'react';
import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, NativeModules, Alert, ScrollView } from "react-native"
import styles from '../styles/DefaultStyles.style'

const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

export const CreateProfileScreen = ({ navigation, route }) => {

    //username, password, phone, email, address, city, state, zip
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [zip, setZip] = useState("");

    const { setIsSignedIn } = route.params;

    const handleSubmit = async (data) => {
        console.log(data)
        // Send request to backend to create profile with all data as is
        await fetch(`http://${hostname}:5000/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                phone: phone,
                address: address,
                city: city,
                state: province,
                zip: zip
            })
        }).then(response => {
            response.text().then(data => {
                console.log("here:" + (data))
                // Alert user that profile was created
                if (JSON.parse(data).message == "User sucessfully created") {
                    Alert.alert("Profile Created", "Your profile has been created successfully.")
                } else {
                    Alert.alert("Error", "There was an error creating your profile. Please try again. Reason: " + JSON.parse(data))
                }
            })
        }).catch(error => {
            console.log("error: " + error)
        });

        fetch(`http://${hostname}:5000/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({ username: "Josh", password: "123" })
        }).then(response => {
            response.text().then(data => {
                console.log(JSON.parse(data).token)
                if (JSON.parse(data).token) {
                    console.log("Login successful")
                    setIsSignedIn(true);
                }
            })
        }).catch(error => {
            console.log("error: " + error)
        });
    }

    return (
        <View>
            <ScrollView>
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
                <TextInput
                    placeholder="Enter Email"
                    onChangeText={setEmail}
                    value={email}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter Phone"
                    onChangeText={setPhone}
                    value={phone}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter Address"
                    onChangeText={setAddress}
                    value={address}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter City"
                    onChangeText={setCity}
                    value={city}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter Province"
                    onChangeText={setProvince}
                    value={province}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter Zip"
                    onChangeText={setZip}
                    value={zip}
                    style={styles.input}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Create Profile"
                        onPress={() => { handleSubmit({ username: username, password: password, email: email, phone: phone, address: address, city: city, state: province, zip: zip }) }}
                        style={styles.submitButton}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
