import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#00BFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    heading: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 30
    },
    body: {
        marginTop: 20
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    scanButton: {
        marginTop: "3%",
        marginBottom: "3%",
    }
})
