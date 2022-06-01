import {SyntheticEvent} from "react";
import recipeDefaultImg from "./recipeimage.jpeg";
import {Recipe} from "../model/Recipe";
import "./ShowDetailsRecipe.css"

type ShowRecipeGeneralInfoProps = {
    recipe: Recipe;
}

export default function ShowRecipeGeneralInfo({recipe}: ShowRecipeGeneralInfoProps) {
    return (<div className={"general-recipe-info"}>
            <h1 id={"title"}>{recipe.title}</h1>
            <div id={"top-image-info"}>
                <p>Vegetarian: {recipe.vegetarian ? "Yes" : "No"}</p>
                <p>Vegan: {recipe.vegan ? "Yes" : "No"}</p>
                <p>GlutenFree: {recipe.glutenFree ? "Yes" : "No"}</p>
            </div>
            {recipe.image
                ? <img id={"recipe-image"}
                       src={recipe.image}
                       onError={(event: SyntheticEvent<HTMLImageElement>) => event.currentTarget.src = recipeDefaultImg}
                       alt={"Recipe"}/>
                : <img id={"recipe-image"}
                       src={recipeDefaultImg}
                       alt={"Recipe Default"}/>}
            <div id={"bottom-image-info"}>
                <p>ReadyInMinutes: {recipe.readyInMinutes}</p>
                <p>Servings: {recipe.servings}</p>
                <form id={"details-buttons"}>
                    <button type={"submit"}>Favorit</button>
                    <button type={"submit"}>Einkaufswagen</button>
                </form>
            </div>
        </div>
    )
}