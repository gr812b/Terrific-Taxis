import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, FlatList } from "react-native"
import React from 'react'

export const RidingScreen = ({navigation, route}) => {

    const members = [
        {id: '1', key: 'Ibrahim'},
        {id: '2', key: 'Kai'},
        {id: '3', key: 'Stan'},
        {id: '4', key: 'Richard'},
        {id: '5', key: 'Andrew'},
    ];

    const renderItem = ({ item }) => (
        <View>
          <Text>{item.key}</Text>
        </View>
      );

    return (
        <View>
            <Text>Members:</Text>
            <Text></Text>
            <FlatList
                data={members}
                renderItem={renderItem}
            />
            <Text></Text>
            <Text>Route:</Text>
            <Text>MAP GOES HERE!</Text>
            <Text></Text>
            <Text>Time Remaining:</Text>
        </View>
    )
}