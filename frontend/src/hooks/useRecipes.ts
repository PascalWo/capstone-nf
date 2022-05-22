import {Recipe} from "../model/Recipe";
import {useEffect, useState} from "react";
import {getAllRecipes} from "../service/lapa-api-service";

export default function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        getAllRecipes()
            .then(allRecipes => setRecipes(allRecipes))
            .catch(() => "Connection failed!")
    },[])

    return recipes;
}