import { Text, View, Pressable, StyleSheet } from "react-native"
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../styles/HomeScreen.style'



export const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Pressable onPress={() => navigation.navigate('Offer Ride')} style={styles.button}>
                <Text style={styles.buttonText}>Offer a ride</Text>
            </Pressable>

            <View style={{ height: 50 }} />

            <Pressable onPress={() => navigation.navigate('Menu', { restaurantId: 'MickeyDDD1-1' })} style={styles.button}>
                <Text style={styles.buttonText}>Request a ride</Text>
            </Pressable>
            
            

            <View style={{ height: 75 }} />
        </View>
    )
};

