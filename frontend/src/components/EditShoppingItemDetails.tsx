import {ShoppingItem} from "../model/ShoppingItem";
import {FormEvent, useState} from "react";
import * as AiIcons from "react-icons/ai";
import "./EditShoppingItemDetails.css";

type EditShoppingItemDetailsProps = {
    item: ShoppingItem
    updateShoppingItem: (updatedShoppingItem: ShoppingItem) => void
    toggleComponent: () => void
}

export default function EditShoppingItemDetails({
                                                    item,
                                                    updateShoppingItem,
                                                    toggleComponent
                                                }: EditShoppingItemDetailsProps) {

    const [name, setName] = useState<string>(item.name)
    const [amount, setAmount] = useState<number>(item.amount)
    const [unit, setUnit] = useState<string>(item.unit);

    const saveNewItem = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const updatedItem = {
            id: item.id,
            name: name,
            amount: amount,
            unit: unit,
            done: item.done
        }

        updateShoppingItem(updatedItem)
        toggleComponent()
    }

    return (
        <div className={"save-item-form"}>
            <h1 id={"item-form-title"}>Shopping Item</h1>
            <form id={"item-form"} onSubmit={saveNewItem}>
                <div id={"item-form-properties"}>
                    <input id={"item-form-text"}
                           type={"text"}
                           placeholder="Add a new item"
                           value={name}
                           onChange={event => setName(event.target.value)}/>
                    <div id={"item-form-amount-unit"}>
                        <input id={"item-form-number"}
                               type={"number"}
                               value={amount}
                               onChange={event => setAmount(Number(event.target.value))}/>
                        <select id={"item-form-number"}
                                value={unit}
                                onChange={event => setUnit(event.target.value)}>
                            <option value={"stk"}>stk</option>
                            <option value={"ml"}>ml</option>
                            <option value={"l"}>l</option>
                            <option value={"tl"}>tl</option>
                            <option value={"el"}>el</option>
                            <option value={"pr"}>pr</option>
                            <option value={"g"}>g</option>
                            <option value={"kg"}>kg</option>
                        </select>
                    </div>
                </div>
                <div id={"item-submit-button-container"}>
                    <button id={"item-submit-button"} type={"submit"}>EDIT ITEM</button>
                    <AiIcons.AiFillLeftCircle
                        id={"details-button-symbol"}
                        onClick={toggleComponent}/>
                </div>
            </form>
        </div>
    )
}
