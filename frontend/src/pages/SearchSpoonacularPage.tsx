import RecipeOverview from "../components/RecipeOverview";
import useSpoonaRecipes from "../hooks/useSpoonaRecipes";
import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";

export default function SearchSpoonacularPage(){
    const {spoonaRecipes, getSpoonaRecipeBySearch} = useSpoonaRecipes()
    const {search} = useParams()
    const [spoonaSearch, setSpoonaSearch] = useState<string>("main")
    const navigate = useNavigate()

    useEffect(() => {
            getSpoonaRecipeBySearch(search)
    },[search])

    const onSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        navigate(`/search/${spoonaSearch}`)
    }

    return (
        <div>
            {/*{spoonaSearch? <div>*/}
            {/*    <input type={"text"} placeholder={"SpoonaSearchIf..."} onChange={(event:ChangeEvent<HTMLInputElement>) => setSpoonaSearch(event.target.value)} onSubmit={() => navigate(`/search/${spoonaSearch}`)}/>*/}
            {/*</div>: <div>*/}
            {/*    <input type={"text"} placeholder={"SpoonaSearchElse..."} onChange={(event:ChangeEvent<HTMLInputElement>) => setSpoonaSearch(event.target.value)} onSubmit={() => navigate(`/search/${main}`)}/>*/}
            {/*</div>}*/}
            <form onSubmit={onSubmit}>
                <input type={"text"} placeholder={"SpoonaSearch..."} onChangeCapture={(event:ChangeEvent<HTMLInputElement>) => setSpoonaSearch(event.target.value) }/>
                {/*<input type={"text"} placeholder={"SpoonaSearch..."} onChange={(event:ChangeEvent<HTMLInputElement>) => setSpoonaSearch(event.target.value)}/>*/}
                <button type={"submit"}>Search</button>
            </form>
            <div>
            {spoonaSearch?
            <div>
                <RecipeOverview recipes={spoonaRecipes}/>
            </div> :
                <div>Test</div>}
            </div>


        </div>
    )
}