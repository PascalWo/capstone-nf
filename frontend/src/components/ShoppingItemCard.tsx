import {ShoppingItem} from "../model/ShoppingItem";
import "./ShoppingItemCard.css";
import {useNavigate} from "react-router-dom";

type ShoppingItemCardProps = {
    shoppingItem: ShoppingItem;
    saveShoppingItem : (updatedShoppingItem : ShoppingItem) => void;
}

export default function ShoppingItemCard({shoppingItem, saveShoppingItem}:ShoppingItemCardProps){
    const navigate = useNavigate()

    const changeDone = () =>{
        const changedDone = !shoppingItem.done
        const updatedItem = {
            id: shoppingItem.id,
            name: shoppingItem.name,
            amount: shoppingItem.amount,
            unit: shoppingItem.unit,
            done: changedDone
        }
        saveShoppingItem(updatedItem)
    }

    return (
        <div className={"shopping-item-card"}>
            <div id={"item-container"} >
                <div id={"name-bulletpoint"}>
                    <div id={"bulletpoint"} onClick={changeDone} ></div>
                    <div id={shoppingItem.done? "done-item": "undone-item"} onClick={() => navigate(`/shoppingitem/${shoppingItem.id}`)}>{shoppingItem.name}</div>
                </div>
                <div id={shoppingItem.done? "done-item": "undone-item"}>
                    {shoppingItem.amount + "" + shoppingItem.unit}
                </div>
            </div>
        </div>
    )
}
