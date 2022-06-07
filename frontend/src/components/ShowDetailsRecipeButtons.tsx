import {Recipe} from "../model/Recipe";

type ShowDetailsRecipeButtonsProps = {
    openedFromSpoonaApi: boolean;
    recipe: Recipe
    addRecipeItem?: (newRecipe: Omit<Recipe, "id">) => void
}

export default function ShowDetailsRecipeButtons({openedFromSpoonaApi, recipe, addRecipeItem}: ShowDetailsRecipeButtonsProps){

    const onClickSaveApiRecipe = () => {

        addRecipeItem &&
        addRecipeItem(recipe);
    }

    return (
        <div id={"details-buttons"}>
                <button type={"submit"}>Favorit</button>
                <button type={"submit"}>Einkaufswagen</button>
            {openedFromSpoonaApi &&
                <button onClick={onClickSaveApiRecipe} type={"submit"}>Speichern</button>}
        </div>
    )
}
