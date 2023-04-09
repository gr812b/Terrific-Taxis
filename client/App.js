import { StyleSheet, LogBox } from 'react-native';

import * as React from 'react';
import { useState } from "react"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'


import { LoginScreen } from "./src/components/LoginScreen.js"
import { ProfileScreen } from "./src/components/ProfileScreen.js"
import { CreateProfileScreen } from "./src/components/CreateProfileScreen.js"
import { HomeScreen } from "./src/components/HomeScreen.js"
import { RestaurantsScreen } from "./src/components/RestaurantsScreen.js"
import { MenuScreen } from "./src/components/MenuScreen.js"
import { ReceiptScreen } from "./src/components/ReceiptScreen.js"
import { ScanScreen } from './src/components/ScanScreen.js';
import { SelectDestinationScreen } from './src/components/SelectDestination.js';
import { FoodSelect } from './src/components/FoodSelect.js';
import { RidingScreen } from './src/components/RidingScreen.js';
import { RequestRide } from './src/components/RequestRide.js';
import { RidesScreen } from './src/components/RidesScreen.js';
import { ArrivedScreen } from './src/components/ArrivedScreen.js';

// Ignore this bc it doesn't matter
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function HomeHandler({ route }) {

  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  const { setIsSignedIn } = route.params;

  return (
    <Drawer.Navigator initialRouteName="HomeHandler" drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() => setIsSignedIn(false)} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} initialParams={{ name: 'Jane' }} />
      <Stack.Screen name="Offer Ride" component={OfferRideHandler}/>
      <Stack.Screen name="Request Ride" component={RequestRideHandler}/>
    </Drawer.Navigator>
  );
}

function OfferRideHandler( route ) {
  
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Scan" component={ScanScreen} options={{title: "Please Scan QR Code:"}}/>
        <Stack.Screen name="Destination" component={SelectDestinationScreen} options={{title: "Please Select Destination:"}}/>
        <Stack.Screen name="FoodSelect" component={FoodSelect} options={{title: "Would you like to order food?"}}/>
        <Stack.Screen name="Restaurants" component={RestaurantsScreen}/>
        <Stack.Screen name="Menu" component={MenuScreen} initialParams={{ restaurantId: '20' }}/>
        <Stack.Screen name="Receipt" component={ReceiptScreen} initialParams={{ order: [] }}/>
        <Stack.Screen name="Riding" component={RidingScreen} options={{title: "You're on your way!"}}/>
        <Stack.Screen name="Arrived" component={ArrivedScreen} options={{title: "You have arrived!"}}/>
      </Stack.Navigator>
  )
}

function RequestRideHandler( route ) {

  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Request" component={RequestRide} options={{title: "Please Enter Location and Destination:"}}/>
        <Stack.Screen name="Rides" component={RidesScreen} options={{title: "Please Select a Ride:"}}/>
        <Stack.Screen name="Arrived" component={ArrivedScreen} options={{title: "You have arrived!"}}/>
      </Stack.Navigator>
  )
}

export default function App() {

  const Stack = createNativeStackNavigator();

  // This should be a [state, dispatch] pair, but we're only using the state for now
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator >
        {isSignedIn ? (
          <>
            <Stack.Screen name="HomeHandler" component={HomeHandler} options={{headerShown: false}} initialParams={{ setIsSignedIn: setIsSignedIn }}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Terrific Taxi' }} initialParams={{ setIsSignedIn: setIsSignedIn }} />
            <Stack.Screen name="CreateProfile" component={CreateProfileScreen} initialParams={{ setIsSignedIn: setIsSignedIn }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

