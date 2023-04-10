import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, FlatList, TouchableOpacity } from "react-native"
import { useRef, useState } from "react"
import MapView from 'react-native-maps'
import React from 'react'
import styles from '../styles/LoginScreen.style'
import { StyleSheet } from "react-native"
import { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { ScrollView } from "react-native-gesture-handler"
import MapViewDirections from 'react-native-maps-directions';

export const RequestRide = ({ navigation }) => {

    const [location, setLocation] = useState("");
    const [destination, setDestination] = useState("");
    const [numppl, setNumppl] = useState("");
    const mapRef = useRef(null);
    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState(0);
    const [flexibility, setFlexibility] = useState(null);

    const setMapLocation = async (location) => {
        const position = await mapRef.current.getCamera();
        if (position) {
            console.log(location)
            position.center = location;
            mapRef.current.animateCamera(position, { duration: 1000, zoom: 15 })
        }
    }
    //mapRef.current.fitToCoordinates([location, destination], {top: 50, right: 50, bottom: 50, left: 50}) this fits and zooms into to the map
    const onRouteReady = (arg) => {
        if (arg) {
            setDistance(arg.distance);
            setTime(arg.duration);
        }
        mapRef.current.fitToCoordinates([location, destination], { top: 50, right: 50, bottom: 50, left: 50 })
    }

    return (
        <View style={stylesa.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={stylesa.map}
                ref={mapRef}
            >
                {location ? <Marker coordinate={location} /> : null}
                {destination ? <Marker coordinate={destination} /> : null}
                {location && destination ? <MapViewDirections
                    origin={location}
                    destination={destination}
                    strokeWidth={3}
                    strokeColor="blue"
                    apikey="AIzaSyBomDl6jr68SAPfj---QNBjc5-NX0xI7xQ"
                    onReady={onRouteReady}
                /> : null}
            </MapView>
            <View>
                <View style={stylesa.searchContainer}>
                    <GooglePlacesInputDestination setDestination={setDestination} setMapLocation={setMapLocation} />
                    <GooglePlacesInputOrigin setLocation={setLocation} setMapLocation={setMapLocation} />
                    <TextInput onChangeText={(e) => setFlexibility(e)} style={stylesa.input} placeholder="Within how many km of current location?" keyboardType="numeric" />
                    {distance && time ?
                        <>
                            <Text>Estimated Distance: {distance.toFixed(1) + " km"}</Text>
                            <Text>Estimated Time: {time > 60 ? Math.ceil(time / 60) + " hours" : Math.ceil(time) + " mins"}</Text>
                            <Text>Estimated Price: ${Math.round(5 + distance * 0.6)}</Text>
                        </> : null}
                    {location && destination ?
                        <TouchableOpacity style={stylesa.submitButton} onPress={() => {
                            navigation.navigate("Rides", { userID: 'Micky', destination: destination, location: location, numppl: numppl, flexibility: flexibility })
                        }}>
                            <Text>Make Request!</Text>
                        </TouchableOpacity> : null
                    }
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
        marginLeft: "3%",
        marginBottom: "2%",
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
        fontSize: 10
    },
    routeInformation: {
        display: "flex",
        flexDirection: "column",
    },
    submitButton: {
        alignItems: "center",
        paddingVertical: 12,
        marginTop: 16,
        borderRadius: 3,
        backgroundColor: "yellow"
    }
});

const GooglePlacesInputDestination = (props) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Where are you going?'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                const location = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
                props.setDestination(location);
                props.setMapLocation(location);
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
                const location = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
                props.setLocation(location);
                props.setMapLocation(location);
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
