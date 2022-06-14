import {ShoppingItem} from "../model/ShoppingItem";
import ShoppingItemCard from "./ShoppingItemCard";
import {ChangeEvent, useState} from "react";
import "./Buttons.css";

type ShoppingItemsOverviewProps = {
    shoppingItems: ShoppingItem [];
    saveShoppingItem: (id: string, updatedShoppingItem: ShoppingItem) => void;
    deleteShoppingItem: (id: string) => void;
    toggleAdding: () => void;
}

export default function ShoppingItemsOverview({
                                                  shoppingItems,
                                                  saveShoppingItem,
                                                  deleteShoppingItem,
                                                  toggleAdding,
                                              }: ShoppingItemsOverviewProps) {
    const [search, setSearch] = useState<string>("")

    return (
        <div className={"shopping-item-overview"}>
            <div className={"search-input-button"}>
                <input className={"search-input-field"}
                       type={"text"}
                       value={search}
                       placeholder={"Search"}
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}/>
                <button className={"add-item-button"}
                        onClick={toggleAdding}>
                    ADD ITEM
                </button>
            </div>
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
