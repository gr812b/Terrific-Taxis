import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Make attributes for each thing in RestaursntsScreen.js
    container: {
        padding: 10,
        height: '100%',
        alignItems: 'center',
    },
    scrollContainer: {
        height: '85%',
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 80,
        borderWidth: 1,
        //set text size for all children
        
    },
    menuItemName: {
        fontWeight: 'bold',
        color: '#212321',
        fontSize: 20,

    },
    menuItemPrice: {
        fontWeight: 'bold',
        color: '#212321',
        fontSize: 20,
    },
    even: {
        backgroundColor: '#87ceeb',
    },
    odd: {
        backgroundColor: '#add8e6',
    },
    counterInput: {
        height: 50,
        width: 150,
    },
    checkoutButton: {
        margin: 10,
        height: 80,
        width: 250,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#696969',
        borderStyle: 'solid',
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
    
    },
    checkoutButtonText: {
        textAlign: 'center',
        fontSize: 32,
        color: '#212321',
        fontWeight: 'bold',
    }

});