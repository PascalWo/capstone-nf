import {useContext, useState} from "react";
import {Recipe} from "../model/Recipe";
import {getSpoonaRecipesBy} from "../service/lapa-api-service";
import {AuthContext} from "../context/AuthProvider";

export default function useSpoonaRecipes() {
    const [spoonaRecipes, setSpoonaRecipes] = useState<Recipe[]>([]);
    const {token} = useContext(AuthContext);

    const getSpoonaRecipeBySearch = (search:string | undefined) =>{
        getSpoonaRecipesBy(search, token)
            .then(data => setSpoonaRecipes(data))
            .catch(() => "Error")
    }
    return {spoonaRecipes, getSpoonaRecipeBySearch, setSpoonaRecipes}
}