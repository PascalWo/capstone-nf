import useRecipes from "../hooks/useRecipes";
import RecipeOverview from "../components/RecipeOverview";

export default function RecipePage(){
    const recipes = useRecipes()


    return (
        <div>
            <RecipeOverview recipes={recipes}/>
        </div>
    )
}