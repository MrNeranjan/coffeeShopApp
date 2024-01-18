import React ,{useState} from 'react';
import {View, Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,Dimensions} from 'react-native';
import {useStore} from "../storage/storeData"
import {HeaderBar,Topic,SearchBox,CoffeeCategoriesTitle,Cart} from "../components/homeScreenComp"
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import DetailScreen from './DetailsScreen';

export default function HomeScreen() {

    const coffeeList = useStore((state) => state.coffeeList)
    const beanList = useStore((state) => state.beanList)
    const [searchText, setSearchText] = useState("")


    // getting the categories list from the coffeeList
    function getCategories(coffeeList){
        const categories = []
        coffeeList.forEach((coffee) => {
            if(!categories.includes(coffee.name)){
                categories.push(coffee.name)
            }
        })
        return categories
    }   

    //for categories list mapping handle
    const [selectedCategory, setSelectedCategory] = useState("All");
    function createCategoryTitle(name){
        return(
            <CoffeeCategoriesTitle
                key={name}
                name={name}
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
            />
        )
    }

    //for coffee list filtering handle
    let filteredCoffee = [];

    if(selectedCategory.toLowerCase() !== "all" && searchText == ""){
        filteredCoffee = coffeeList.filter((coffee) => coffee.name.toLowerCase() === selectedCategory.toLowerCase())
    } else {
        filteredCoffee = coffeeList.filter((coffee) => coffee.name.toLowerCase().includes(searchText.toLowerCase()))
    }



    // search keyword handler
    function SearchHandler(searchText){
        setSearchText(searchText)
    }

    const [cartDetail, setCartDetail] = useState({
        name:"",
        image:"",
        price:"",
        Ingredients:"",
       
    })




    

    function creatingCart(props){
        
        return(
                <Cart
                    key={props.id}
                    id = {props.id}
                    name={props.name}
                    image_square={props.imagelink_square}
                    image_portrait={props.imagelink_portrait}
                    price={props.prices}
                    Ingredients={props.special_ingredient}
                    rate={props.average_rating}
                    description={props.description}
                    type={props.type}
                    roasted={props.roasted}
                    ratings_count={props.ratings_count}
                />
        )
    }
    

    let [fontsLoaded] = useFonts({
        "Poppins-SemiBold":require("../assets/fonts/Poppins-SemiBold.ttf"),
    });
    if (!fontsLoaded) {
        return AppLoading;
      }    
    

    return (
        <View style={styles.body}>
            <HeaderBar/>
            <Topic/>
            <SearchBox
                searchText={searchText}
                getInputText={SearchHandler}/>
            <View style={styles.coffeeTitles}>
                <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <CoffeeCategoriesTitle 
                        name="All"
                        selectedCategory={selectedCategory} 
                        setSelectedCategory={setSelectedCategory} 
                        />
                    {getCategories(coffeeList).map(createCategoryTitle)}
                    
                </ScrollView>
            </View>
            <ScrollView>
                <View style={styles.carts}>
                
                    <FlatList
                         horizontal
                         data={filteredCoffee}
                         ListEmptyComponent={
                            <View style={styles.emptyView}>
                                 <Text style={styles.ListEmptyComponent}>No Coffee Found..!</Text>
                            </View>
                             }
                         renderItem={({ item }) => creatingCart(item)}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                    />
                    
                   
                </View>
                <View>
                    <Text style={[styles.BeansText,{fontFamily:"Poppins-SemiBold"}]}>Coffee Beans</Text>
                </View>
                <View style={[styles.carts,{marginBottom:115}]}>
                    <FlatList
                        horizontal
                        data={beanList}
                        renderItem={({ item }) => creatingCart(item)}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false} 
                    />
                </View>
            </ScrollView>

        </View>
    )
    
}


const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:"#21262E",
    },
    coffeeTitles:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:26,
        marginTop:20,
    },
    carts:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:26,
    },
    BeansText:{
        fontSize:18,
        color:"#FFFFFF",
        paddingHorizontal:26,
        marginTop:10,
        marginBottom:10,
    },
    ListEmptyComponent:{
        color:"#52555A",
        alignSelf:"center",
        fontSize:20,
        fontFamily:"Poppins-SemiBold",

    },
    emptyView:{
        width:Dimensions.get("window").width ,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },

 
});