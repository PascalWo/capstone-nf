import {ShoppingItem} from "../model/ShoppingItem";
import ShoppingItemCard from "./ShoppingItemCard";

type ShoppingItemsOverviewProps = {
    shoppingItems: ShoppingItem []
}

export default function ShoppingItemsOverview({shoppingItems} : ShoppingItemsOverviewProps) {
    return (
        <div>
            {shoppingItems
                .map(item =>
                    <ShoppingItemCard
                        key={item.id}
                        shoppingItem={item}
                    />)}
        </div>
    )
}