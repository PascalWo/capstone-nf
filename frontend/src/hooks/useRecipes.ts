import {Recipe} from "../model/Recipe";
import {useContext, useEffect, useState} from "react";
import {getAllRecipes, postRecipeItem} from "../service/lapa-api-service";
import {AuthContext} from "../context/AuthProvider";

export default function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        getAllRecipes(token)
            .then(allRecipes => setRecipes(allRecipes))
            .catch(() => "Connection failed!")
    },[token])

    const addRecipeItem = (newRecipeItem : Omit<Recipe, "id">) => {
        postRecipeItem(newRecipeItem, token)
            .then(addedRecipeItem => setRecipes([...recipes, addedRecipeItem]))
            .then(() => {console.log("Recipe: " + newRecipeItem.title + " created");})
            .catch(() => console.error("Connection failed! Please retry later."))
    }

    return {recipes, addRecipeItem};
}