import { Text, View, ScrollView, Pressable, NativeModules } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ReceiptScreen.style'
const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];
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

export const ReceiptScreen = ({ navigation, route }) => {
    const { order } = route.params;
    const { userID, destination, location, numppl, taxiInfo, locationAddress, destinationAddress, offeringSocket, price } = route.params
    console.log(order)
    const handleSubmit = async () => {
        const token = await getData();
        fetch(`http://${hostname}:5000/rides/createoffer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                userID: userID, destination: destination, location: location, numppl: taxiInfo.numberOfSeats, taxiInfo: taxiInfo, locationAddress: locationAddress, destinationAddress: destinationAddress, offeringSocket: offeringSocket, price: price
            }),
        }).then(response => {
            response.json().then((data) => {
                console.log(data)
                console.log(data._id)
                navigation.navigate('Riding', { rideId: data._id });
            })
        }).catch(error => {
            alert('Invalid Taxi QR Code!')
            console.log("error: " + error)
        });
    }
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
            <Pressable style={styles.button} onPress={async () => { await handleSubmit(); }}>
                <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
        </View >
    )
}