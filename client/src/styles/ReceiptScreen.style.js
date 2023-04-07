import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
        alignItems: 'center',
    },
    scrollContainer: {
        height: '70%',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 50,
        borderWidth: 1,
        //set text size for all children
        
    },
    itemName: {
        fontWeight: 'bold',
        color: '#212321',
        fontSize: 20,

    },
    itemQuantity: {
        fontWeight: 'bold',
        color: '#212321',
        fontSize: 20,
    },
    itemPrice: {
        fontWeight: 'bold',
        color: '#212321',
        fontSize: 20,
    },


    button: {
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
    buttonText: {
        textAlign: 'center',
        fontSize: 32,
        color: '#212321',
        fontWeight: 'bold',
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 50,
        borderWidth: 4,
        //set text size for all children
        fontSize: 20,
    },
    totalText: {
        fontWeight: 'bold',
        color: '#212321',
        fontSize: 20,
    },
    totalPrice: {
        fontWeight: 'bold',
        color: '#212321',
        fontSize: 20,
    },


})