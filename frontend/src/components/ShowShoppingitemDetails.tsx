import {ShoppingItem} from "../model/ShoppingItem";

type ShowShoppingItemDetailsProps = {
    item: ShoppingItem
    toggleEditing: () => void
}

export default function ShowShoppingItemDetails({item, toggleEditing} : ShowShoppingItemDetailsProps){
    return(
        <div className={"show-shopping-item-details"}>
            <p className={item.done? "done-item": "undone-item"}>
                {"Item: " + item.name + "Amount: " + item.amount + "Unit: " + item.unit}</p>
            <button onClick={toggleEditing}>Edit item</button>
        </div>
    )
}
