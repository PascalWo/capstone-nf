import {ShoppingItem} from "../model/ShoppingItem";
import {ChangeEvent, FormEvent, useState} from "react";
import {Recipe} from "../model/Recipe";
import {Ingredient} from "../model/Ingredient";

type ShoppingItemFormProps = {
    addShoppingItems : ( newShoppingItem : Omit<ShoppingItem, "id">) => void
    toggleComponent: () => void
    recipe?: Recipe
    addShoppingItemList: (newShoppingItemList: Omit<ShoppingItem[], "id">) => void
    saveShoppingItem?: (updatedShoppingItem : ShoppingItem) => Promise<ShoppingItem | void>
    shoppingItem?: ShoppingItem
}

export default function ShoppingItemForm({addShoppingItems, toggleComponent, recipe, addShoppingItemList, saveShoppingItem, shoppingItem}: ShoppingItemFormProps){
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(1);
    const [unit, setUnit] = useState("stk");
    const [ingredients, setIngredients] = useState<Ingredient[]>(recipe ? recipe.extendedIngredients : [
        {name: "", amount: 0, unit: ""}
    ]);

    const handleIngredientFormChange = (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>, index: number) => {
        let data: Ingredient[] = [...ingredients];

        // @ts-ignore
        data[index][event.target.name] = event.target.value;
        console.log(data);
        setIngredients(data);
    }

    const addIngredientFields = () => {
        let ingredient: Ingredient = {
            name: "",
            amount: 0,
            unit: "",
        }
        setIngredients([...ingredients, ingredient])
    }

    const removeIngredientField = (index: number) => {
        let data: Ingredient[] = [...ingredients];
        data.splice(index, 1)
        setIngredients(data)
    }

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

    const onListAdd= (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const shoppingItemList: ShoppingItem[] = ingredients.map(item => {return {name: item.name, amount: item.amount, unit: item.unit, done: false}})

        addShoppingItemList(shoppingItemList);
        toggleComponent();
    }

    // const saveNewItem =  (event : FormEvent<HTMLFormElement> ) => {
    //     event.preventDefault()
    //
    //     const updatedItem = {
    //         id: shoppingItem? shoppingItem.id : 0,
    //         name: name,
    //         amount: amount,
    //         unit: unit,
    //         done: shoppingItem? shoppingItem.done : false,
    //     }
    //
    //
    //     saveShoppingItem(updatedItem)
    // }

    return (
        <div className={"new-item"}>
            <button onClick={toggleComponent}>Back</button>
            <form onSubmit={onAdd}>
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
                <button type={"submit"}>Add ShoppingItem</button>
            </form>
            <form onSubmit={onListAdd}>
                Ingredients:
                <div>
                    {ingredients
                        .map((ingredientsInput: Ingredient, index: number) => {
                            return (
                                <div>
                                    <input
                                        value={ingredientsInput.name}
                                        key={"name" + index}
                                        name={"name"}
                                        type={"text"}
                                        placeholder={"name"}
                                        onChange={event => handleIngredientFormChange(event, index)}/>

                                    <input
                                        value={ingredientsInput.amount}
                                        key={"amount" + index}
                                        name={"amount"}
                                        type={"number"}
                                        placeholder={"amount"}
                                        onChange={event => handleIngredientFormChange(event, index)}/>

                                    <select key={"unit" + index}
                                            name={"unit"}
                                            value={ingredientsInput.unit}
                                            onChange={event => handleIngredientFormChange(event, index)} >
                                        <option value={"l"}>l</option>
                                        <option value={"tl"}>tl</option>
                                        <option value={"el"}>el</option>
                                        <option value={"pr"}>pr</option>
                                        <option value={"stk"}>stk</option>
                                        <option value={"g"}>g</option>
                                        <option value={"kg"}>kg</option>
                                        <option value={"ml"}>ml</option>
                                    </select>
                                    <button key={"remove" + index}
                                            type={"button"}
                                            onClick={() => removeIngredientField(index)}>
                                        Remove Ingredient</button>
                                </div>
                            )
                        })}
                    <button
                        type={"button"}
                        key={"add-ingredient"}
                        onClick={addIngredientFields}>
                        Add More..
                    </button>
                </div>
                <button type={"submit"}>Add ShoppingItemList</button>
            </form>
        </div>
    )
}