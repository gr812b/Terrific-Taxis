import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, FlatList } from "react-native"
import { useState } from "react"
import React from 'react'
import styles from '../styles/LoginScreen.style'

export const RequestRide = ({navigation}) => {

    const [location, setLocation] = useState("");
    const [destination, setDestination] = useState("");
    const [numppl, setNumppl] = useState("");

    return (
        <View>
            <Text>MAP GOES HERE!</Text>
            <TextInput
                placeholder="Enter Current Location"
                onChangeText={setLocation}
                value={location}
                style={styles.input}
            />
            <TextInput
                placeholder="Enter Destination"
                onChangeText={setDestination}
                value={destination}
                style={styles.input}
            />
            <TextInput
                placeholder="Enter Desired Number of Passengers"
                onChangeText={setNumppl}
                value={numppl}
                style={styles.input}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Submit"
                    onPress={() => {navigation.navigate('Rides')}}
                    style={styles.submitButton}
                />
            </View>
        </View>
    )
}