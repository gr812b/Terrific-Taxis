import { View, Button, Text, TextInput, Image, Pressable, KeyboardAvoidingView } from "react-native"
import React from 'react';
import styles from '../styles/FoodSelect.style'

export const FoodSelect = ({navigation}) => {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Pressable onPress={() => navigation.navigate('Restaurants')} style={styles.button}>
                <Text style={styles.buttonText}>Yes</Text>
            </Pressable>
        
            <View style={{ height: 50 }} />

            <Pressable onPress={() => navigation.navigate('Menu', { restaurantId: 'MickeyDDD1-1' })} style={styles.button}>
                <Text style={styles.buttonText}>No</Text>
            </Pressable>

            <View style={{ height: 75 }} />
        </View>
    )   
}