import { Text, View, ScrollView, Pressable } from "react-native"

import styles from '../styles/ReceiptScreen.style'

export const ReceiptScreen = ({ navigation, route }) => {
    const { order } = route.params;

    // Example order
    var orderTemp = [
        {
            name: "Food",
            price: 25,
            quantity: 1,
        },
        {
            name: "Drink",
            price: 15,
            quantity: 2,
        },
        {
            name: "Dessert",
            price: 10,
            quantity: 1,
        },
        
    ]

    return (
        <View style={styles.container}>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {orderTemp.map((item, index) => {
                        return (
                            <View style={styles.itemContainer} key={index}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                                <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
                            </View>
                        )
                    }
                    )}
                </ScrollView>
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalPrice}>
                    ${orderTemp.reduce((total, item) => total + item.price * item.quantity, 0)}
                </Text>
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </Pressable>
        </View>
    )
}