import {Recipe} from "../model/Recipe";
import RecipeCard from "./RecipeCard";
import {ChangeEvent, useState} from "react";

type RecipeOverviewProps = {
    recipes: Recipe[];
}

export default function RecipeOverview({recipes}: RecipeOverviewProps){
    const [search, setSearch] = useState<string>("");


    return(
        <div>
            <input type={"text"}
                   value={search}
                   placeholder={"Search..."}
                   onChange={(event:ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}/>
            {recipes
                .filter(recipe => recipe.title.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(recipe => <RecipeCard recipe={recipe}/>)}
        </div>
    )

}