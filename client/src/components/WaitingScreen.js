import { StyleSheet, Text, View, Image, TouchableOpacity, NativeModules } from "react-native"

export const WaitingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Waiting for driver...</Text>
            </View>
            <View style={styles.body}>
                {/* <Image style={styles.image} source={require('../assets/Waiting.png')} /> */}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Riding') }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}