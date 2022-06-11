import {ShoppingItem} from "../model/ShoppingItem";
import {FormEvent, useState} from "react";

type ShowShoppingitemDetailsProps = {
    item: ShoppingItem
    updateShoppingItem : (updatedShoppingItem : ShoppingItem) => void
    toggleComponent: () => void
}

export default function EditShoppingItemDetails ({item, updateShoppingItem, toggleComponent}: ShowShoppingitemDetailsProps){

    const [name, setName] = useState<string>(item.name)
    const [amount, setAmount] = useState<number>(item.amount)
    const [unit, setUnit] = useState<string>(item.unit);


    const saveNewItem =  (event : FormEvent<HTMLFormElement> ) => {
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

    return(
        <div>
            <form onSubmit={saveNewItem}>
                <input type={"text"} placeholder="Add a new item" value={name} onChange={event => setName(event.target.value)} />
                <input type={"number"} value={amount} onChange={event => setAmount(Number(event.target.value))}/>
                <select value={unit} onChange={event => setUnit(event.target.value)} >
                    <option value={"stk"}>stk</option>
                    <option value={"g"}>g</option>
                    <option value={"kg"}>kg</option>
                    <option value={"ml"}>ml</option>
                    <option value={"l"}>l</option>
                    <option value={"tl"}>tl</option>
                    <option value={"el"}>el</option>
                    <option value={"pr"}>pr</option>
                </select>
                <button type={"submit"}>Edit ShoppingItem</button>
            </form>

        </div>

    )
}