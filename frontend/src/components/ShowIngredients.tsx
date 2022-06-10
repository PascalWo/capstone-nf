import {Recipe} from "../model/Recipe";
import "./ShowIngredients.css";

type ShowIngredientsProps = {
    recipe: Recipe;
}
export default function ShowIngredients({recipe}: ShowIngredientsProps) {
    return (
        <div className={"show-ingredients"}>

            {recipe.extendedIngredients && recipe.extendedIngredients
                .map((ingredients, index) => (
                    <div key={"details" + index} id={"ingredient-details"}>
                        <div key={"name" + index} id={"ingredient-name"}>{ingredients.name}</div>
                        <div key={"amount+unit" + index} id={"ingredient-amount-unit"}>
                            <div key={"amount" + index} id={"ingredient-amount"}>{ingredients.amount}</div>
                            <div key={"unit" + index} id={"ingredient-unit"}>{ingredients.unit}</div>
                        </div>
                    </div>
                ))}
        </div>
    )
}
