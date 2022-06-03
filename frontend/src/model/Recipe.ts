import {Ingredient} from "./Ingredient";
import {Instruction} from "./Instruction";

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
    extendedIngredients?: Ingredient[];
    instructions?: string;
    analyzedInstructions?: Instruction[];
}
