import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, FlatList, StyleSheet } from "react-native"
import React from 'react'

export const ArrivedScreen = ({ route, navigation }) => {

    const { rideData } = route.params;

    const price = Number(rideData?.price / (rideData?.riders?.length + 1)).toFixed(2)

    console.log(rideData)

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Fare: ${price}</Text>
            {/* Next display estimated tips for 15, 20, and 25% */}
            <Text style={styles.subtitle}>Estimated Tips</Text>

            <Text />
            <Text style={styles.text}>15%: ${Number(price * 0.15).toFixed(2)}</Text>
            <Text style={styles.text}>20%: ${Number(price * 0.20).toFixed(2)}</Text>
            <Text style={styles.text}>25%: ${Number(price * 0.25).toFixed(2)}</Text>
            <Text style={{height: 100}}/>

            {/* Next rate all passengers */}
            <Text>Rate Passengers</Text>
            <View style={{height: 300}}>
            <FlatList
                data={rideData?.riders}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text>{item.username}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Rating"
                            keyboardType="numeric"
                        />
                    </View>
                )}
            />
            </View>
            {/* Next return home */}
            <Button title="Return Home" onPress={() => {
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