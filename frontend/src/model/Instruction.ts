import {InstructionStep} from "./InstructionStep";

export type Instruction = {
    name: string;
    steps: InstructionStep[];
}
