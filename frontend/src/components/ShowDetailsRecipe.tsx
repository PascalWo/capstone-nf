import {Recipe} from "../model/Recipe";
import {SyntheticEvent} from "react";
import recipeDefaultImg from "./recipeimage.jpeg";
import "./ShowDetailsRecipe.css"

type ShowSpoonacularDetailsRecipeProps = {
    recipe: Recipe;
}

export default function ShowDetailsRecipe({recipe}: ShowSpoonacularDetailsRecipeProps){
    return(
        <div>
            <div>Details zum Rezept:</div>
            <div>{recipe.title}</div>
            {recipe.image
                ? <img id={"recipe-image"}
                       src={recipe.image}
                       onError={(event: SyntheticEvent<HTMLImageElement>) => event.currentTarget.src = recipeDefaultImg}
                       alt={"Recipe"}/>
                : <img id={"recipe-image"}
                       src={recipeDefaultImg}
                       alt={"Recipe Default"} />}
            <div>ID: {recipe.id}</div>
            <div>Vegetarian: {recipe.vegetarian? "True": "False"}</div>
            <div>Vegan: {recipe.vegan? "True": "False"}</div>
            <div>GlutenFree: {recipe.glutenFree? "True": "False"}</div>
            <div>PricePerServings: {recipe.pricePerServing}</div>
            <div>ReadyInMinutes: {recipe.readyInMinutes}</div>
            <div>Servings: {recipe.servings}</div>
            <div>{recipe.summary}</div>
            <div>Zutaten:</div>
            <div className={"ingredients"}>
                <div>{recipe.extendedIngredients && recipe.extendedIngredients.map(ingredients => (
                    <div key={ingredients.name}>Zutat: {ingredients.name}</div>))}</div>
                <div>{recipe.extendedIngredients && recipe.extendedIngredients.map(ingredients => (
                    <div key={ingredients.amount}>Anzahl:{ingredients.amount}</div>))}</div>
            </div>
        </div>
    )
}