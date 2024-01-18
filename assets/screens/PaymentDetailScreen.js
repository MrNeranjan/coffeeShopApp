import {View, Text,StyleSheet,Dimensions,Image, TouchableOpacity,StatusBar,Alert} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import { useStore } from '../storage/storeData';



export default function PaymentDetailScreen({route}) {

    const orderHistoryList = useStore((state) => state.orderHistoryList);
    const CartList = useStore((state) => state.CartList);

    const {subTotal} = route.params;

    const navigation = useNavigation();
    const [selectedPayment, setSelectedPayment] = useState("Credit Card");

    function createPaymentTitle(name){
        return(
            <PaymentTitle
                key={name}
                name={name}
                selectedPayment={selectedPayment} 
                setSelectedPayment={setSelectedPayment} 
            />
        )
    }

    function backHandle(){
        navigation.goBack();

    }

    function paymentHandler(){
        

        useStore.setState(prevState => {
            const item ={
                id:orderHistoryList.length+1,
                price:subTotal,
                paymentMethod:selectedPayment,
                time:new Date().toLocaleString()
            }
            return { 
                orderHistoryList: [...prevState.orderHistoryList, item],
                CartList:[],
               
            };
        });

        Alert.alert("Dear Customer","Payment Successful");
        navigation.goBack();
    }
    // orderHistoryList.pop();

    
    return (
        <View style ={styles.body}>
            <View style={styles.header}>
                <TouchableOpacity onPress={backHandle} >
                    <FontAwesome name="chevron-left" size={22} color="#FFFFFF" style={{marginLeft:20,marginTop:20,backgroundColor:"#52555A",padding:6,borderRadius:10}} />
                </TouchableOpacity>
                <Text style={{color:"#FFFFFF",fontSize:25,fontWeight:"bold",marginLeft:20,marginTop:20}}>Payment</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedPayment("Credit Card")}>
                <LinearGradient
                    
                    colors={["#52555A","#262B33"]}
                    style={[styles.amazonpay,{borderColor:selectedPayment === "Credit Card" ? "#D17842" : "#252A32",borderWidth:2}]}
                    start={{x:0,y:0}}
                    end={{x:1,y:1}} >
            
                    <FontAwesome name="credit-card" size={30} color="#D17842" />
                    <Text style={{color:"#AEAEAE",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Credit Card</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedPayment("Amazon Pay")}>
                <LinearGradient
                    
                    colors={["#52555A","#262B33"]}
                    style={[styles.amazonpay,{borderColor:selectedPayment === "Amazon Pay" ? "#D17842" : "#252A32",borderWidth:2}]}
                    start={{x:0,y:0}}
                    end={{x:1,y:1}} >
            
                    <Image
                        source={require("../assets/app_images/amazonpay.png")}
                        style={{width:50,height:50}}
                    />
                    <Text style={{color:"#AEAEAE",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Amazon Pay</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedPayment("Apple Pay")}>
                <LinearGradient
                    
                    colors={["#52555A","#262B33"]}
                    style={[styles.amazonpay,{borderColor:selectedPayment === "Apple Pay" ? "#D17842" : "#252A32",borderWidth:2}]}
                    start={{x:0,y:0}}
                    end={{x:1,y:1}} >
            
                    <Image
                        source={require("../assets/app_images/applepay.png")}
                        style={{width:50,height:50}}
                    />
                    <Text style={{color:"#AEAEAE",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Apple Pay</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedPayment("Google Pay")}>
                <LinearGradient
                    
                    colors={["#52555A","#262B33"]}
                    style={[styles.amazonpay,{borderColor:selectedPayment === "Google Pay" ? "#D17842" : "#252A32",borderWidth:2}]}
                    start={{x:0,y:0}}
                    end={{x:1,y:1}} >
            
                    <Image
                        source={require("../assets/app_images/gpay.png")}
                        style={{width:50,height:50}}
                    />
                    <Text style={{color:"#AEAEAE",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Google Pay</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.payingSection}>
                    <View>
                        <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:"bold",textAlign:"center"}}>Total</Text>
                        <Text style={{color:"#FFFFFF",fontSize:25,fontWeight:"bold",textAlign:"center"}}><Text style={{color:"#D17842"}}>$</Text> {subTotal}</Text>
                    </View>
                    <TouchableOpacity onPress={paymentHandler}>
                        <View>
                            <Text style={styles.pay}>Pay with {selectedPayment}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:"#21262E",
        
    },
    header:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:StatusBar.currentHeight,
        marginBottom:"15%",
        backgroundColor:"#21262E",
        width:"65%",
    },
    amazonpay:{
        backgroundColor:"#252A32",
        width:Dimensions.get("window").width - 30,
        height:70,
        alignSelf:"center",
        marginTop:10,
        borderRadius:20,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
    },
    pay:{
        color:"#FFFFFF",
        fontSize:20,
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
        bottom:30,
        alignItems:"center",
        paddingHorizontal:10,
        width:"100%",
    }
});