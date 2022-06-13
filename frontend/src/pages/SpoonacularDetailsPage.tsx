import {useParams} from "react-router-dom";
import useSpoonaDetailsRecipe from "../hooks/useSpoonaDetailsRecipe";
import {useEffect} from "react";
import ShowDetailsRecipe from "../components/ShowDetailsRecipe";
import useRecipes from "../hooks/useRecipes";

export default function SpoonacularDetailsPage(){
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
            <div>
                {spoonaDetailsRecipe
                ?<ShowDetailsRecipe recipe={spoonaDetailsRecipe} openedFromSpoonaApi={true} addRecipeItem={addRecipeItem}/>
                : <p>Kein Rezept mit der ID: {id} gefunden</p>}
                </div>
        </div>
    )
}
