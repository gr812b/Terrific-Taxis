import { Text, View, ScrollView, Pressable } from "react-native"

import styles from '../styles/RestaurantsScreen.style'

export const RestaurantsScreen = ({ navigation }) => {

    //Eventually this will be fetched from the database
    const restaurants = [
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
                        onPress={() => {console.log(restaurant.name); navigation.navigate('Menu', { restaurantId: `${restaurant}` })}}>
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