import {Recipe} from "../model/Recipe";
import "./RecipeCard.css";
import recipeDefaultImg from "./recipeimage.jpeg"
import {SyntheticEvent} from "react";
import {useNavigate} from "react-router-dom";

type RecipeCardProps = {
    recipe: Recipe;
}

export default function RecipeCard({recipe}: RecipeCardProps){
    const navigate = useNavigate()
    const onCardClick = () => {
        navigate(`/spoona/recipe/${recipe.id}`)
    }

    return (
        <div className={"recipe-card"}
             onClick={onCardClick}>
            <div id={"recipe-title"}>{recipe.title}</div>
            {recipe.image
                ? <img id={"recipe-image"}
                       src={recipe.image}
                       onError={(event: SyntheticEvent<HTMLImageElement>) => event.currentTarget.src = recipeDefaultImg}
                       alt={"Recipe"}/>
                : <img id={"recipe-image"}
                       src={recipeDefaultImg}
                       alt={"Recipe Default"}/>}
            <div id={"recipe-description"}>{recipe.summary?.substring(0, 100)}</div>
        </div>
    )

}