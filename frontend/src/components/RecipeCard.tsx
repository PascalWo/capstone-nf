import {Recipe} from "../model/Recipe";
import "./RecipeCard.css";

type RecipeCardProps = {
    recipe: Recipe;
}

export default function RecipeCard({recipe}: RecipeCardProps){

    return(
        <div className={"recipe-card"}>
            <p>{recipe.id}</p>
            <p>{recipe.title}</p>
            <p>{recipe.image}</p>
        </div>
    )

}