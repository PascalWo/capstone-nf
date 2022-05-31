import {Recipe} from "../model/Recipe";
import "./ShowIngredients.css";

type ShowIngredientsProps = {
    recipe: Recipe;
}

export default function ShowIngredients({recipe}: ShowIngredientsProps){
    return  (
        <div className={"ingredients"}>
            <div>{recipe.extendedIngredients && recipe.extendedIngredients.map(ingredients => (
                <div key={ingredients.name}>Zutat: {ingredients.name}</div>))}</div>
            <div>{recipe.extendedIngredients && recipe.extendedIngredients.map(ingredients => (
                <div key={ingredients.amount}>Anzahl:{ingredients.amount}</div>))}</div>
        </div>
    )
}