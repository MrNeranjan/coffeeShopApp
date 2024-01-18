
import React,{useState,useEffect} from 'react';
import {View, Text,StyleSheet, ScrollView, Touchable, TouchableOpacity} from 'react-native';
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import CartDetail from "../components/cartComponent";
import { useStore } from  "../storage/storeData"; 
import { useNavigation } from '@react-navigation/native';  
import { HeaderBar } from '../components/homeScreenComp';

export default function CartScreen() {

    const navigation = useNavigation();
    const CartList = useStore((state) => state.CartList);


    const [subTotal, setSubTotal] = useState(0);

    function getSubTotal(){
        let total = 0;
        CartList.forEach((item) => {
            total += parseFloat(item.price[0].price)*item.price[0].quantity + parseFloat(item.price[1].price)*item.price[1].quantity+parseFloat(item.price[2].price)*item.price[2].quantity;
        })
        return total.toFixed(2);
    }

    useEffect(() => {
        setSubTotal(getSubTotal());
    }
    , [CartList]);

    function payHandle(){
        
        navigation.push("PaymentDetailScreen",{
            subTotal:subTotal
        })

    }
    

    function CreateCart(props){
        return(
            <CartDetail
                key={props.id}
                id={props.id}
                name={props.name}
                price={props.price}
                Ingredients={props.Ingredients}
                roasted={props.roasted}
                image_square={props.image_square}
            />
        )
    }
    if(CartList.length === 0){
        return(
            <View style ={{backgroundColor:"#21262E",flex:1}}>
                <HeaderBar
                    title="Cart"
                />
                <View style={{flex:1,backgroundColor:"#21262E",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#AEAEAE",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Cart is Empty</Text>
                </View>
            </View>
        )
    }else{
        return (
            <View style ={{backgroundColor:"#21262E",flex:1}}>
                <HeaderBar
                    title="Cart"
                />
                    <ScrollView style ={{backgroundColor:"#21262E"}}>
                        <View style ={styles.body}>
                            {CartList.map(CreateCart)}
                        </View>
                    </ScrollView> 
                <View style={styles.payingSection}>
                    <View>
                        <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:"bold",textAlign:"center"}}>Total</Text>
                        <Text style={{color:"#FFFFFF",fontSize:25,fontWeight:"bold",textAlign:"center"}}><Text style={{color:"#D17842"}}>$ </Text> {subTotal}</Text>
                    </View>
                    <TouchableOpacity onPress={payHandle}>
                        <View>
                            <Text style={styles.pay}>Pay</Text>
                        </View>
                    </TouchableOpacity>
                </View>
             </View>

        )
    }


}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:"#21262E",
        marginBottom:230
        
    },
    pay:{
        color:"#FFFFFF",
        fontSize:30,
        fontWeight:"bold",
        textAlign:"center",
        backgroundColor:"#D17842",
        paddingVertical:10,
        paddingHorizontal:40,
        borderRadius:20,
        marginHorizontal:5,
        
    },
    payingSection:{
        flexDirection:"row",
        justifyContent:"space-between",
        position:"absolute",
        bottom:115,
        alignItems:"center",
        paddingHorizontal:10,
        width:"100%",
    }
});