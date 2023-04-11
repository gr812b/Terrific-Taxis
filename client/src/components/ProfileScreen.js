import { StyleSheet, Text, View, Image, TouchableOpacity, NativeModules } from "react-native"

import styles from '../styles/ProfileScreen.style'


const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];



export const ProfileScreen = ({ navigation, route }) => {
  // A profile should contain the following: Name, Email, Phone, Address, City, Province, Zip, Rating, Number of Rides, Profile Picture
  // The profile should be editable
  // The profile should be able to be deleted
  // The profile should be able to be viewed by other users
  // The profile should be able to be viewed by the user

  const { token, setToken, id } = route.params;
  const [profile, setProfile] = useState({});

  console.log(token)
  // Use id to get profile data from backend
  // Use profile data to populate profile screen

  //function to get profile data from backend
  const getProfileData = (id) => {
    // Send request to backend to get profile data
    fetch(`http://${hostname}:5000/users/getownprofile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ friendId: "6433456275de7af7bc55127f" })
    }).then(response => {
      response.text().then(data => {
        console.log(JSON.parse(data))
        console.log(data)
      })
    }).catch(error => {
      console.log("error: " + error)
    });
    // Return profile data
    return {
      name: "Jane Dough",
      email: "janejen@coolgal.ca",
      phone: "123-456-7890",
      address: "123 Fake Street",
      city: "Toronto",
      province: "Ontario",
      zip: "M4B 1B3",
      rating: 4.5,
      numRides: 10,
      profilePic: "https://t4.ftcdn.net/jpg/04/44/81/51/360_F_444815152_MuNBOsOCP45r83AZLLVnjuPHx9c6XRrw.jpg"
    }
  }

  //How would I make sure the getProfileData function is called right away and not after the page is rendered?
  const profileData = getProfileData(id);
  const { name, email, phone, address, city, province, zip, rating, numRides, profilePic } = profileData;

  return (
    <View >
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: profilePic }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>{city}, {province}</Text>
          <Text style={styles.info}>{email} / {phone}</Text>
          <Text style={styles.description}>
            Despite losing both of her legs in a unicycle accident when she hit the ripe age of 89,
            {name} found her new hobby in a much more exciting sport: Taxi riding. Sporting a rating of
            {rating}/5 through her {numRides} rides, the only negative reviews being those who believe in
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