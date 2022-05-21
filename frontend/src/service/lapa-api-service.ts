import axios from "axios";
import {Recipe} from "../model/Recipe";

export const getAllRecipes: () => Promise<Recipe[]> = () => {
    return axios.get("/api/recipes")
        .then(response => response.data)
}

export const getSpoonaRecipesBy: (search: string | undefined) => Promise<Recipe[]> = (search:string | undefined) => {
    return axios.get(`/api/spoonacular/recipes/${search}`)
        .then(response => response.data)
}