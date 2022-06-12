import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import useDetailsRecipe from "../hooks/useDetailsRecipe";
import ShowDetailsRecipe from "../components/ShowDetailsRecipe";
import * as AiIcons from "react-icons/ai";

export default function RecipeDetailsPage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const {detailsRecipe, getDetailsRecipeById, updateRecipe} = useDetailsRecipe()

    useEffect(() => {

        if(id) {
            getDetailsRecipeById(id)
        }
        // eslint-disable-next-line
    },[id])

    return (
        <div>
            <div>
                {detailsRecipe
                    ? <ShowDetailsRecipe recipe={detailsRecipe} openedFromSpoonaApi={false} updateRecipe={updateRecipe}/>
                    : <p>Kein Rezept mit der ID: {id} gefunden</p>}
            </div>
            <AiIcons.AiFillLeftCircle id={"details-button-symbol"} onClick={() => navigate(-1)}/>
        </div>
    )
}
