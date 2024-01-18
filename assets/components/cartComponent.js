import React ,{useEffect,useState} from "react";
import { View, Text, StyleSheet, ScrollView, FlatList,Image,TouchableOpacity,Dimensions } from "react-native";
import { useStore } from "../storage/storeData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { Cart } from "./homeScreenComp";

export default function CartDetail({id,name,price,Ingredients,roasted,image_square}) {

    const CartList = useStore((state) => state.CartList);

    function removeHandler(){
        useStore.setState(prevState => {
            const itemExists = prevState.CartList.some(item => item.id === id);
            if (itemExists) {
                // If the item exists, remove it from the favorite list
                return { CartList: prevState.CartList.filter(item => item.id !== id) };
            }
        });
    };

    function quantityIncreaseHandler(Index) {
        useStore.setState((prevState) => {
            const updatedCartList = prevState.CartList.map(item => {
                if (item.id === id) {
                    const updatedPrice = item.price.map((p, index) => {
                        if (index === Index) { 
                            return { ...p, quantity: p.quantity + 1 };
                        }
                        return p;
                    });
                    return { ...item, price: updatedPrice };
                }
                return item;
            });
    
            return { CartList: updatedCartList };
        });
    }
    
    function quantityDecreaseHandler(Index) {
        useStore.setState((prevState) => {
            const updatedCartList = prevState.CartList.map(item => {
                if (item.id === id) {
                    const updatedPrice = item.price.map((p, index) => {
                        if (index === Index) { 
                            if(p.quantity > 0){
                                return { ...p, quantity: p.quantity - 1 };
                            }else{
                                return { ...p, quantity: 0 };
                            }
                        }
                        return p;
                    });
                    return { ...item, price: updatedPrice };
                }
                return item;
            });
    
            return { CartList: updatedCartList };
        });
    }

        return(
            
                <View style={styles.body}>
                    <LinearGradient
                        colors={["#52555A","#262B33"]}
                        style={styles.cart}
                        start={{x:0,y:0}}
                        end={{x:1,y:1}}
                    >
                        <View style={styles.imageWithName}>
                            <View>
                                <Image
                                    source ={image_square}
                                    style={styles.cartImage}
                                />
                            </View>
                            <View>
                                <Text style={styles.cartTextName}>{name}</Text>
                                <Text style={styles.cartTextIngredients}>{Ingredients}</Text>
                            </View>
                            
                        </View>
                        <TouchableOpacity 
                            style={styles.remove} 
                            onPress={removeHandler}>

                            <FontAwesome  name="remove" size={24} color="red" />
                        </TouchableOpacity>
                        <View style={styles.cartBottom}>
                            <View style ={styles.prices}>
                                <Text style={styles.cartTextPrice}><Text style={{color:"#D17842"}}>$ </Text>{parseFloat((price[0].price * price[0].quantity).toFixed(2))}</Text>
                                <Text style={[styles.cartTextPrice]}>{price[0].size}</Text>
                                <Text style={styles.cartTextPrice}><Text style={{color:"#D17842"}}><FontAwesome name="remove" size={24} color="#D17842" /></Text> {price[0].quantity}</Text>
                                <View style={{flexDirection:"row"}}>
                                    <TouchableOpacity onPress={() => quantityIncreaseHandler(0)}>
                                        <FontAwesome 
                                            name="plus-square" 
                                            size={30} color="#D17842" 
                                            style={{alignSelf:"center",marginRight:10}}
                                
                                            />
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress={() => quantityDecreaseHandler(0)} >
                                    <FontAwesome 
                                        name="minus-square" 
                                        size={30} color="#D17842" 
                                        style={{alignSelf:"center"}}
                                    
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style ={styles.prices}>
                                <Text style={styles.cartTextPrice}><Text style={{color:"#D17842"}}>$ </Text>{parseFloat((price[1].price * price[1].quantity).toFixed(2))}</Text>
                                <Text style={[styles.cartTextPrice]}>{price[1].size}</Text>
                                <Text style={styles.cartTextPrice}><Text style={{color:"#D17842"}}><FontAwesome name="remove" size={24} color="#D17842" /></Text> {price[1].quantity}</Text>
                                <View style={{flexDirection:"row"}}>
                                    <TouchableOpacity onPress={() => quantityIncreaseHandler(1)} >
                                        <FontAwesome 
                                            name="plus-square" 
                                            size={30} color="#D17842" 
                                            style={{alignSelf:"center",marginRight:10}}
                                        
                                            />
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress={() => quantityDecreaseHandler(1)} >
                                    <FontAwesome 
                                        name="minus-square" 
                                        size={30} color="#D17842" 
                                        style={{alignSelf:"center"}}
                                    
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style ={styles.prices}>
                                <Text style={styles.cartTextPrice}><Text style={{color:"#D17842"}}>$ </Text>{parseFloat((price[2].price * price[2].quantity).toFixed(2))}</Text>
                                <Text style={[styles.cartTextPrice]}>{price[2].size}</Text>
                                <Text style={styles.cartTextPrice}><Text style={{color:"#D17842"}}><FontAwesome name="remove" size={24} color="#D17842" /></Text> {price[2].quantity}</Text>
                                <View style={{flexDirection:"row"}}>
                                    <TouchableOpacity onPress={() => quantityIncreaseHandler(2)} >
                                        <FontAwesome 
                                            name="plus-square" 
                                            size={30} color="#D17842" 
                                            style={{alignSelf:"center",marginRight:10}}
                                        
                                            />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => quantityDecreaseHandler(2)} >
                                    <FontAwesome 
                                        name="minus-square" 
                                        size={30} color="#D17842" 
                                        style={{alignSelf:"center"}}
                                    
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        
                    </LinearGradient>
                </View>
            
            )
        
};


const styles = StyleSheet.create({
    remove:{
        position:"absolute",
        padding:3,
        right:15,
        top:15,
        backgroundColor:"#52555A",
        borderColor:"#FFFFFF",
        borderWidth:1,
        borderRadius:5,
    },
    prices:{
        width:"90%",
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginBottom:10,
        marginLeft:10,
    },
    cart:{
        width:"90%",
        borderRadius:20,
        alignSelf:"center",
        marginTop:10,
    },
    imageWithName:{
        width:"90%",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",


    },

    cartImage:{
        borderRadius:20,
        width:120,
        height:120,
        margin:10,
    },
    cartTextName:{
        fontFamily:"Poppins-SemiBold",
        fontSize:25,
        color:"#FFFFFF",
        alignSelf:"flex-start",
        marginLeft:10,
        
    },
    cartTextIngredients:{
        fontFamily:"Poppins-SemiBold",
        fontSize:13,
        color:"#FFFFFF",
        alignSelf:"flex-start",
        marginLeft:10,
    },
    cartBottom:{
       
        paddingHorizontal:10,
        marginBottom:10,
    },
    cartTextPrice:{
        fontFamily:"Poppins-SemiBold",
        fontSize:18,
        color:"#FFFFFF",
        alignSelf:"center",
        width:100,
    },
    stars:{
        position:"absolute",
        paddingRight:10,
        backgroundColor:"#21262E",
        width:30,
        borderRadius:10,        
        marginTop:10,
        right:20,
        flexDirection:"row",
        justifyContent:"space-between",
        zIndex:1,

    },

});