import { Text, View, ScrollView, Pressable } from "react-native"
import styles from '../styles/RestaurantsScreen.style'


export const RidesScreen = ({ navigation, route}) => {



    const rides = [
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
                {rides.map((rides, index) => {
                    return (
                        <Pressable style={[styles.restaurantContainer, index % 2 === 0 ? styles.even : styles.odd]} key={index} 
                        onPress={() => {console.log(rides.name); navigation.navigate("Waiting", { userID: 'Micky' })}}>
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