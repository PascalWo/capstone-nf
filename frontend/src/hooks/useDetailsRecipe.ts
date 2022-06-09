import {useContext, useState} from "react";
import {Recipe} from "../model/Recipe";
import {AuthContext} from "../context/AuthProvider";
import {getDetailsRecipeBy, putRecipe} from "../service/lapa-api-service";

export default function useDetailsRecipe() {
    const [detailsRecipe, setDetailsRecipe] = useState<Recipe>();
    const {token} = useContext(AuthContext);

    const getDetailsRecipeById = (id:string) =>{
        getDetailsRecipeBy(id, token)
            .then(data => setDetailsRecipe(data))
            .catch(() => "Error")
    }

    const updateRecipe = (id:string, recipeToUpdate: Recipe) => {
        return putRecipe(id, recipeToUpdate, token)
            .then(updatedRecipe => {
                setDetailsRecipe(updatedRecipe)})
            .catch(() => "Error")
    }

    return {detailsRecipe, getDetailsRecipeById, setDetailsRecipe, updateRecipe}
}
