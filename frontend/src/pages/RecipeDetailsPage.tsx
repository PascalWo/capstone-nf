import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import useDetailsRecipe from "../hooks/useDetailsRecipe";
import ShowDetailsRecipe from "../components/ShowDetailsRecipe";

export default function RecipeDetailsPage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const {detailsRecipe, getDetailsRecipeById} = useDetailsRecipe()

    useEffect(() => {

        if(id) {
            getDetailsRecipeById(id)
        }
        // eslint-disable-next-line
    },[id])

    return (
        <div>
            <div>Detailspage</div>
            <button onClick={() => navigate(-1)}>Back to Overview</button>
            <div>
                {detailsRecipe
                ?<ShowDetailsRecipe recipe={detailsRecipe} openedFromSpoonaApi={false}/>
                : <p>Kein Rezept mit der ID: {id} gefunden</p>}
                </div>
        </div>
    )
}
