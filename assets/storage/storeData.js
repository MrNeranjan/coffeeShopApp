import {create} from "zustand";
import {produce} from "immer";
import {persist,createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/coffeeData";
import BeansData from "../data/beanData";


export const  useStore= create(
    
    persist((set,get)=>({
        coffeeList : CoffeeData,
        beanList : BeansData,
        cartPrice :0,
        CartList:[],
        favoriteList:[],
        orderHistoryList:[]
        
    }),
    {
        name: "coffee-List",
        storage: createJSONStorage(()=>AsyncStorage)
    }
    )
    
)
