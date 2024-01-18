import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
// import { BlurView } from '@react-native-community/blur';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavouriteScreen';
import OderHistoryScreen from '../screens/OrderHistoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FontAwesome from "@expo/vector-icons/FontAwesome";


const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarHideOnKeyboard:true,
                tabBarShowLabel:false,
                tabBarStyle:styles.tabBarStyle,
                
            }}  
        >        
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon:({focused,size,color}) => (
                        <FontAwesome 
                            name="home" 
                            size={20} 
                            color= {focused ? "#D17842":"#141921"}
                        />
                    )
                }}
                />
            <Tab.Screen  
                name="Cart" 
                component={CartScreen} 
                options={{
                    tabBarIcon:({focused,size,color}) => (
                        <FontAwesome 
                            name="shopping-cart" 
                            size={20} 
                            color= {focused ? "#D17842": "#141921"}
                        />
                    )
                }}
                />
            <Tab.Screen 
                name="Favorite" 
                component={FavoriteScreen} 
                options={{
                    tabBarIcon:({focused,size,color}) => (
                        <FontAwesome 
                            name="heart" 
                            size={20} 
                            color= {focused ? "#D17842": "#141921"}
                        />
                    )
                }}
                 />
            <Tab.Screen 
                name="OrderHistory" 
                component={OderHistoryScreen} 
                options={{
                    tabBarIcon:({focused,size,color}) => (
                        <FontAwesome 
                            name="bell" 
                            size={20} 
                            color= {focused ? "#D17842": "#141921"}
                            
                        />
                    )
                }}
                />
            
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    tabBarStyle :{
        position:'absolute',
        bottom:25,
        left:20,
        right:20,
        elevation:0,
        backgroundColor: "rgba(174, 174, 174, 0.3)", // 0.5 is the opacity
        opacity:0.6,
        borderRadius:30,
        height:80,
        borderTopColor:'transparent',
    
    
    },
    blurStyle:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:100,
    }
    
});