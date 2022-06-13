import axios from "axios";
import {Recipe} from "../model/Recipe";
import {ShoppingItem} from "../model/ShoppingItem";

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

export const putRecipe: (id: string, updatedRecipe: Recipe, token?: string) => Promise<Recipe> = (id, updatedRecipe, token) => {
    return axios.put(`/api/recipes/${id}`, updatedRecipe, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const getAllShoppingItem: (token?: string) => Promise<ShoppingItem[]> = (token) => {
    return axios.get("/api/shoppingitem", token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const postShoppingItem: (newShoppingItem: Omit<ShoppingItem, "id">, token?: string) => Promise<ShoppingItem> = (newShoppingItem, token) => {
    return axios.post("/api/shoppingitem", newShoppingItem, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}
export const postShoppingItemList: (newShoppingItemList: Omit<ShoppingItem, "id">[], token?: string) => Promise<ShoppingItem[]> = (newShoppingItemList, token) => {
    return axios.post("/api/shoppingitem/list", newShoppingItemList, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const putShoppingItem: (updatedShoppingItem: ShoppingItem, token?: string) => Promise<ShoppingItem> = (updatedShoppingItem, token) => {
    return axios.put("/api/shoppingitem", updatedShoppingItem, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export function getShoppingItemBy(id: string, token?: string) {
    return axios.get(`/api/shoppingitem/${id}`, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const removeShoppingItem: (id: string, token?: string) => Promise<void> = (id: string, token) => {
    return axios.delete(`/api/shoppingitem/${id}`, token
        ? {headers: {"Authorization": token}}
        : {})
}
