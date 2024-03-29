import { StyleSheet, Text, View, Image, TouchableOpacity, NativeModules } from "react-native"

import styles from '../styles/ProfileScreen.style'
import React, { useState, useEffect } from "react"


const scriptURL = NativeModules.SourceCode.scriptURL;
const address1 = scriptURL.split('://')[1].split('/')[0];
const hostname = address1.split(':')[0];

export const ProfileScreen = ({ navigation, route }) => {
  // A profile should contain the following: Name, Email, Phone, Address, City, Province, Zip, Rating, Number of Rides, Profile Picture
  // The profile should be editable
  // The profile should be able to be deleted
  // The profile should be able to be viewed by other users
  // The profile should be able to be viewed by the user

  const { token, setToken, id } = route.params;

  console.log(token)
  // Use id to get profile data from backend
  // Use profile data to populate profile screen
  useEffect(() => {
    getProfileData()
  }, [])

  const [profileData, setProfileData] = useState({})

  //function to get profile data from backend
  const getProfileData = async () => {
    var data1 = {}
    // Send request to backend to get profile data
    await fetch(`http://${hostname}:5000/users/getownprofile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {
      response.text().then(data => {
        console.log(JSON.parse(data))
        console.log(data)
        setProfileData(JSON.parse(data))
      })
    }).catch(error => {
      console.log("error: " + error)
    });
    // Return profile data
    console.log(data1)
  }

  //How would I make sure the getProfileData function is called right away and not after the page is rendered?
  var { username, email, phoneNumber, address, city, province, zip, rating, numRides, profilePic } = profileData;

  if (rating == undefined || rating == null || rating == NaN || rating == "") {
    rating = 4.5
  } else {
    //Otherwise set it to its average
    var sum = 0;
    for (var i = 0; i < rating.length; i++) {
      sum += rating[i];
    }
    rating = sum / rating.length;
  }

  return (
    <View >
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: "https://t4.ftcdn.net/jpg/04/44/81/51/360_F_444815152_MuNBOsOCP45r83AZLLVnjuPHx9c6XRrw.jpg" }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.info}>{city}, {province}</Text>
          <Text style={styles.info}>{email} / {phoneNumber}</Text>
          <Text style={styles.description}>
            Despite losing both of her legs in a unicycle accident when she hit the ripe age of 89,
            {" " + username} found her new hobby in a much more exciting sport: Taxi riding. Sporting a rating of
            {" " + rating}/5 through her 89 rides, the only negative reviews being those who believe in
            eugenics and/or angry unicycle riders who are out for revenge..
          </Text>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            navigation.navigate('EditProfile', { token: token, id: id })
          }}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            //send request to delete profile and then navigate to login screen by setting token to null
            console.log("delete profile")
            setToken(null);
          }}>
            <Text>Delete Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
