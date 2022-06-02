import {FormEvent, useState} from "react";
import {Recipe} from "../model/Recipe";
import "./AddRecipe.css"
import {Ingredients} from "../model/Ingredients";

type AddRecipeProps = {
    addRecipeItem: (newRecipe: Omit<Recipe, "id">) => void
    toggleAdding?: () => void
}

export default function AddRecipe({addRecipeItem, toggleAdding}: AddRecipeProps) {
    const [title, setTitle] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [vegan, setVegan] = useState<boolean>(false)
    const [vegetarian, setVegetarian] = useState<boolean>(false)
    const [glutenFree, setGlutenFree] = useState<boolean>(false)
    const [readyInMinutes, setReadyInMinutes] = useState<number>(0)
    const [servings, setServings] = useState<number>(0)
    const [summary, setSummary] = useState<string>("")
    const [instructions, setInstructions] = useState<string>("")
    const [ingredients, setIngredients] = useState<Ingredients[]>([
        {name: "",amount: 0, unit: ""}
    ])

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let data: any = [...ingredients];

        data[index][event.target.name] = event.target.value;
        console.log(data);
        setIngredients(data);
    }

    const addFields = () => {
        let ingredient: Ingredients = {
            name: "",
            amount: 0,
            unit: "",
        }
        setIngredients([...ingredients, ingredient])
    }

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title) {
            console.error("Title is required");
            return
        }
        const newRecipe: Omit<Recipe, "id"> = {
            title: title,
            image: image,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            readyInMinutes: readyInMinutes,
            servings: servings,
            summary: summary,
            instructions,
            extendedIngredients: ingredients,
        }
        console.log(newRecipe);
        addRecipeItem(newRecipe);
        console.log(newRecipe)
        setTitle('')
        setIngredients([{name: "",amount: 0, unit: ""}])
        if (toggleAdding) {
            toggleAdding();
        }
    }

    const onClickToggleAndGoBack = () => {
        if (toggleAdding) {
            toggleAdding();
        }
    }

    return (
        <div>
            <h1>Hier können Sie ein neues Rezept hinzufügen:</h1>
            <form className={"add-form"} onSubmit={onAdd}>
                <input type={"text"} placeholder="Title" value={title}
                       onChange={event => setTitle(event.target.value)}/>
                <input type={"url"} placeholder="Image Source" value={image}
                       onChange={event => setImage(event.target.value)}/>
                Vegetarian:
                <input type={"checkbox"} checked={vegetarian}
                       onChange={event => setVegetarian(event.target.checked)}/>
                Vegan:
                <input type={"checkbox"} checked={vegan}
                       onChange={event => setVegan(event.target.checked)}/>
                GlutenFree:
                <input type={"checkbox"} checked={glutenFree}
                       onChange={event => setGlutenFree(event.target.checked)}/>
                Ready in Minutes:
                <input type={"number"} placeholder="ReadyInMinutes" value={readyInMinutes}
                       onChange={event => setReadyInMinutes(event.target.valueAsNumber)}/>
                Servings:
                <input type={"number"} placeholder="Servings" value={servings}
                       onChange={event => setServings(event.target.valueAsNumber)}/>
                <input type={"text"} placeholder="Summary" value={summary}
                       onChange={event => setSummary(event.target.value)}/>
                <input type={"text"} placeholder="Instructions" value={instructions}
                       onChange={event => setInstructions(event.target.value)}/>

                Ingredients:
                <div>
                    {ingredients.map((ingredientsInput:Ingredients, index: number) => {
                        return (
                            <div>
                                <input key={"name" + index} name={"name"} type={"text"} placeholder={"name"}
                                       onChange={event => handleFormChange(event, index)} value={ingredientsInput.name}/>
                                <input key={"amount" + index} name={"amount"} type={"number"} placeholder={"amount"}
                                       onChange={event => handleFormChange(event, index)} value={ingredientsInput.amount}/>
                                <input key={"unit" + index} name={"unit"} type={"text"} placeholder={"unit"}
                                       onChange={event => handleFormChange(event, index)} value={ingredientsInput.unit}/>
                            </div>
                        )
                    })}
                    <button type={"button"} onClick={addFields}>Add More..</button>
                </div>
                <input type={"submit"} value={"Add item"}/>
            </form>
            <button onClick={onClickToggleAndGoBack}>Back</button>
            <p id={"url-warning"}>*Image Source bitte als Website-Link "https://..." angeben!</p>
        </div>
    )
}
