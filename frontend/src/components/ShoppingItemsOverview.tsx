import {ShoppingItem} from "../model/ShoppingItem";
import ShoppingItemCard from "./ShoppingItemCard";
import {ChangeEvent, useState} from "react";

type ShoppingItemsOverviewProps = {
    shoppingItems: ShoppingItem [];
    saveShoppingItem: (updatedShoppingItem: ShoppingItem) => void;
    deleteShoppingItem: (id: string) => void;
}

export default function ShoppingItemsOverview({
                                                  shoppingItems,
                                                  saveShoppingItem,
                                                  deleteShoppingItem
                                              }: ShoppingItemsOverviewProps) {
    const [search, setSearch] = useState<string>("")

    return (
        <div>
            <input type={"text"} value={search} placeholder={"Search"}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}/>
            {shoppingItems
                .filter(
                    item => item.name.toLowerCase()
                        .includes(search.toLowerCase()))
                .sort((item1, item2) => Number(item1.done) - Number(item2.done))
                .map(item => <ShoppingItemCard
                    key={item.id}
                    shoppingItem={item}
                    saveShoppingItem={saveShoppingItem}
                    deleteShoppingItem={deleteShoppingItem}/>)}
        </div>
    )
}
