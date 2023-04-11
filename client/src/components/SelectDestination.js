import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, TouchableOpacity } from "react-native"
import { useState, useRef } from "react"
import styles from '../styles/LoginScreen.style'
import { StyleSheet } from "react-native"
import { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import MapView from 'react-native-maps'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { ScrollView } from "react-native-gesture-handler"
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesInputDestination, GooglePlacesInputOrigin } from "./GoogleInput"


export const SelectDestinationScreen = ({ navigation, route }) => {

    const [destination, setDestination] = useState("");
    const [location, setLocation] = useState("");
    const mapRef = useRef(null);
    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState(0);
    const [destinationAddress, setDestinationAddress] = useState(0);
    const [locationAddress, setLocationAddress] = useState(0);
    const { taxiInfo } = route.params;
    console.log(taxiInfo)

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
                    <GooglePlacesInputDestination setDestination={setDestination} setMapLocation={setMapLocation} setDestinationAddress={setDestinationAddress} />
                    <GooglePlacesInputOrigin setLocation={setLocation} setMapLocation={setMapLocation} setLocationAddress={setLocationAddress} />
                    {distance && time ?
                        <>
                            <Text>Estimated Distance: {distance.toFixed(1) + " km"}</Text>
                            <Text>Estimated Time: {time > 60 ? Math.ceil(time / 60) + " hours" : Math.ceil(time) + " mins"}</Text>
                            <Text>Estimated Price: ${Math.round(5 + distance * 0.6)}</Text>
                        </> : null}
                    {location && destination ?
                        <TouchableOpacity style={stylesa.submitButton} onPress={() => {
                            navigation.navigate("FoodSelect", { userID: 'This is whatever', destination: destination, location: location, numppl: taxiInfo.numberOfSeats, taxiInfo: taxiInfo, locationAddress: locationAddress, destinationAddress: destinationAddress })
                        }}>
                            <Text>Make Offer!</Text>
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
