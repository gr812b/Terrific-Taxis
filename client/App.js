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

// Ignore this bc it doesn't matter
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function HomeHandler({ route }) {

  const Drawer = createDrawerNavigator();

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
      <Drawer.Screen name="Restaurants" component={RestaurantsScreen} />
      <Drawer.Screen name="Menu" component={MenuScreen} initialParams={{ restaurantId: '20' }}/>
      <Drawer.Screen name="Receipt" component={ReceiptScreen} initialParams={{ order: 'ordergo' }}/>
    </Drawer.Navigator>
  );
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
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Welcome' }} initialParams={{ setIsSignedIn: setIsSignedIn }} />
            <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
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

