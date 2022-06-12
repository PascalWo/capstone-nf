import {ShoppingItem} from "../model/ShoppingItem";
import "./ShoppingItemCard.css";
import {useNavigate} from "react-router-dom";

type ShoppingItemCardProps = {
    shoppingItem: ShoppingItem
}

export default function ShoppingItemCard({shoppingItem}:ShoppingItemCardProps){
    const navigate = useNavigate()

    return (
        <div className={"shopping-item-card"}>
            <div id={"item-container"} onClick={() => navigate(`/shoppingitem/${shoppingItem.id}`)}>
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
