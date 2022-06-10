import {useContext, useEffect, useState} from "react";
import {ShoppingItem} from "../model/ShoppingItem";
import {AuthContext} from "../context/AuthProvider";
import {getAllShoppingItem, postShoppingItem, postShoppingItemList} from "../service/lapa-api-service";

export default function useShoppingItems() {
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        getAllShoppingItem(token)
            .then(allShoppingItems => setShoppingItems(allShoppingItems))
            .catch(() => "Connection failed! Please retry later.")

    }, [token])

    const addShoppingItems = (newShoppingItem: Omit<ShoppingItem, "id">) => {
        postShoppingItem(newShoppingItem, token)
            .then(addedShoppingItem => setShoppingItems([...shoppingItems, addedShoppingItem]))
            .then(() => {
                console.log("ShoppingItem: " + newShoppingItem.name + " created");
            })
            .catch(() => console.error("Connection failed! Please retry later."))
    }

    const addShoppingItemList = (newShoppingItemList: Omit<ShoppingItem[], "id">) => {
        postShoppingItemList(newShoppingItemList, token)
            .then(addedShoppingItemList => addedShoppingItemList.map((item: ShoppingItem) => {setShoppingItems([...shoppingItems, item])}))
            .then(() => {
                // console.log("ShoppingItemList: " + newShoppingItem.map(item => item.name) + " created");
                console.log("ShoppingItemList: " + newShoppingItemList + " created");
            })
            .catch(() => console.error("Connection failed! Please retry later."))
    }

    return {shoppingItems, addShoppingItems, addShoppingItemList};
}
