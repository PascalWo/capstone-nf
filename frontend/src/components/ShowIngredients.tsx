import {Recipe} from "../model/Recipe";
import "./ShowIngredients.css";

type ShowIngredientsProps = {
    recipe: Recipe;
}

export default function ShowIngredients({recipe}: ShowIngredientsProps){
    return  (

        <div className={"show-ingredients"}>

            {recipe.extendedIngredients && recipe.extendedIngredients
                .map(ingredients => (
                    <div id={"ingredient-details"}>
                        <div id={"ingredient-name"}>{ingredients.name}</div>
                        <div id={"ingredient-amount"}>{ingredients.amount}</div>
                    </div>
                        ))}






            {/*<div id={"ingredient"}>Zutat: {recipe.extendedIngredients && recipe.extendedIngredients*/}
            {/*    .map(ingredients => (*/}
            {/*        <div id={"ingredient-name"} key={ingredients.name}>{ingredients.name}</div>))}*/}
            {/*</div>*/}
            {/*<div id={"amount"}>Menge:{recipe.extendedIngredients && recipe.extendedIngredients*/}
            {/*    .map(ingredients => (*/}
            {/*        <div id={"ingredient-amount"} key={ingredients.amount}>{ingredients.amount}</div>))}*/}
            {/*</div>*/}
        </div>
    )
}