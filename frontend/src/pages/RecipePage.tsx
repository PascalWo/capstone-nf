import useRecipes from "../hooks/useRecipes";
import RecipeOverview from "../components/RecipeOverview";
import {useState} from "react";
import AddRecipe from "../components/AddRecipe";

export default function RecipePage(){
    const {recipes, addRecipeItem} = useRecipes()
    const [addingEnabled, setAddingEnabled] = useState<boolean>(false);
    const showAddButton: boolean = true;

    const toggleAdding = () => {
        setAddingEnabled(!addingEnabled);
    }

    return (
        <div>
            {addingEnabled
            ?<AddRecipe addRecipeItem={addRecipeItem} toggleAdding={toggleAdding}/>
            :<RecipeOverview toggleAdding={toggleAdding} recipes={recipes} showAddButton={showAddButton}/>}
        </div>
    )
}
