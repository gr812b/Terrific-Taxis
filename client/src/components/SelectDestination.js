import { View, Button, Text, TextInput, Image, KeyboardAvoidingView } from "react-native"
import { useState } from "react"
import styles from '../styles/LoginScreen.style'



export const SelectDestinationScreen = ({navigation}) => {

    const [destination, setDestination] = useState("");

    return(
        <View>
            <Text>MAP GOES HERE!</Text>
            <TextInput
                placeholder="Enter Destination"
                onChangeText={setDestination}
                value={destination}
                style={styles.input}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Enter"
                    onPress={() => {navigation.navigate('FoodSelect')}}
                    style={styles.submitButton}
                />
            </View>
        </View>

    )
}