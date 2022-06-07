import {Recipe} from "../model/Recipe";
import "./ShowDetailsRecipe.css"
import ShowIngredients from "./ShowIngredients";
import ShowRecipeGeneralInfo from "./ShowRecipeGeneralInfo";
import ShowInstructions from "./ShowInstructions";
import ShowEquipment from "./ShowEquipment";
import ShowDetailsRecipeButtons from "./ShowDetailsRecipeButtons";

type ShowSpoonacularDetailsRecipeProps = {
    recipe: Recipe;
    openedFromSpoonaApi: boolean;
    addRecipeItem?: (newRecipe: Omit<Recipe, "id">) => void
}

export default function ShowDetailsRecipe({recipe, openedFromSpoonaApi, addRecipeItem}: ShowSpoonacularDetailsRecipeProps) {
    return (
        <div>
            <div>Details zum Rezept:</div>
            <ShowRecipeGeneralInfo recipe={recipe}/>
            <ShowDetailsRecipeButtons openedFromSpoonaApi={openedFromSpoonaApi} recipe={recipe} addRecipeItem={addRecipeItem}/>
            <div>Zutaten:</div>
            <ShowIngredients recipe={recipe}/>
            <div>Instructions</div>
            <ShowInstructions recipe={recipe}/>
            <div>Equipment</div>
            <ShowEquipment recipe={recipe}/>
        </div>
    )
}
