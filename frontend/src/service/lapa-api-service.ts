import axios from "axios";
import {Recipe} from "../model/Recipe";

export const getAllRecipes: (token?: string) => Promise<Recipe[]> = (token: string | undefined) => {
    return axios.get("/api/recipes", token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const getSpoonaRecipesBy: (search: string | undefined, token?: string) => Promise<Recipe[]> = (search:string | undefined, token:string |undefined) => {
    return axios.get(`/api/spoonacular/recipes/${search}`, token
    ?{headers: {"Authorization": token}}
    : {})
        .then(response => response.data)
}