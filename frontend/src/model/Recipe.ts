import {Ingredient} from "./Ingredient";
import {Instruction} from "./Instruction";
import {Equipment} from "./Equipment";

export type Recipe = {
    id: string;
    title: string;
    image?: string;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    readyInMinutes: number;
    servings: number;
    summary: string;
    extendedIngredients: Ingredient[];
    instructions?: string;
    analyzedInstructions: Instruction[];
    equipment?: Equipment[];
}
