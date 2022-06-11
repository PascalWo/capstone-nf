import {useContext, useEffect, useState} from "react";
import {ShoppingItem} from "../model/ShoppingItem";
import {AuthContext} from "../context/AuthProvider";
import {getAllShoppingItem} from "../service/lapa-api-service";

export default function useShoppingItems() {
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        getAllShoppingItem(token)
            .then(allShoppingItems => setShoppingItems(allShoppingItems))
            .catch(() => "Connection failed! Please retry later.")
    }, [token])

    return {shoppingItems}
}
