import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, ScrollView, FlatList, NativeModules, StyleSheet } from "react-native"
import React, { useState, useEffect } from 'react'
import SocketContext from "./SocketContext";

const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

export const RidingScreen = ({ navigation, route }) => {

    const socket = React.useContext(SocketContext);
    const [rideData, setRideData] = useState({});

    socket.on("acceptOffer", message => {
        //console.log(route.params)
        alert(message)

        fetch(`http://${hostname}:5000/rides/getride/${route.params.rideId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            }
        }).then(response => {
            //response.json().then(data => console.log(data))
            // console.log("Restaurant data: " + JSON.stringify(response))
            response.json().then(data => {
                console.log(data)
                setRideData(data)
            })
        }).catch(error => {
            console.log("error: " + error)
        });


    })

    socket.on("joined", message => {
        //console.log(route.params)
        alert(message)

        fetch(`http://${hostname}:5000/rides/getride/${route.params.rideId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            }
        }).then(response => {
            //response.json().then(data => console.log(data))
            // console.log("Restaurant data: " + JSON.stringify(response))
            response.json().then(data => {
                console.log(data)
                setRideData(data)
            })
        }).catch(error => {
            console.log("error: " + error)
        });


    })

    useEffect(() => {
        fetch(`http://${hostname}:5000/rides/getride/${route.params.rideId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            }
        }).then(response => {
            //response.json().then(data => console.log(data))
            // console.log("Restaurant data: " + JSON.stringify(response))
            response.json().then(data => {
                console.log(data);
                setRideData(data);
            })
        }).catch(error => {
            console.log("error: " + error)
        });

    }, [])

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.username}</Text>
        </View>
    );

    const renderStopItem = ({ item }) => (
        <View>
            <Text>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Currently: {rideData?.riders?.length + 1} people</Text>
            <Text></Text>
            <FlatList contentContainerStyle={styles.text}
                data={rideData?.riders}
                renderItem={renderItem}
            />
            <Text></Text>
            <Text>Price per person: ${Number(rideData?.price / (rideData?.riders?.length + 1)).toFixed(2)} </Text>
            <Text>Estimated Time: {15} mins</Text>
            <Text>Destination: {rideData?.destination?.address}</Text>
            <Text>Stops:</Text>
            <Text></Text>
            <FlatList
                data={rideData?.stops}
                renderItem={renderStopItem}
            />
            <Button title="Finish Ride"><Text>Finish Ride</Text></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    text: {
        fontSize: 15,
        color: '#000'
    }
});
