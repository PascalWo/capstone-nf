import {Recipe} from "../model/Recipe";
import "./RecipeCard.css";
import recipeDefaultImg from "./recipeimage.png"
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
            <div id={"recipe-description"}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
        </div>
    )

}