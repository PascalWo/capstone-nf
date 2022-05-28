import {useContext, useState} from "react";
import {Recipe} from "../model/Recipe";
import {AuthContext} from "../context/AuthProvider";
import {getDetailsRecipeBy} from "../service/lapa-api-service";

export default function useDetailsRecipe() {
    const [detailsRecipe, setDetailsRecipe] = useState<Recipe>();
    const {token} = useContext(AuthContext);

    const getDetailsRecipeById = (id:string) =>{
        getDetailsRecipeBy(id, token)
            .then(data => setDetailsRecipe(data))
            .catch(() => "Error")
    }
    return {detailsRecipe, getDetailsRecipeById, setDetailsRecipe}
}