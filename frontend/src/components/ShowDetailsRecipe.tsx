import {Recipe} from "../model/Recipe";
import "./ShowDetailsRecipe.css"
import ShowIngredients from "./ShowIngredients";
import ShowRecipeGeneralInfo from "./ShowRecipeGeneralInfo";

type ShowSpoonacularDetailsRecipeProps = {
    recipe: Recipe;
}

export default function ShowDetailsRecipe({recipe}: ShowSpoonacularDetailsRecipeProps){
    return(
        <div>
            <div>Details zum Rezept:</div>
            <ShowRecipeGeneralInfo recipe={recipe}/>
            <div>Zutaten:</div>
            <ShowIngredients recipe={recipe}/>
        </div>
    )
}