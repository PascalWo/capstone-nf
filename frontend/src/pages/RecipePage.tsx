import useRecipes from "../hooks/useRecipes";
import RecipeOverview from "../components/RecipeOverview";
import {FormEvent, useState} from "react";
import AddRecipe from "../components/AddRecipe";

export default function RecipePage(){
    const {recipes, addRecipeItem} = useRecipes()
    const [addingEnabled, setAddingEnabled] = useState<boolean>(false);

    const onSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setAddingEnabled(!addingEnabled);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <button type={"submit"}>Neues Rezept hinzufügen</button>
            </form>
            {addingEnabled
            ?<AddRecipe addRecipeItem={addRecipeItem}/>
            :<RecipeOverview recipes={recipes}/>}
        </div>
    )
}