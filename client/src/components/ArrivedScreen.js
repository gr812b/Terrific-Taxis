import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, FlatList, StyleSheet, NativeModules } from "react-native"
import React, { useState, useEffect } from "react"

const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

import AsyncStorage from '@react-native-async-storage/async-storage';
const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            console.log(value)
            return value
        }
    } catch (e) {
        console.log(e)
    }
}

export const ArrivedScreen = ({ route, navigation }) => {

    const {rideData} = route.params

    const price = Number(rideData?.price / (rideData?.riders?.length + 1)).toFixed(2)
    console.log(rideData)

    const makeRating = async (id, ratingIn) => {
        const token = await getData();
        console.log("here: "+ id, ratingIn)
        console.log(JSON.stringify({
            rating: Number(ratingIn)
        }))
        // fetch(`http://${hostname}:5000/users/signin`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'accept': 'application/json',
        //         //'authorization': 'Bearer ' + JSON.parse(data).token
        //     },
        //     body: JSON.stringify({ username: username, password: password })
        //convert id to string
        fetch(`http://${hostname}:5000/rides/rating/` + id.toString(), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                //convert rating to a number
                rating: Number(ratingIn)
            })
        }).then(res => {
            res.text().then(
                data => {
                    console.log(data)
                }
            )
        }).catch(err => {
            console.log(err)
        })
    }



    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Fare: ${price}</Text>
            {/* Next display estimated tips for 15, 20, and 25% */}
            <Text style={styles.subtitle}>Estimated Tips</Text>

            <Text />
            <Text style={styles.text}>15%: ${Number(price * 0.15).toFixed(2)}</Text>
            <Text style={styles.text}>20%: ${Number(price * 0.20).toFixed(2)}</Text>
            <Text style={styles.text}>25%: ${Number(price * 0.25).toFixed(2)}</Text>
            <Text style={{ height: 100 }} />

            {/* Next rate all passengers */}
            <Text>Rate Passengers</Text>
            <View style={{ height: 300 }}>
                <FlatList
                    data={rideData?.riders}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <Text>{item.username}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Rating"
                                keyboardType="numeric"
                                onChangeText={text => {
                                    //This should store the rating in the rider object
                                    item.tempRating = text
                                }}
                            />
                        </View>
                    )}
                />
            </View>
            {/* Next return home */}
            <Button title="Return Home" onPress={() => {
                //Here it should send the ratings to the server
                rideData?.riders.forEach(rider => {
                    makeRating(rider._id, rider.tempRating)
                })
                navigation.navigate("Home")
            }}><Text>Return Home</Text></Button>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    information: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        width: 200
    },
});