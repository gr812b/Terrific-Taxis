import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, FlatList } from "react-native"
import { useState } from "react"
import MapView from 'react-native-maps'
import React from 'react'
import styles from '../styles/LoginScreen.style'
import { StyleSheet } from "react-native"
import { PROVIDER_GOOGLE } from "react-native-maps"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { ScrollView } from "react-native-gesture-handler"

export const RequestRide = ({ navigation }) => {

    const [location, setLocation] = useState("");
    const [destination, setDestination] = useState("");
    const [numppl, setNumppl] = useState("");

    return (
        <View style={stylesa.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={stylesa.map}
            />
            <View>

                <View style={stylesa.searchContainer}>
                    <GooglePlacesInputDestination setDestination={setDestination} />
                    <GooglePlacesInputOrigin setLocation={setLocation} />
                </View>
            </View>

        </View>
    )
}

const stylesa = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '50%',
    },
    input: {
        display: "flex",
        flex: 1,
        margin: "5%",
        height: "100%",
    },
    searchContainer: {
        position: "absolute",
        width: "100%",
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 1,
        padding: 8,
    },
});


const GooglePlacesInputDestination = (props) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Where are you going?'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                props.setDestination(details.geometry.location);
            }}
            query={{
                key: "AIzaSyBomDl6jr68SAPfj---QNBjc5-NX0xI7xQ",
                language: 'en',
                components: 'country:ca',
            }}
            fetchDetails={true}
        />
    );
};

const GooglePlacesInputOrigin = (props) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Where are you located?'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                props.setLocation(details.geometry.location)
                console.log(details.geometry.location);
            }}
            query={{
                key: "AIzaSyBomDl6jr68SAPfj---QNBjc5-NX0xI7xQ",
                language: 'en',
                components: 'country:ca',

            }}
            fetchDetails={true}
        />
    );
};
