import React from 'react';
import {View, Text,StyleSheet,ScrollView} from 'react-native';
import { useStore } from "../storage/storeData";
import SuccessfulPayments from '../components/orderHistoryComponent';
import { HeaderBar } from '../components/homeScreenComp';

export default function OderHistoryScreen() {

    const orderHistoryList = useStore((state) => state.orderHistoryList)

    let slicedOrderHistoryList = orderHistoryList;

    if(orderHistoryList.length > 30){
       slicedOrderHistoryList = orderHistoryList.slice(-30);
    }
    
   

    function CreateCart(props){
        return(
            <SuccessfulPayments
                key={props.id}
                id={props.id}
                paymentMethod={props.paymentMethod}
                price={props.price}
                time={props.time}
                
            />
        )
    
    }

    if(slicedOrderHistoryList.length === 0){
        return(
            <View style ={{backgroundColor:"#21262E",flex:1}}>
                <HeaderBar
                    title="Cart"
                />
                <View style={{flex:1,backgroundColor:"#21262E",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#AEAEAE",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Empty</Text>
                </View>
            </View>
        )
    }else{
            return (
                <View style={styles.body} >
                    <HeaderBar
                        title="Order History"
                        />
                    <ScrollView style={{backgroundColor:"#21262E",flex:1,marginTop:7,padding:20}}>
                         {slicedOrderHistoryList.map(CreateCart)}
                         <View style={{marginBottom:115}}></View>
                    </ScrollView>
        
                    
                </View>
            )
        }

}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:"#21262E",

        
    }
});