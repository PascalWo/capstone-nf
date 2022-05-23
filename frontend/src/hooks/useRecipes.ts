import {Recipe} from "../model/Recipe";
import {useContext, useEffect, useState} from "react";
import {getAllRecipes} from "../service/lapa-api-service";
import {AuthContext} from "../context/AuthProvider";

export default function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        getAllRecipes(token)
            .then(allRecipes => setRecipes(allRecipes))
            .catch(() => "Connection failed!")
    },[token])

    return recipes;
}