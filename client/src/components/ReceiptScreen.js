import { Text, View, ScrollView, Pressable } from "react-native"

import styles from '../styles/ReceiptScreen.style'

export const ReceiptScreen = ({ navigation, route }) => {
    const { order } = route.params;

    console.log(order)

    // Example order
    var orderTemp = {
        "Food": {
            "price": 25,
            "quantity": 1
        },
        "Drink": {
            "price": 15,
            "quantity": 2
        },
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {Object.keys(order).map((item, index) => {
                        return (
                            <View style={styles.itemContainer} key={index}>
                                <Text style={styles.itemName}>{item}</Text>
                                <Text style={styles.itemQuantity}>x{order[item].quantity}</Text>
                                <Text style={styles.itemPrice}>${order[item].price}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalPrice}>
                    ${Object.keys(order).reduce((total, item) => {
                        return total + order[item].price * order[item].quantity
                    }, 0)}
                </Text>
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Riding')}>
                <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
        </View>
    )
}