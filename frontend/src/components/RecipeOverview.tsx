import {Recipe} from "../model/Recipe";
import RecipeCard from "./RecipeCard";
import {ChangeEvent, useState} from "react";
import "./RecipeOverview.css"

type RecipeOverviewProps = {
    recipes: Recipe[];
}

export default function RecipeOverview({recipes}: RecipeOverviewProps){
    const [search, setSearch] = useState<string>("");


    return(
        <div className={"recipe-overview"}>
            <input type={"text"}
                   value={search}
                   placeholder={"Filter..."}
                   onChange={(event:ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}/>
          <div className={"recipe-cards"}>
              {recipes
                .filter(recipe => recipe.title.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(recipe => <RecipeCard key={recipe.id} recipe={recipe}/>)}
          </div>
        </div>
    )

}