import {Ingredients} from "./Ingredients";
import {Equipment} from "./Equipment";

export type InstructionStep = {
    number: number;
    step: string;
    ingredients: Ingredients[];
    equipment: Equipment[];
}
