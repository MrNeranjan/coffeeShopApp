import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { StyleSheet, Text, View,StatusBar } from "react-native";
import TabNavigator from "./assets/navigators/tabNavigator";
import DetailScreen from "./assets/screens/DetailsScreen";
import PaymentDetailScreen from "./assets/screens/PaymentDetailScreen";
import OderHistoryScreen from "./assets/screens/OrderHistoryScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <StatusBar/>
      <Stack.Navigator 
        screenOptions={{headerShown:false}}>
        <Stack.Screen 
          name="Tab" 
          component={TabNavigator}
          options={{animation:'slide_from_right'}}
          
        />
        <Stack.Screen 
          name="DetailScreen" 
          component={DetailScreen}
          options={{animation:'slide_from_right'}}

        />
        <Stack.Screen 
          name="PaymentDetailScreen" 
          component={PaymentDetailScreen}
          options={{animation:'slide_from_right'}}

        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}