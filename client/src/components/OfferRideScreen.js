import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, Pressable } from "react-native"
import styles from '../styles/OfferRideScreen.style'


const cameraIcon = require('../../assets/camera.png');
const rightArrow = require('../../assets/rightarrow.png');


export const ScanScreen = ({ navigation }) => {
    return (
        <View>
            <Image source={cameraIcon} style={styles.image} resizeMode="contain" />
            <Text>Taxi Details:</Text>
            <Text>Details about the Taxi</Text>
            <Pressable onPress={() => navigation.navigate('Destination')} style={styles.button}>
                <Text>Next</Text>
            </Pressable>
        </View>   
    )
}