import { View, Button, Text, TextInput, Image, Pressable, KeyboardAvoidingView, NativeModules } from "react-native"
import React from 'react';
import styles from '../styles/FoodSelect.style'
import AsyncStorage from '@react-native-async-storage/async-storage';
const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

//read the token from the storage
const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            console.log(value)
            return value
        }
    } catch (e) {
        console.log(e)
    }
}

export const FoodSelect = ({ navigation, route }) => {
    const { userID, destination, location, numppl, taxiInfo, locationAddress, destinationAddress } = route.params
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={() => navigation.navigate('Restaurants', route.params)} style={styles.button}>
                <Text style={styles.buttonText}>Yes</Text>
            </Pressable>

            <View style={{ height: 50 }} />

            <Pressable onPress={async () => {
                const token = await getData();
                fetch(`http://${hostname}:5000/rides/createoffer`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        userID: userID, destination: destination, location: location, numppl: taxiInfo.numberOfSeats, taxiInfo: taxiInfo, locationAddress: locationAddress, destinationAddress: destinationAddress
                    }),
                }).then(response => {
                    response.json().then((data) => {
                        console.log(data);
                    })
                }).catch(error => {
                    alert('Invalid Taxi QR Code!')
                    console.log("error: " + error)
                });
                navigation.navigate('Riding', route.params);

            }} style={styles.button}>
                <Text style={styles.buttonText}>No</Text>
            </Pressable>

            <View style={{ height: 75 }} />
        </View>
    )
}