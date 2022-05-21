import {useState} from "react";
import {Recipe} from "../model/Recipe";
import {getSpoonaRecipesBy} from "../service/lapa-api-service";

export default function useSpoonaRecipes() {

    const [spoonaRecipes, setSpoonaRecipes] = useState<Recipe[]>([]);

    const getSpoonaRecipeBySearch = (search:string | undefined) =>{
        getSpoonaRecipesBy(search)
            .then(data => setSpoonaRecipes(data))
            .catch(() => "Error")
    }
    return {spoonaRecipes, getSpoonaRecipeBySearch, setSpoonaRecipes}
}