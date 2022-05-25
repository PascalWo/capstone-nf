import {Recipe} from "../model/Recipe";
import "./RecipeCard.css";
import recipeDefaultImg from "./recipeimage.jpeg"
import {SyntheticEvent} from "react";

type RecipeCardProps = {
    recipe: Recipe;
}

export default function RecipeCard({recipe}: RecipeCardProps){


    return(
        <div className={"recipe-card"}>
            <div id={"recipe-title"}>{recipe.title}</div>
            {recipe.image
            ? <img id={"recipe-image"}
                   src={recipe.image}
                   onError={(event: SyntheticEvent<HTMLImageElement>) => event.currentTarget.src = recipeDefaultImg}
                   alt={"Recipe"}/>
            : <img id={"recipe-image"}
                   src={recipeDefaultImg}
                   alt={"Recipe Default"} />}
            <div id={"recipe-description"}>{recipe.summary?.substring(0,100)}</div>

        </div>
    )

}