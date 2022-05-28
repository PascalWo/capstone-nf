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
export const getSpoonaDetailsRecipeBy: (id: string | undefined, token?: string) => Promise<Recipe> = (id:string | undefined, token:string |undefined) => {
    return axios.get(`/api/spoonacular/recipes/information/${id}`, token
        ?{headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}
export const getDetailsRecipeBy: (id: string | undefined, token?: string) => Promise<Recipe> = (id:string | undefined, token:string |undefined) => {
    return axios.get(`/api/recipes/information/${id}`, token
        ?{headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const postRecipeItem: (newRecipeItem: Omit<Recipe, "id">, token?: string) => Promise<Recipe> = (newRecipeItem, token) => {
    return axios.post("/api/recipes", newRecipeItem, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}