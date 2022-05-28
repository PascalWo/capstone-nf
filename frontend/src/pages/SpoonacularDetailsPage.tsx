import {useNavigate, useParams} from "react-router-dom";
import useSpoonaDetailsRecipe from "../hooks/useSpoonaDetailsRecipe";
import {useEffect} from "react";
import ShowDetailsRecipe from "../components/ShowDetailsRecipe";

export default function SpoonacularDetailsPage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const {spoonaDetailsRecipe, getSpoonaDetailsRecipeById} = useSpoonaDetailsRecipe()

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
                ?<ShowDetailsRecipe recipe={spoonaDetailsRecipe}/>
                : <p>Kein Rezept mit der ID: {id} gefunden</p>}
                </div>
        </div>
    )
}