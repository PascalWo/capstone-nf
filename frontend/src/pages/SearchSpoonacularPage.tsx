import RecipeOverview from "../components/RecipeOverview";
import useSpoonaRecipes from "../hooks/useSpoonaRecipes";
import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";

export default function SearchSpoonacularPage(){
    const {spoonaRecipes, getSpoonaRecipeBySearch} = useSpoonaRecipes()
    const {search} = useParams()
    const [spoonaSearch, setSpoonaSearch] = useState<string>("main")
    const navigate = useNavigate()
    const showAddButton: boolean = false;

    useEffect(() => {
            getSpoonaRecipeBySearch(search)
        // eslint-disable-next-line
    },[search])

    const onSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        navigate(`/spoona/search/${spoonaSearch}`)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type={"text"} placeholder={"SpoonaSearch..."} onChangeCapture={(event:ChangeEvent<HTMLInputElement>) => setSpoonaSearch(event.target.value) }/>
                <button type={"submit"}>Search</button>
            </form>
            <div>
            {spoonaSearch?
            <div>
                <RecipeOverview recipes={spoonaRecipes} showAddButton={showAddButton}/>
            </div> :
                <div>Placeholder</div>}
            </div>


        </div>
    )
}
