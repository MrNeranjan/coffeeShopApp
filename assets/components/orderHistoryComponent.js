import React from "react";
import {Text,View,StyleSheet,Image,TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SuccessfulPayments({id,paymentMethod,price,time}){
    return(
        <View>
            <LinearGradient
                colors={["#52555A","#262B33"]}
                style={styles.cart}
                start={{x:0,y:0}}
                end={{x:1,y:1}}
            >
                <Text style={styles.TextStyle}>Order ID :<Text style={styles.InnerTextStyle}> {id}</Text></Text>
                <Text style={styles.TextStyle}>Order Date & Time :<Text style={styles.InnerTextStyle}> {time}</Text></Text>
                <Text style={styles.TextStyle}>Order Total :<Text style={styles.InnerTextStyle}> $ {price}</Text></Text>
                <Text style={styles.TextStyle}>Order Payment Method :<Text style={styles.InnerTextStyle}> {paymentMethod}</Text></Text>
                <Text style={styles.TextStyle}>Order Status :<Text style={{color:"green"}}>Successful</Text></Text>
            </LinearGradient>
        </View>
    )
};

const styles = StyleSheet.create({
    cart:{
        flex:1,
        width:"100%",
        borderRadius:10,
        padding:20,
        marginBottom:20,
    },
    TextStyle:{
        color:"#AEAEAE",
        fontSize:15,
        fontWeight:"bold",
    },
    InnerTextStyle:{
        color:"#FFFFFF",
        fontSize:15,
        fontWeight:"bold",
    }

})