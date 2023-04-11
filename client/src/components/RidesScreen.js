import { Text, View, ScrollView, Pressable, NativeModules } from "react-native"
import styles from '../styles/RestaurantsScreen.style'
import React, { useState, useEffect } from "react"

const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

export const RidesScreen = ({ navigation, route }) => {

    const [rides, setRides] = useState([{}]);
    const { userID, destination, location, numppl, flexibility } = route.params;

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
            response.text().then(data => {
                //setRestaurants(JSON.parse(data))
                console.log("Info: " + JSON.stringify(JSON.parse(data)))
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

    return (
        <View style={styles.container}>
            <ScrollView>
                {ridesTemp.map((rides, index) => {
                    return (
                        <Pressable style={[styles.restaurantContainer, index % 2 === 0 ? styles.even : styles.odd]} key={index}
                            onPress={() => { console.log(rides.name); navigation.navigate("Waiting", { userID: 'Micky' }) }}>
                            <Text style={styles.restaurantName}>{rides.name}</Text>
                            <Text style={styles.restaurantRating}>{rides.rating}/5</Text>
                            <Text style={styles.restaurantPrice}>{rides.time}</Text>
                        </Pressable>
                    )
                }
                )}
            </ScrollView>
        </View>
    )
}