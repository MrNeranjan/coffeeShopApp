import React,{useEffect, useState} from 'react';
import {View, Text,StyleSheet,Image,Dimensions,TouchableOpacity,Alert} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { useStore } from "../storage/storeData";



function DetailScreen({route}){

    const {id,name,Ingredients,rate,ratings_count,roasted, image_portrait,image_square,price, description} = route.params;
    const [selectedSize, setSelectedSize] = useState("S");

    const navigation = useNavigation();

    function backHandler(){
        navigation.pop()
    }

    const CartList = useStore((state) => state.CartList)
    const favoriteList = useStore((state) => state.favoriteList)


    useEffect(() => {
        if(id.startsWith("B") && selectedSize === "S"){
            setSelectedSize("250g");
        }
    }, [id, selectedSize]); 
    

    // adding the items to cart list
    function addToCart() {
        let prices = [0,0,0];
        let [q1, q2, q3] = [0, 0, 0];
    
        if (selectedSize === price[0].size) {
            q1 = 1;
        } else if (selectedSize === price[1].size) {
            q2 = 1;
        } else if (selectedSize === price[2].size) {
            q3 = 1;
        }
    
        if (selectedSize === "S" || selectedSize === "M" || selectedSize === "L") {
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

    // Adding the items to favorite list
    function favoriteHandler(){
        
        const favoriteItem={
            id : id ,
            name:name,
            image_portrait:image_portrait,
            rate:rate,
            price:price,
            Ingredients:Ingredients,
            roasted:roasted,
            ratings_count:ratings_count,
            quantity:1,
            size:selectedSize,
            description:description,
            favorite:true,
        };
        useStore.setState(prevState => {
            const itemExists = prevState.favoriteList.some(item => item.id === favoriteItem.id);
            if (itemExists) {
                // If the item exists, remove it from the favorite list
                return { favoriteList: prevState.favoriteList.filter(item => item.id !== favoriteItem.id) };
            } else {
                // If the item doesn't exist, add it to the favorite list
                return { favoriteList: [...prevState.favoriteList, favoriteItem] };
            }
        });
        
    }


    function isFavorite(){
        const itemExists = favoriteList.some(item => item.id === id);
        if(itemExists){
            return true
        }else{
            return false
        }
    }

    
    

    return(
        
        <View style={styles.body}>
            <View>
                <Image
                    source={image_portrait}
                    style={{width:"100%",height:"78%"}}
                />
                <View style={styles.detailsOnImage}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:20}}>
                        <View style={{flex: 1}}>
                            <Text style={{color:"#FFFFFF", fontSize:26, fontWeight:"bold"}}>{name}</Text>
                            <Text style={{color:"#FFFFFF", fontSize:13}}>{Ingredients}</Text>
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
                </View>
            </View>
            <View style={styles.backHeart}>
                <View>
                    <TouchableOpacity onPress={backHandler}>
                        <FontAwesome
                            name="chevron-left" 
                            size={25} 
                            color="#AEAEAE" 
                            style={{backgroundColor:"#52555A",padding:4,borderRadius:10}}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={favoriteHandler} >
                        <FontAwesome name="heart" size={25} color={isFavorite() ? "red":"black"} style={{alignSelf:"center"} }/>
                    </TouchableOpacity>
                    
                </View>
            </View> 
            <View style={styles.disSection}>
                <Text style ={styles.DisTitle}>Description</Text>
                <Text style={styles.description}>
                    {description}
                </Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:15,}}>
                <TouchableOpacity onPress={() => setSelectedSize(price[0].size)}>
                     <Text style={[styles.sizeBox,{borderColor:selectedSize === price[0].size ? "#D17842":"black", color: selectedSize === price[0].size ? "#D17842":"#AEAEAE", borderWidth:2,fontSize:30}]}>{price[0].size}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedSize(price[1].size)}>
                    <Text style={[styles.sizeBox,{borderColor:selectedSize === price[1].size ? "#D17842":"black", color: selectedSize === price[1].size ? "#D17842":"#AEAEAE", borderWidth:2,fontSize:30}]}>{price[1].size}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedSize(price[2].size)}>
                    <Text style={[styles.sizeBox,{borderColor:selectedSize === price[2].size ? "#D17842":"black", color: selectedSize === price[2].size ? "#D17842":"#AEAEAE", borderWidth:2,fontSize:30}]}>{price[2].size}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.price}>
                    <Text style={{color:"#D17842"}}>$ </Text>{selectedSize === price[0].size ? price[0].price : selectedSize === price[1].size ? price[1].price : price[2].price}
                </Text>
                <TouchableOpacity onPress={addToCart}>
                    <Text style={styles.addtoCart}>Add to Cart</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default DetailScreen;



const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:"#21262E",
    },
    backHeart:{
        width:"100%",
        position:"absolute",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:26,
        marginTop:20,
    },
    detailsOnImage:{
        position: 'absolute',
        bottom: "22%",
        width: Dimensions.get("window").width,
        height:150,
        borderTopEndRadius:30,
        borderTopStartRadius:30,
        backgroundColor: "rgba(37, 42, 50, 0.5)", // 0.5 is the opacity
        alignItems:"center",
        paddingHorizontal:26,
        marginTop:20,  
    },
    rating:{
        flexDirection:"row",
        fontSize:18,
        marginTop:20,
    },
    Ingredient:{
        color:"#AEAEAE",
        marginTop:20,
        backgroundColor:"#252A32",
        textAlign:"center",
        margin:10,
        padding:10,
        borderRadius:30,
        fontSize:12,
        fontWeight:"bold",
        lineHeight:35
    },
    description:{
        color:"#AEAEAE",
        backgroundColor:"#252A32",
        margin:10,
        paddingLeft:10,
        borderRadius:30,
        fontSize:12,
        fontWeight:"bold",
        
    },
    DisTitle:{
        color:"#AEAEAE",
        marginLeft:10,
        paddingLeft:10,
        fontSize:18,
        fontWeight:"bold",
    },
    disSection:{
        position:"absolute",
        top:"62%"
    },
    sizeBox:{
        color:"#AEAEAE",
        backgroundColor:"#252A32",
        width:90,
        height:60,
        margin:10,
        textAlign:"center",
        padding:10,
        paddingLeft:10,
        borderRadius:15,
        fontSize:12,
        fontWeight:"bold",
        lineHeight:40
        
    },
    addtoCart:{
        color:"#FFFFFF",
        backgroundColor:"#D17842",
        width:180,
        padding:20,
        borderRadius:10,
        textAlign:"center",
        
        fontWeight:"bold"
    },
    bottom:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:26,
        marginTop:10,
    },
    price:{
        color:"#FFFFFF",
        fontSize:25,
        fontWeight:"bold"
    }


});