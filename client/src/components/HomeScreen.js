import { Text, View, StyleSheet } from "react-native"
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

export const HomeScreen = ({ navigation }) => {
    return (
        
        <View style={{flex: 1}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Request Ride</Text>
                <Text>Offer Ride</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});