import {useNavigate, useParams} from "react-router-dom";
import useSpoonaDetailsRecipe from "../hooks/useSpoonaDetailsRecipe";
import {useEffect} from "react";
import ShowDetailsRecipe from "../components/ShowDetailsRecipe";
import useRecipes from "../hooks/useRecipes";

export default function SpoonacularDetailsPage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const {spoonaDetailsRecipe, getSpoonaDetailsRecipeById} = useSpoonaDetailsRecipe()
    const {addRecipeItem} = useRecipes()

    useEffect(() => {

        if(id) {
            getSpoonaDetailsRecipeById(id)
        }
        // eslint-disable-next-line
    },[id])

    return (
        <div>
            <div>Detailspage</div>
            <button onClick={() => navigate(`/spoona/search`)}>Back</button>
            <div>
                {spoonaDetailsRecipe
                ?<ShowDetailsRecipe recipe={spoonaDetailsRecipe} openedFromSpoonaApi={true} addRecipeItem={addRecipeItem}/>
                : <p>Kein Rezept mit der ID: {id} gefunden</p>}
                </div>
        </div>
    )
}
