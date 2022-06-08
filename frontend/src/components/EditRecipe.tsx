import {Recipe} from "../model/Recipe";
import AddRecipe from "./AddRecipe";

type EditRecipeProps = {
    addRecipeItem?: (newRecipe: Omit<Recipe, "id">) => void
    toggleEditing?: () => void
    recipe: Recipe
}

export default function EditRecipe({toggleEditing, recipe, addRecipeItem}:EditRecipeProps){

    const onClickToggleAndGoBack = () => {
       toggleEditing && toggleEditing();
    }



    return (
        <div>
            Hier können Sie ihr Rezept editieren!
            <button onClick={onClickToggleAndGoBack}>Back</button>
            <AddRecipe addRecipeItem={addRecipeItem} recipe={recipe}/>
        </div>
    )
}
