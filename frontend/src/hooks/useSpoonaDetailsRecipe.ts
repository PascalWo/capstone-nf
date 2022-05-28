import {useContext, useState} from "react";
import {Recipe} from "../model/Recipe";
import {AuthContext} from "../context/AuthProvider";
import {getSpoonaDetailsRecipeBy} from "../service/lapa-api-service";

export default function useSpoonaDetailsRecipe() {
    const [spoonaDetailsRecipe, setSpoonaDetailsRecipe] = useState<Recipe>();
    const {token} = useContext(AuthContext);

    const getSpoonaDetailsRecipeById = (id:string) =>{
        getSpoonaDetailsRecipeBy(id, token)
            .then(data => setSpoonaDetailsRecipe(data))
            .catch(() => "Error")
    }
    return {spoonaDetailsRecipe, getSpoonaDetailsRecipeById, setSpoonaDetailsRecipe}
}