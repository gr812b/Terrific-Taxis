import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Make attributes for each thing in RestaursntsScreen.js
    container: {
        padding: 10,
        height: '95%',
    },
    restaurantContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 80,
        borderWidth: 1,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212321',


    },
    restaurantRating: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212321',
    },
    restaurantPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212321',
    },
    even: {
        backgroundColor: '#87ceeb',
    },
    odd: {
        backgroundColor: '#add8e6',
    },
});