import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, Pressable } from "react-native"
import styles from '../styles/ScanScreen.style'


const cameraIcon = require('../../assets/camera.png');
const rightArrow = require('../../assets/rightarrow.png');


export const ScanScreen = ({ navigation }) => {
    return (
        <View>
            <Image source={cameraIcon} style={styles.image} resizeMode="contain" />

            <View style={styles.container}>
                <Text style={styles.heading}>Taxi Details:</Text>
                <Text style={styles.body}>Details about the Taxi</Text>
            </View>

            <View style={{height: 500}}>
                <Pressable onPress={() => navigation.navigate('Destination')} style={styles.button}>
                    <Text>Next</Text>
                </Pressable>
            </View>
        </View>   
    )
}