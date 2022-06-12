import {useContext, useState} from "react";
import {ShoppingItem} from "../model/ShoppingItem";
import {AuthContext} from "../context/AuthProvider";
import {getShoppingItemBy} from "../service/lapa-api-service";

export default function useDetailedShoppingItem(){
    const[detailedShoppingItem, setDetailedShoppingItem] = useState<ShoppingItem>()
    const {token} =useContext(AuthContext)

    const getShoppingItemById = (id:string) => {
        getShoppingItemBy(id, token)
            .then(data => setDetailedShoppingItem(data))
            .catch(() => "Error")
    }

    return { detailedShoppingItem, getShoppingItemById, setDetailedShoppingItem }
}
