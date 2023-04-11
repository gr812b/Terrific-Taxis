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

    var [restaurants, setRestaurants] = useState([{}]);

    // Fetch menu from a single restaurant
    const getRestaurantInfo = async () => {
        await fetch(`http://${hostname}:5000/rides/restaurants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            }
        }).then(response => {
            console.log("Restaurant data: " + JSON.stringify(response))
            response.text().then(data => {
                setRestaurants(JSON.parse(data))
                console.log("Info: " + JSON.stringify(JSON.parse(data)[0].menuItem))
            })
        }).catch(error => {
            console.log("error: " + error)
        });
    }



    return (
        <View style={styles.container}>
            <ScrollView>
                {restaurants.map((restaurant, index) => {
                    return (
                        <Pressable style={[styles.restaurantContainer, index % 2 === 0 ? styles.even : styles.odd]} key={index}
                            onPress={() => { console.log(restaurant.name); navigation.navigate('Menu', { restaurantInfo: restaurant, baba: "hello" }) }}>
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