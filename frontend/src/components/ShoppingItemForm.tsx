import {ShoppingItem} from "../model/ShoppingItem";
import {ChangeEvent, FormEvent, useState} from "react";
import {Recipe} from "../model/Recipe";
import {Ingredient} from "../model/Ingredient";
import * as AiIcons from "react-icons/ai";
import "./ShoppingItemForm.css"

type ShoppingItemFormProps = {
    addShoppingItems: (newShoppingItem: Omit<ShoppingItem, "id">) => void
    toggleComponent: () => void
    recipe?: Recipe
    addShoppingItemList: (newShoppingItemList: Omit<ShoppingItem, "id">[]) => void
}

export default function ShoppingItemForm({
                                             addShoppingItems,
                                             toggleComponent,
                                             recipe,
                                             addShoppingItemList
                                         }: ShoppingItemFormProps) {
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

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name) {
            console.error("Name is required");
            return
        }
        const newShoppingItem: Omit<ShoppingItem, "id"> = {
            name: name,
            amount: amount,
            unit: unit,
            done: false
        }
        addShoppingItems(newShoppingItem);
        toggleComponent();
        setName("");
        setAmount(1);
        setUnit("");
    }

    const onListAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const shoppingItemList: Omit<ShoppingItem, "id">[] = ingredients.map(item => {
            return {name: item.name, amount: item.amount, unit: item.unit, done: false}
        })

        addShoppingItemList(shoppingItemList);
        toggleComponent();
    }

    return (
        <div className={"save-items-form"}>
            <h1 id={"items-form-title"}>Add Shopping Item</h1>
            <form id={"items-form"} onSubmit={onAdd}>
                <div id={"items-form-properties"}>
                    <input id={"items-form-text"}
                           type={"text"}
                           placeholder="Add a new item"
                           value={name}
                           onChange={event => setName(event.target.value)}/>
                    <div id={"items-form-amount-unit"}>
                        <input id={"items-form-number"} type={"number"}
                               value={amount}
                               onChange={event => setAmount(Number(event.target.value))}/>
                        <select id={"items-form-number"} value={unit}
                                onChange={event => setUnit(event.target.value)}>
                            <option value={"stk"}>stk</option>
                            <option value={"g"}>g</option>
                            <option value={"kg"}>kg</option>
                            <option value={"ml"}>ml</option>
                            <option value={"l"}>l</option>
                            <option value={"tl"}>tl</option>
                            <option value={"el"}>el</option>
                            <option value={"pr"}>pr</option>
                        </select>
                    </div>
                </div>
                <div id={"items-submit-button-container"}>
                    <button id={"items-submit-button"}
                            type={"submit"}>
                        ADD ITEM
                    </button>
                </div>
            </form>
            <form id={"items-form"} onSubmit={onListAdd}>
                <h1 id={"items-form-title"}>Add Shopping Items</h1>
                <div id={"items-form-ingredients"}>
                    {ingredients
                        .map((ingredientsInput: Ingredient, index: number) => {
                            return (
                                <div id={"items-form-list"}>
                                    <div id={"items-form-list-without-button"}>
                                        <input id={"items-form-texts"}
                                               value={ingredientsInput.name}
                                               key={"name" + index}
                                               name={"name"}
                                               type={"text"}
                                               placeholder={"name"}
                                               onChange={event => handleIngredientFormChange(event, index)}/>
                                        <div id={"items-form-amount-unit"}>
                                            <input id={"items-form-number"}
                                                   value={ingredientsInput.amount}
                                                   key={"amount" + index}
                                                   name={"amount"}
                                                   type={"number"}
                                                   placeholder={"amount"}
                                                   onChange={event => handleIngredientFormChange(event, index)}/>

                                            <select id={"items-form-unit"}
                                                    key={"unit" + index}
                                                    name={"unit"}
                                                    value={ingredientsInput.unit}
                                                    onChange={event => handleIngredientFormChange(event, index)}>
                                                <option value={"l"}>l</option>
                                                <option value={"tl"}>tl</option>
                                                <option value={"el"}>el</option>
                                                <option value={"pr"}>pr</option>
                                                <option value={"stk"}>stk</option>
                                                <option value={"g"}>g</option>
                                                <option value={"kg"}>kg</option>
                                                <option value={"ml"}>ml</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button id={"items-form-delete-input-button"}
                                            key={"remove" + index}
                                            type={"button"}
                                            onClick={() => removeIngredientField(index)}>
                                        <AiIcons.AiFillDelete/></button>
                                </div>
                            )
                        })}
                    <div id={"items-add-button-container"}>
                        <button
                            id={"items-form-add-input-button"}
                            type={"button"}
                            key={"add-ingredient"}
                            onClick={addIngredientFields}>
                            <AiIcons.AiFillPlusCircle/>
                        </button>
                    </div>
                </div>
                <div id={"items-submit-button-container"}>
                    <button id={"items-form-submit-button"}
                            type={"submit"}>
                        ADD ITEM LIST
                    </button>
                    <AiIcons.AiFillLeftCircle id={"details-button-symbol"} onClick={toggleComponent}/>
                </div>
            </form>

        </div>
    )
}
