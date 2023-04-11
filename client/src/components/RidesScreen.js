import { Text, View, ScrollView, Pressable, NativeModules } from "react-native"
import styles from '../styles/RestaurantsScreen.style'
import React, { useState, useEffect, useContext } from "react"
import SocketContext from "./SocketContext";
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

export const RidesScreen = ({ navigation, route }) => {

    const socket = useContext(SocketContext);
    const [rides, setRides] = useState([]);
    const { userID, destination, location, numppl, flexibility, locationAddress, destinationAddress } = route.params;

    useEffect(() => {
        getRides();
    }, [])

    const getRides = async () => {
        await fetch(`http://${hostname}:5000/dispatcher/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                //need to pass authorization token here
            },
            body: JSON.stringify({
                destination: destination,
                location: location,
                distance: flexibility,
            })
        }).then(response => {
            console.log("Requests: " + JSON.stringify(response))
            response.json().then(data => {
                //setRestaurants(JSON.parse(data))
                //console.log("Info: " + JSON.stringify(JSON.parse(data)))
                setRides(data)
                //Fetch profile for ride offerer's info, rating
                //Use ride information to display distance from pickup location
            })
        }).catch(error => {
            console.log("error: " + error)
        });
    }
    console.log(socket.id)
    const handleSelect = async (rideId) => {
        const token = await getData();
        fetch(`http://${hostname}:5000/dispatcher/select`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                "authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                ride: rideId,
                requestSocket: socket.id,
                location: locationAddress,
                destination: destinationAddress,
            })
        }).then(response => {
            console.log("Requests: " + JSON.stringify(response))
            response.json().then(data => {

            })
        }).catch(error => {
            console.log("error: " + error)
        });
    }

    const ridesTemp = [
        {
            name: "Tom",
            rating: 4.5,
            time: "12 m",
        },
        {
            name: "Jane",
            rating: 3.2,
            time: "9 m",
        },
        {
            name: "John",
            rating: 5.0,
            time: "17 m",
        },
        {
            name: "Bruh",
            rating: 2.2,
            time: "2 m",
        },
    ]
    useEffect(() => {
        //console.log(rides)
    }, [rides])
    return (
        <View style={styles.container}>
            <ScrollView>
                {rides.map((rides, index) => {
                    console.log(rides)
                    return (
                        <Pressable style={[styles.restaurantContainer, index % 2 === 0 ? styles.even : styles.odd]} key={index}
                            onPress={async () => { await handleSelect(rides._id); console.log(rides.name); navigation.navigate('Riding', { rideId: rides._id }) }}>
                            <Text style={styles.restaurantName}>{rides?.creator?.username}</Text>
                            {/* <Text style={styles.restaurantRating}>{rides[0]?.creator?.rating}/5</Text> */}
                            <Text style={styles.restaurantPrice}>{rides?.location?.address}</Text>
                        </Pressable>
                    )
                }
                )}
            </ScrollView>
        </View>
    )
}