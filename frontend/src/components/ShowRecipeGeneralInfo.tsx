import {SyntheticEvent} from "react";
import recipeDefaultImg from "./recipeimage.jpeg";
import {Recipe} from "../model/Recipe";
import "./ShowRecipeGeneralInfo.css";
import * as AiIcons from 'react-icons/ai';

type ShowRecipeGeneralInfoProps = {
    recipe: Recipe;
}

export default function ShowRecipeGeneralInfo({recipe}: ShowRecipeGeneralInfoProps) {
    return (<div className={"general-recipe-info"}>
            <h1 id={"title"}>{recipe.title}</h1>
            <div id={"top-image-info"}>
                <div id={"top-image-info-item"}>Vegetarian: {recipe.vegetarian ? <AiIcons.AiFillCheckCircle/> : <AiIcons.AiFillCloseCircle/>}</div>
                <div id={"top-image-info-item"}>Vegan: {recipe.vegan ? <AiIcons.AiFillCheckCircle/> : <AiIcons.AiFillCloseCircle/>}</div>
                <div id={"top-image-info-item"}>GlutenFree: {recipe.glutenFree ? <AiIcons.AiFillCheckCircle/> : <AiIcons.AiFillCloseCircle/>}</div>
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
                <div><AiIcons.AiFillClockCircle/> {recipe.readyInMinutes}</div>
                <p><AiIcons.AiFillSkin/> {recipe.servings}</p>
            </div>
        </div>
    )
}
