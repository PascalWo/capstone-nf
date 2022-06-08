import {Recipe} from "../model/Recipe";
import "./ShowDetailsRecipe.css"
import ShowIngredients from "./ShowIngredients";
import ShowRecipeGeneralInfo from "./ShowRecipeGeneralInfo";
import ShowInstructions from "./ShowInstructions";
import ShowEquipment from "./ShowEquipment";
import {useState} from "react";
import EditRecipe from "./EditRecipe";

type ShowSpoonacularDetailsRecipeProps = {
    recipe: Recipe;
    openedFromSpoonaApi: boolean;
    addRecipeItem?: (newRecipe: Omit<Recipe, "id">) => void
}

export default function ShowDetailsRecipe({recipe, openedFromSpoonaApi, addRecipeItem}: ShowSpoonacularDetailsRecipeProps) {
    const [editingEnabled, setEditingEnabled] = useState<boolean>(false);

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    }

    return (
        <div>
            <div>Details zum Rezept:</div>
            {!editingEnabled &&
                <div>
            <ShowRecipeGeneralInfo recipe={recipe}/>
            <div>{openedFromSpoonaApi &&
                <button onClick={toggleEditing} type={"submit"}>Speichern</button>}
                <button type={"submit"}>Favorit</button>
                <button type={"submit"}>Einkaufswagen</button>
            </div>
            <div>Zutaten:</div>
            <ShowIngredients recipe={recipe}/>
            <div>Instructions</div>
            <ShowInstructions recipe={recipe}/>
            <div>Equipment</div>
            <ShowEquipment recipe={recipe}/>
                </div>}
            {editingEnabled &&
            <EditRecipe toggleEditing={toggleEditing} recipe={recipe} addRecipeItem={addRecipeItem}/>}
        </div>
    )
}
