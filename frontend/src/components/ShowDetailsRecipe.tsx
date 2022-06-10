import {Recipe} from "../model/Recipe";
import "./ShowDetailsRecipe.css"
import ShowIngredients from "./ShowIngredients";
import ShowRecipeGeneralInfo from "./ShowRecipeGeneralInfo";
import ShowInstructions from "./ShowInstructions";
import ShowEquipment from "./ShowEquipment";
import {useState} from "react";
import AddRecipe from "./AddRecipe";

type ShowSpoonacularDetailsRecipeProps = {
    recipe: Recipe;
    openedFromSpoonaApi: boolean;
    addRecipeItem?: (newRecipe: Omit<Recipe, "id">) => void
    updateRecipe?:(id:string, updateRecipe: Recipe) => void
}

export default function ShowDetailsRecipe({recipe, openedFromSpoonaApi, addRecipeItem, updateRecipe}: ShowSpoonacularDetailsRecipeProps) {
    const [savingEnabled, setSavingEnabled] = useState<boolean>(false);
    const [editingEnabled, setEditingEnabled] = useState<boolean>(false);

    const toggleSaving = () => {
        setSavingEnabled(!savingEnabled);
    }

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    }

    const deepCloneRecipe = () => {
        return JSON.parse(JSON.stringify(recipe))
    }

    return (
        <div>
            <div>Details zum Rezept:</div>
            {!savingEnabled && !editingEnabled &&
                <div>
            <ShowRecipeGeneralInfo recipe={recipe}/>
            <div>{openedFromSpoonaApi &&
                <button onClick={toggleSaving} type={"submit"}>Speichern</button>}
                {!openedFromSpoonaApi &&
                <button onClick={toggleEditing} type={"submit"}>Edit</button> }
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
            {savingEnabled &&
                <AddRecipe toggleComponent={toggleSaving} recipe={deepCloneRecipe()} addRecipeItem={addRecipeItem}/>}
            {editingEnabled &&
                <AddRecipe toggleComponent={toggleEditing} recipe={deepCloneRecipe()} updateRecipe={updateRecipe}/>}
        </div>
    )
}
