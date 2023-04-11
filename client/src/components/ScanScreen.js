import { View, Button, Text, TextInput, Image, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native"
import styles from '../styles/ScanScreen.style'
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NativeModules } from 'react-native';


const cameraIcon = require('../../assets/camera.png');
const rightArrow = require('../../assets/rightarrow.png');
const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

export const ScanScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [active, setActive] = useState(true);
    const [taxiInfo, setTaxiInfo] = useState({});

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setActive(false);
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        fetch(`http://${hostname}:5000/rides/taxi/${data}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                //'authorization': 'Bearer ' + JSON.parse(data).token
            },
        }).then(response => {
            if (response.status === 500) {
                alert('Invalid Taxi QR Code!')
            }
            response.json().then((data) => {
                setTaxiInfo(data)
            })
        }).catch(error => {
            alert('Invalid Taxi QR Code!')
            console.log("error: " + error)
        });

    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={active && styles.cameraContainer}>
            {active ?
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                /> : null}
            {!active ?
                <>
                    <View style={styles.container}>
                        <Text style={styles.heading}>Taxi Details:</Text>
                        <Text style={styles.body}>Driver: {taxiInfo.driveName}</Text>
                        <Text style={styles.body}>Make of Vehicle: {taxiInfo.make}</Text>
                        <Text style={styles.body}>Max Number of Passengers: {taxiInfo.numberOfSeats}</Text>
                    </View>
                    {!active && <Button style={styles.scanButton} title={'Scan Another Taxi'} onPress={() => { setScanned(false); setActive(true); setTaxiInfo({}) }} />}

                    <Pressable onPress={() => navigation.navigate('Destination', { taxiInfo: taxiInfo })} >
                        <View style={{
                            alignItems: "center",
                            paddingVertical: 12,
                            marginTop: 16,
                            borderRadius: 3,
                            backgroundColor: "yellow"
                        }}>
                            <Text>Next</Text>
                        </View>
                    </Pressable>

                </>
                : null}
        </View>
    )
}