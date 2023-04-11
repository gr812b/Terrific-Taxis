import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, FlatList } from "react-native"
import React from 'react'

export const ArrivedScreen = ({ route, navigation }) => {

    return (
        <View>
            <Text>Fare: $25.21</Text>
            <TextInput placeholder="Tip Amount" />
        </View>
    )
}