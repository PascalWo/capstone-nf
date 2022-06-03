import {Ingredient} from "./Ingredient";
import {Equipment} from "./Equipment";

export type InstructionStep = {
    number: number;
    step: string;
    ingredients?: Ingredient[];
    equipment?: Equipment[];
}
