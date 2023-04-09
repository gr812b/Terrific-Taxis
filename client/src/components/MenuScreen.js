import { Text, View, ScrollView, Pressable } from "react-native"
import CounterInput from "react-native-counter-input"
import React, { useState, useEffect } from "react"

import styles from '../styles/MenuScreen.style'

export const MenuScreen = ({ navigation, route }) => {

    const { restaurantInfo } = route.params;

    // Delete soon
    const menuItems = [
        {
            name: "Food",
            price: 25,
        },
        {
            name: "Drink",
            price: 15,
        },
        {
            name: "Dessert",
            price: 10,
        },
        {
            name: "Appetizer",
            price: 5,
        },
        {
            name: "Snack",
            price: 2,
        },
        {
            name: "Appetizer",
            price: 5,
        },
        {
            name: "Snack",
            price: 2,
        },
        {
            name: "Appetizer",
            price: 5,
        },
        {
            name: "Snack",
            price: 2,
        },
        {
            name: "Appetizer",
            price: 5,
        },
        {
            name: "Snack",
            price: 2,
        },
    ]

    const [order, setOrder] = useState({});

    return (
        <View style={styles.container}>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {menuItems.map((menuItem, index) => {
                        return (
                            <View style={[styles.menuItemContainer, index % 2 === 0 ? styles.even : styles.odd]} key={index} >
                                <Text style={styles.menuItemName}>{menuItem.name}</Text>
                                <Text style={styles.menuItemPrice}>{menuItem.price}</Text>
                                <CounterInput
                                    onChange={(counter) => {
                                        console.log(`onChange Counter ${menuItem.name}:`, counter);
                                        setOrder({ ...order, [menuItem.name]: {quantity: counter, price: menuItem.price} });
                                    }}
                                    horizontal={true}
                                    style={styles.counterInput}
                                    min={0}
                                    backgroundColor="#E0E5E0"
                                />
                            </View>
                        )
                    }
                    )}
                </ScrollView>
            </View>
            <Pressable style={styles.checkoutButton} onPress={() => {
                console.log("Order"); navigation.navigate('Receipt', { restaurantId: 'MickeyDDD1-1', order: order})
                }}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </Pressable>
        </View>
    )
}