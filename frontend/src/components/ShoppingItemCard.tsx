import {ShoppingItem} from "../model/ShoppingItem";
import "./ShoppingItemCard.css";

type ShoppingItemCardProps = {
    shoppingItem: ShoppingItem
}

export default function ShoppingItemCard({shoppingItem}:ShoppingItemCardProps){
    return (
        <div className={"shopping-item-card"}>
            <div id={"item-container"}>
                {/*<div id={"bulletpoint"}></div>*/}
                <div id={"name-bulletpoint"}>
                    <div id={"bulletpoint"} ></div>
                    <div id={shoppingItem.done? "done-item": "undone-item"}>{shoppingItem.name}</div>
                </div>
                <div id={shoppingItem.done? "done-item": "undone-item"}>
                    {shoppingItem.amount + "" + shoppingItem.unit}
                </div>
            </div>
        </div>
    )
}