import { Text, View, Pressable, StyleSheet, TextInput } from "react-native"
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../styles/HomeScreen.style'
import React, { useState, useEffect } from "react"



export const AddFriendScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        console.log("Add friend here with email: " + email)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
            <Text style={styles.titleText}>Add a friend</Text>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 150 }}>
                <TextInput style={styles.input} placeholder="Enter friend's email" onChangeText={setEmail}/>
                <Pressable onPress={() => handleSubmit()} style={[styles.button, {width: 150, height:100}]}>
                    <Text style={styles.buttonText}>Add</Text>
                </Pressable>
            </View>
        </View>
    )
};

