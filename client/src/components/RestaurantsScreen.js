import { Text, View, ScrollView, Pressable, NativeModules } from "react-native"
import { useState, useEffect } from "react"

import styles from '../styles/RestaurantsScreen.style'

const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

export const RestaurantsScreen = ({ navigation }) => {

    // On startup, fetch all restaurants from the server
    useEffect(() => {
        getRestaurantInfo();
    }, [])

    console.log(hostname)

    const restaurants = [{}]

    // Fetch menu from a single restaurant
    const getRestaurantInfo = async () => {
        const response = await fetch(`http://${hostname}:5000/rides/menu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({restaurantId: "64332d8958807926620b4884"})
        }).then(response => {
            console.log("Restaurant data: " + JSON.stringify(response))
            response.text().then(data => {
                restaurants.push(JSON.parse(data))
            })
        }).catch(error => {
            console.log("error: " + error)
        });
    }

    //Delete soon
    const restaurantsTemp = [
        {
            name: "McDonalds",
            rating: 4.5,
            price: "$",
        },
        {
            name: "Japan",
            rating: 3.7,
            price: "$$$",
        },
        {
            name: "Wendy's",
            rating: 5,
            price: "$",
        },
        {
            name: "SlowChic",
            rating: 4.7,
            price: "$$",
        },
        {
            name: "BurritoDecorator",
            rating: 10,
            price: "$$$$$",
        },
        {
            name: "SlowChic",
            rating: 4.7,
            price: "$$",
        },
        {
            name: "BurritoDecorator",
            rating: 10,
            price: "$$$$$",
        },
        {
            name: "SlowChic",
            rating: 4.7,
            price: "$$",
        },
        {
            name: "BurritoDecorator",
            rating: 10,
            price: "$$$$$",
        },
        {
            name: "SlowChic",
            rating: 4.7,
            price: "$$",
        },
        {
            name: "BurritoDecorator",
            rating: 10,
            price: "$$$$$",
        },

    ]



    return (
        <View style={styles.container}>
            <ScrollView>
                {restaurants.map((restaurant, index) => {
                    return (
                        <Pressable style={[styles.restaurantContainer, index % 2 === 0 ? styles.even : styles.odd]} key={index}
                            onPress={() => { console.log(restaurant.name); navigation.navigate('Menu', { restaurantId: `${restaurant}` }) }}>
                            <Text style={styles.restaurantName}>{restaurant.name}</Text>
                            <Text style={styles.restaurantRating}>{restaurant.rating}/5</Text>
                            <Text style={styles.restaurantPrice}>{restaurant.price}</Text>
                        </Pressable>
                    )
                }
                )}
            </ScrollView>
        </View>
    )
}