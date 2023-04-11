import React, { useState } from 'react';
import { View, Button, Text, TextInput, Image, NativeModules, Alert, ScrollView } from "react-native"
import styles from '../styles/DefaultStyles.style'

const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

export const EditProfileScreen = ({ navigation, route }) => {

    //username, password, phone, email, address, city, state, zip
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [zip, setZip] = useState("");

    const { setToken } = route.params;

    const handleSubmit = async (data) => {
        console.log(data)
        // Send request to backend to edit profile

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
                        title="Confirm Edit Profile"
                        onPress={() => { handleSubmit({ username: username, password: password, email: email, phone: phone, address: address, city: city, state: province, zip: zip }) }}
                        style={styles.submitButton}
                    />
                </View>

                {/* <Text style={{ height: 350 }}></Text> */}

            </ScrollView>
        </View>
    );


};
