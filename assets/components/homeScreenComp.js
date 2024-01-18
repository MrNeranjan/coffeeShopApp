import React,{useState,useEffect} from "react";
import {Text,View,StyleSheet,StatusBar,Image,ScrollView, TextInput, TouchableOpacity,Alert} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useStore } from "../storage/storeData";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";



function HeaderBar({title}){
    let [fontsLoaded] = useFonts({
        "Poppins-SemiBold":require("../assets/fonts/Poppins-SemiBold.ttf"),
    });

    if (!fontsLoaded) {
        return AppLoading;
      }
    

    return(

        <View style={styles.headerBar}>
            <StatusBar barStyle="light-content" backgroundColor="#21262E" />
            <FontAwesome name="th-large" size={24} color="#52555A" />
            <Text style={{color:"#FFFFFF",fontSize:24,fontWeight:"bold",fontFamily:"Poppins-SemiBold"}}>{title}</Text>
            <Image source={require('../assets/app_images/avatar.png')} style={styles.image} />
                        
        </View>
    )
};

function Topic(){
    let [fontsLoaded] = useFonts({
        "Poppins-SemiBold":require("../assets/fonts/Poppins-SemiBold.ttf"),
    });

    if (!fontsLoaded) {
        return AppLoading;
      }

    return(
        <View style={styles.topicView}>
        <Text style={styles.Topic}>Find the best coffee for you</Text>
    </View>
    )
};

function SearchBox({searchText,getInputText}){
    return(
        <View style={styles.searchBox}>
            <FontAwesome name="search" size={15} color="#AEAEAE" style={{marginRight:10}}/>
            <TextInput
                placeholder="Find your Coffee .."
                placeholderTextColor="#AEAEAEB3"
                style={styles.searchText}
                value={searchText}
                onChangeText={getInputText}
                color="#AEAEAE"
            />
        </View>
    )
};

function CoffeeCategoriesTitle({name,selectedCategory,setSelectedCategory}){
    let [fontsLoaded] = useFonts({
        "Poppins-SemiBold":require("../assets/fonts/Poppins-SemiBold.ttf"),
    });

    if (!fontsLoaded) {
        return AppLoading;
      }

    const colorText = name === selectedCategory ? "#D17842" : "#52555A";

    function changeColor() {
        setSelectedCategory(name);
    }
 

    return(
        <View style={styles.categoryTitleView}>
            <Text 
                style={[styles.categoryTitle,{color:colorText}]}
                onPress={changeColor}
                >{name}</Text>
        </View>
    );
};





function Cart({id,image_square,image_portrait,price,name,Ingredients,type,rate,description,ratings_count,roasted}){

    const CartList = useStore((state) => state.CartList);

    const navigation = useNavigation();
    function pressHandle(){
       
    navigation.push('DetailScreen',{
        id : id ,
        name:name,
        image_portrait:image_portrait,
        image_square:image_square,
        price:price,
        Ingredients:Ingredients,
        type:type,
        rate:rate,
        description:description,
        roasted:roasted,
        ratings_count:ratings_count,
        
    
    });
        
    
    }

    
    let [fontsLoaded] = useFonts({
        "Poppins-SemiBold":require("../assets/fonts/Poppins-SemiBold.ttf"),
    });

    if (!fontsLoaded) {
        return AppLoading;
      }

        // adding the items to cart list
            function addToCart() {
                let prices = [0,0,0];
                let [q1, q2, q3] = [0, 0, 0];

                if (id.startsWith("C")){
                    selectedSize = "S";
                    q1 = 1;
                }else{
                    selectedSize = "250g";
                    q1 = 1; 
                }
            
                if (id.startsWith("C")) {
                    prices = [
                        { size: "S", price: price[0].price, quantity: q1 },
                        { size: "M", price: price[1].price, quantity: q2 },
                        { size: "L", price: price[2].price, quantity: q3 },
                    ];
                } else {
                    prices = [
                        { size: "250g", price: price[0].price, quantity: q1 },
                        { size: "500g", price: price[1].price, quantity: q2 },
                        { size: "1000g", price: price[2].price, quantity: q3 },
                    ];
                }
                const cartItem = {
                    id: id,
                    name: name,
                    image_square: image_square,
                    price: prices,
                    Ingredients: Ingredients,
                    roasted: roasted,
                    favorite: false,
                };
        
                useStore.setState(prevState => {
                    const itemExists = prevState.CartList.some(item => item.id === cartItem.id);
                    if (itemExists) {
                    Alert.alert("Dear Customer", "This item is already in your cart");
                    return prevState;
                    } else {
                        return { CartList: [...prevState.CartList, cartItem] };
                    }
                });
            }
     
  
    return(
        <TouchableOpacity onPress={pressHandle}>
            <View >
                <LinearGradient
                    colors={["#52555A","#262B33"]}
                    style={styles.cart}
                    start={{x:0,y:0}}
                    end={{x:1,y:1}}
                >
                    <View style={styles.stars}>
                        <FontAwesome  name="star" size={10} color="#D17842" style={{alignSelf:"center"} }/>
                        <Text style={{color:"white",fontSize:12}}>{rate}</Text>
                    </View>
                    <Image
                        source ={image_square}
                        style={styles.cartImage}
                    />
                    <Text style={styles.cartTextName}>{name}</Text>
                    <Text style={styles.cartTextIngredients}>{Ingredients}</Text>

                    <View style={styles.cartBottom}>
                        <Text style={styles.cartTextPrice}><Text style={{color:"#D17842"}}>$</Text>{price[2].price}</Text>
                        <TouchableOpacity onPress={addToCart} >
                            <FontAwesome 
                                name="plus-square" 
                                size={24} color="#D17842" 
                                style={{alignSelf:"center"}}
                            
                                />
                        </TouchableOpacity>
                    </View>
                    
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )        
}

export {HeaderBar,Topic,SearchBox,CoffeeCategoriesTitle,Cart};

const styles = StyleSheet.create({

    

    headerBar:{
        
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:26,
        paddingTop:StatusBar.currentHeight,
        backgroundColor:"#21262E",
        
    },
    image:{
        width:35,
        height:35,
        borderRadius:15,
    },

    topicView:{
        width:"80%",
        paddingHorizontal:26,
        paddingVertical:20,
    },
    Topic:{
        fontFamily:"Poppins-SemiBold",
        fontSize:31,
        color:"#FFFFFF",
    },
    searchBox:{
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"center",
        width:"90%",
        height:37,
        backgroundColor:"#2D333B",
        borderRadius:15,
        flexDirection:"row",
        paddingHorizontal:26,
    },
    categoryTitle:{
        fontFamily:"Poppins-SemiBold",
        fontSize:18,
        color:"#52555A",
    },
    categoryTitleView:{
        marginRight:10,
        justifyContent:"center",

    },
    cart:{
        width:145,
        borderRadius:20,
        marginRight:10,
    },
    cartImage:{
        borderRadius:20,
        width:120,
        height:120,
        alignSelf:"center",
        margin:10,
    },
    cartTextName:{
        fontFamily:"Poppins-SemiBold",
        fontSize:16,
        color:"#FFFFFF",
        alignSelf:"flex-start",
        marginLeft:10,
        
    },
    cartTextIngredients:{
        fontFamily:"Poppins-SemiBold",
        fontSize:10,
        color:"#FFFFFF",
        alignSelf:"flex-start",
        marginLeft:10,
    },
    cartBottom:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:10,
        marginBottom:10,
    },
    cartTextPrice:{
        fontFamily:"Poppins-SemiBold",
        fontSize:18,
        color:"#FFFFFF",
        alignSelf:"center",
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