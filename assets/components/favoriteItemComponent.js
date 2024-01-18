import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList,Image,TouchableOpacity,Dimensions } from "react-native";
import { useStore } from "../storage/storeData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { useNavigation } from "@react-navigation/native";

export default function FavoriteCard({id,name,price,Ingredients,rate,ratings_count,favorite,roasted,description,image_portrait,image_square}) {
    
    const favoriteList = useStore((state) => state.favoriteList);
    let [fontsLoaded] = useFonts({
        "Poppins-SemiBold":require("../assets/fonts/Poppins-SemiBold.ttf"),
    });
    if (!fontsLoaded) {
        return AppLoading;
      } 

    function favoriteHandler(){
        useStore.setState(prevState => {
            const itemExists = prevState.favoriteList.some(item => item.id === id);
            if (itemExists) {
                // If the item exists, remove it from the favorite list
                return { favoriteList: prevState.favoriteList.filter(item => item.id !== id) };
            }
        });
    }

    const navigation = useNavigation();

    function PressHandle(){
        navigation.push("DetailScreen",{
            id:id,
            name:name,
            price:price,
            Ingredients:Ingredients,
            rate:rate,
            ratings_count:ratings_count,
            roasted:roasted,
            description:description,
            image_portrait:image_portrait,
            image_square:image_square,

        
        })
    }

    return(
        <TouchableOpacity onPress={PressHandle}>
            <View style={styles.cartBody}>
                <LinearGradient
                    colors={["#52555A","#262B33"]}
                    style={styles.cart}
                    start={{x:0,y:0}}
                    end={{x:1,y:1}}
                >
                
                    <View>
                        <Image 
                            source={image_portrait} 
                            style={styles.image}
                        />
                        <View style={styles.imageTopText}>
                            <View style={{flex: 1}}>
                                <Text style={{color:"#FFFFFF", fontSize:26, fontWeight:"bold",fontFamily:"Poppins-SemiBold"}}>{name}</Text>
                                <Text style={{color:"#FFFFFF", fontSize:13,fontFamily:"Poppins-SemiBold"}}>{Ingredients}</Text>
                                <View style={styles.rating}>
                                    <TouchableOpacity>
                                        <FontAwesome name="star" size={20} color="#D17842" style={{marginRight:5}}/>
                                    </TouchableOpacity>
                                    <Text style={{color:"#FFFFFF", fontWeight:"bold"}}>{rate} <Text style={{color:"#AEAEAE"}}>({ratings_count})</Text></Text>
                                </View>
                            </View>
                            <View>
                                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                    <FontAwesome name="tint" size={40} color="#D17842" style={{marginRight:"30%"}}/>
                                    <FontAwesome name="star" size={40} color="#D17842"/>
                                </View>
                                <Text style={styles.Ingredient}>{roasted}</Text>
                            </View>
                        </View>
                        <View style ={styles.heart}>
                            <TouchableOpacity onPress={favoriteHandler} >
                                <FontAwesome name="heart" size={25} color={favorite ? "red":"black"} style={{alignSelf:"center"} }/>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    <View style={styles.disSection}>
                        <Text style ={styles.DisTitle}>Description</Text>
                        <Text style={styles.description}>
                            {description}
                        </Text>
                    </View>

                
            </LinearGradient>
        </View>
    </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    cartBody:{
        width:Dimensions.get("window").width - 50,
        flex:1,
        alignSelf:"center",
        marginTop:20,


    },
    cart:{
        borderRadius:20,
        width:Dimensions.get("window").width - 50,
        
    },
    image:{
        width:Dimensions.get("window").width - 50,
        height:Dimensions.get("window").height/2,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
    imageTopText:{
        padding:10,
        flexDirection:"row",
        backgroundColor: "rgba(37, 42, 50, 0.5)",
        justifyContent:"space-between",
        marginTop:20,
        position:"absolute",
        bottom:0,
        borderTopEndRadius:30,
        borderTopStartRadius:30,
        fontFamily:"Poppins-SemiBold",
    },
    Ingredient:{
        color:"#AEAEAE",
        marginTop:10,
        backgroundColor:"#252A32",
        textAlign:"center",
        margin:5,
        padding:2,
        borderRadius:30,
        fontSize:12,
        fontWeight:"bold",
        lineHeight:30,
        fontFamily:"Poppins-SemiBold",
    },
    rating:{
        flexDirection:"row",
        fontSize:18,
        marginTop:20,
    },
    heart:{
        position:"absolute",
        top:15,
        right:15,
    },
    description:{
        color:"#AEAEAE",
        marginRight:10,
        marginLeft:5,
        marginTop:10,
        marginBottom:10,
        fontSize:12,
        fontWeight:"bold",
        fontFamily:"Poppins-SemiBold",
        
    },
    DisTitle:{
        color:"#AEAEAE",
        fontSize:18,
        marginTop:5,
        marginLeft:5,
        fontWeight:"bold",
        fontFamily:"Poppins-SemiBold",
    },
});