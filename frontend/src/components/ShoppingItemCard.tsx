import {ShoppingItem} from "../model/ShoppingItem";
import "./ShoppingItemCard.css";
import {useNavigate} from "react-router-dom";
import * as AiIcons from "react-icons/ai";

type ShoppingItemCardProps = {
    shoppingItem: ShoppingItem;
    saveShoppingItem: (updatedShoppingItem: ShoppingItem) => void;
    deleteShoppingItem: (id: string) => void;
}

export default function ShoppingItemCard({shoppingItem, saveShoppingItem, deleteShoppingItem}: ShoppingItemCardProps) {
    const navigate = useNavigate()

    const changeDone = () => {
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
        <div className={shoppingItem.done? "shopping-item-card-done":"shopping-item-card"}>
            <div id={"item-container"}>
                <div id={"name-bulletpoint"}>
                    <div id={shoppingItem.done? "bulletpoint-done":"bulletpoint"} onClick={changeDone}></div>
                    <div id={"done-item"}
                         onClick={() => navigate(`/shoppingitem/${shoppingItem.id}`)}>{shoppingItem.name}</div>
                </div>
                <div id={shoppingItem.done ? "done-item" : "undone-item"}>
                    {shoppingItem.amount + "" + shoppingItem.unit}
                    <div id={"delete-button-div"}><AiIcons.AiFillDelete
                        id={shoppingItem.done?"delete-button-symbol-done":"delete-button-symbol"}
                        onClick={() => deleteShoppingItem(shoppingItem.id)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
