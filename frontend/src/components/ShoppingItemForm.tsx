import {ShoppingItem} from "../model/ShoppingItem";
import {FormEvent, useState} from "react";

type ShoppingItemFormProps = {
    addShoppingItems : ( newShoppingItem : Omit<ShoppingItem, "id">) => void
    toggleComponent: () => void
}

export default function ShoppingItemForm({addShoppingItems, toggleComponent}: ShoppingItemFormProps){
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(1);
    const [unit, setUnit] = useState("");

    const onAdd = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name) {
            console.error("Name is required");
            return
        }
        const newShoppingItem : Omit<ShoppingItem, "id"> = {
            name : name,
            amount: amount,
            unit: unit,
            done : false
        }
        addShoppingItems(newShoppingItem);
        toggleComponent();
        setName("");
        setAmount(1);
        setUnit("");
    }

    return (
        <div className={"new-item"}>
            <button onClick={toggleComponent}>Back</button>
            <form onSubmit={onAdd}>
                <input type={"text"} placeholder="Add a new item" value={name} onChange={event => setName(event.target.value)} />
                <input type={"number"} value={amount} onChange={event => setAmount(Number(event.target.value))}/>
                <select defaultValue={"stk"} value={unit} onChange={event => setUnit(event.target.value)} >
                    <option defaultValue={"stk"}>stk</option>
                    <option value={"g"}>g</option>
                    <option value={"kg"}>kg</option>
                    <option value={"ml"}>ml</option>
                    <option value={"l"}>l</option>
                    <option value={"tl"}>tl</option>
                    <option value={"el"}>el</option>
                    <option value={"pr"}>pr</option>
                </select>
                {/*<input type={"text"} placeholder="unit" value={unit} onChange={event => setUnit(event.target.value)} />*/}
                <button type={"submit"}>Add ShoppingItem</button>
            </form>
        </div>
    )
}