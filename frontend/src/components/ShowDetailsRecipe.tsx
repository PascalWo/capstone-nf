import {Recipe} from "../model/Recipe";
import "./ShowDetailsRecipe.css"
import ShowIngredients from "./ShowIngredients";
import ShowRecipeGeneralInfo from "./ShowRecipeGeneralInfo";
import ShowInstructions from "./ShowInstructions";
import ShowEquipment from "./ShowEquipment";

type ShowSpoonacularDetailsRecipeProps = {
    recipe: Recipe;
}

export default function ShowDetailsRecipe({recipe}: ShowSpoonacularDetailsRecipeProps) {
    return (
        <div>
            <div>Details zum Rezept:</div>
            <ShowRecipeGeneralInfo recipe={recipe}/>
            <div>Zutaten:</div>
            <ShowIngredients recipe={recipe}/>
            <div>Instructions</div>
            <ShowInstructions recipe={recipe}/>
            <div>Equipment</div>
            <ShowEquipment recipe={recipe}/>
        </div>
    )
}