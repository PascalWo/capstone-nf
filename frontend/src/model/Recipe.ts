import {Ingredients} from "./Ingredients";
import {Instructions} from "./Instructions";

export type Recipe = {
    id: string;
    title: string;
    image?: string;
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    readyInMinutes?: number;
    servings?: number;
    summary?: string;
    extendedIngredients?: Ingredients[];
    instructions?: string;
    analyzedInstructions?: Instructions[];
}