import React from 'react';
import {View, Text,StyleSheet,ScrollView,FlatList, StatusBar} from 'react-native';
import FavoriteCard from '../components/favoriteItemComponent';
import { useStore } from "../storage/storeData";
import { useNavigation } from '@react-navigation/native';
import { HeaderBar } from '../components/homeScreenComp';



export default function FavoriteScreen() {
    const favoriteList = useStore((state) => state.favoriteList);


    function CreateCart(props){
        return(
            <FavoriteCard
                key={props.id}
                id={props.id}
                name={props.name}
                price={props.price}
                Ingredients={props.Ingredients}
                rate={props.rate}
                ratings_count={props.ratings_count}
                favorite={props.favorite}
                roasted={props.roasted}
                description={props.description}
                image_portrait={props.image_portrait}
                image_square={props.image_square}
            />
        )
    }

    if(favoriteList.length === 0){
        return(
            <View style={{backgroundColor:"#21262E",flex:1}}>
                <HeaderBar
                    title="Favorite"
                />
            
                <View style={{flex:1,backgroundColor:"#21262E",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#AEAEAE",fontSize:22,fontWeight:"bold"}}>No Favorite Items</Text>
                </View>
            </View>
        )
    }else{
        return (
            <View style={{backgroundColor:"#21262E",flex:1}}>
                <HeaderBar
                    title="Favorite"
                />
                <ScrollView style={{backgroundColor:"#21262E"}}>
                    
                    <View style={styles.body}>
                        {favoriteList.map(CreateCart)}
                    </View>
                    
                </ScrollView>
            </View>
        )

    }


}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:"#21262E",
        marginBottom:115
        
    }
});