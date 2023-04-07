import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Make buttons to be large, taking up 90% width and 30% height
    button: {
        width: '90%',
        height: '30%',
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#696969',
        borderStyle: 'solid',
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Now the button text is centered and larger
    buttonText: {
        textAlign: 'center',
        fontSize: 32,
        color: '#212321',
        fontWeight: 'bold',
    },
});