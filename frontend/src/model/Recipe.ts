import {Ingredients} from "./Ingredients";

export type Recipe = {
    id: string;
    title: string;
    image?: string;
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    pricePerServing?: number;
    readyInMinutes?: number;
    servings?: number;
    summary?: string;
    extendedIngredients?: Ingredients[];
}