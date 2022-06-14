import {Recipe} from "../model/Recipe";
import RecipeCard from "./RecipeCard";
import {ChangeEvent, FormEvent, useState} from "react";
import "./RecipeOverview.css";
import "./Buttons.css";

type RecipeOverviewProps = {
    recipes: Recipe[];
    toggleAdding?: () => void
    showAddButton: boolean
}

export default function RecipeOverview({recipes, toggleAdding, showAddButton}: RecipeOverviewProps) {
    const [search, setSearch] = useState<string>("");

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (toggleAdding) {
            toggleAdding();
        }
    }

    return (
        <div className={"recipe-overview"}>
            <div id={"recipe-overview-input"}>
                <input className={"search-input-field"}
                       type={"text"}
                       value={search}
                       placeholder={"Filter..."}
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}/>
                {showAddButton &&
                    <form onSubmit={onSubmit}>
                        <button className={"add-item-button"}
                                type={"submit"}>NEW RECIPE
                        </button>
                    </form>}
            </div>
            <div className={"recipe-cards"}>
                {recipes
                    .filter(recipe => recipe.title.toLowerCase().includes(search.toLowerCase()))
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map(recipe => <RecipeCard openedFromSpoona={showAddButton} key={recipe.id} recipe={recipe}/>)}
            </div>
        </div>
    )
}
