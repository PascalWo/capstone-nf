import {ChangeEvent, FormEvent, useState} from "react";
import {Recipe} from "../model/Recipe";
import "./AddRecipe.css"
import {InstructionStep} from "../model/InstructionStep";
import {Ingredient} from "../model/Ingredient";
import {Instruction} from "../model/Instruction";

type AddRecipeProps = {
    addRecipeItem: (newRecipe: Omit<Recipe, "id">) => void
    toggleAdding?: () => void
}

export default function AddRecipe({addRecipeItem, toggleAdding}: AddRecipeProps) {
    const [title, setTitle] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [vegan, setVegan] = useState<boolean>(false);
    const [vegetarian, setVegetarian] = useState<boolean>(false);
    const [glutenFree, setGlutenFree] = useState<boolean>(false);
    const [readyInMinutes, setReadyInMinutes] = useState<number>(0);
    const [servings, setServings] = useState<number>(0);
    const [summary, setSummary] = useState<string>("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        {name: "",amount: 0, unit: ""}
    ]);
    const [instructions, setInstructions] = useState<Instruction[]>([
        {name: "",steps: []}
    ]);

    const handleIngredientFormChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        let data: Ingredient[] = [...ingredients];

        // @ts-ignore
        data[index][event.target.name] = event.target.value;
        console.log(data);
        setIngredients(data);

    }
    
    const handleInstructionsFormChange = (event: ChangeEvent<HTMLInputElement>, instructionsIndex: number) => {
        let data: any = [...instructions];

        data[instructionsIndex][event.target.name] = event.target.value;
        setInstructions(data);
    }

    const handleInstructionStepFormChange = (event: ChangeEvent<HTMLInputElement>, instructionIndex: number, stepIndex: number) => {
        let data: any = [...instructions];

        data[instructionIndex].steps[stepIndex][event.target.name] = event.target.value;
        setInstructions(data);
    }

    const addIngredientFields = () => {
        let ingredient: Ingredient = {
            name: "",
            amount: 0,
            unit: "",
        }
        setIngredients([...ingredients, ingredient])
    }

    const addInstructionsFields = () => {
        let instruction: Instruction = {
            name: "",
            steps: [],
        }
        setInstructions([...instructions, instruction])
    }

    const addInstructionStepFields = (index: number) => {
        let instructionStep: InstructionStep = {
            number: 0,
            step: "",
        }
        setInstructions(instructions.map((instruction, i) => {
            if (i === index){
                return {name: instruction.name,
                steps: [...instruction.steps, instructionStep]}
            }else{
                return instruction
            }
        }))
    }

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title) {
            console.error("Title is required");
            return
        }

        const newRecipe: Omit<Recipe, "id"> = {
            title: title,
            image: image,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            readyInMinutes: readyInMinutes,
            servings: servings,
            summary: summary,
            extendedIngredients: ingredients,
            analyzedInstructions: instructions,
        }
        addRecipeItem(newRecipe);
        setTitle("")
        setImage("");
        setVegetarian(false);
        setVegan(false);
        setGlutenFree(false);
        setReadyInMinutes(0);
        setServings(0);
        setSummary("");
        setIngredients([{name: "",amount: 0, unit: ""}]);
        setInstructions([{name: "",steps: []}]);
        if (toggleAdding) {
            toggleAdding();
        }
    }

    const onClickToggleAndGoBack = () => {
        if (toggleAdding) {
            toggleAdding();
        }
    }

    return (
        <div>
            <h1>Hier können Sie ein neues Rezept hinzufügen:</h1>
            <form className={"add-form"} onSubmit={onAdd}>
                <input type={"text"}                       placeholder="Title"
                       value={title}
                       onChange={event => setTitle(event.target.value)}/>
                <input type={"url"}
                       placeholder="Image Source"
                       value={image}
                       onChange={event => setImage(event.target.value)}/>
                Vegetarian:
                <input type={"checkbox"}
                       checked={vegetarian}
                       onChange={event => setVegetarian(event.target.checked)}/>
                Vegan:
                <input type={"checkbox"}
                       checked={vegan}
                       onChange={event => setVegan(event.target.checked)}/>
                GlutenFree:
                <input type={"checkbox"}
                       checked={glutenFree}
                       onChange={event => setGlutenFree(event.target.checked)}/>
                Ready in Minutes:
                <input type={"number"}
                       placeholder="ReadyInMinutes"
                       value={readyInMinutes}
                       onChange={event => setReadyInMinutes(event.target.valueAsNumber)}/>
                Servings:
                <input type={"number"}
                       placeholder="Servings"
                       value={servings}
                       onChange={event => setServings(event.target.valueAsNumber)}/>
                <input type={"text"}
                       placeholder="Summary"
                       value={summary}
                       onChange={event => setSummary(event.target.value)}/>

                Ingredients:
                <div>
                    {ingredients
                        .map((ingredientsInput:Ingredient, index: number) => {
                        return (
                            <div>
                                <input key={"name" + index}
                                       name={"name"}
                                       type={"text"}
                                       placeholder={"name"}
                                       onChange={event => handleIngredientFormChange(event, index)}
                                       value={ingredientsInput.name}/>
                                <input key={"amount" + index}
                                       name={"amount"}
                                       type={"number"}
                                       placeholder={"amount"}
                                       onChange={event => handleIngredientFormChange(event, index)}
                                       value={ingredientsInput.amount}/>
                                <input key={"unit" + index}
                                       name={"unit"}
                                       type={"text"}
                                       placeholder={"unit"}
                                       onChange={event => handleIngredientFormChange(event, index)}
                                       value={ingredientsInput.unit}/>
                            </div>
                        )
                    })}
                    <button
                        type={"button"}
                        onClick={addIngredientFields}>
                        Add More..</button>
                </div>

                Instructions:
               <div>
                    {instructions
                        .map((instructionsInput:Instruction, instructionIndex: number) => {
                        return (
                            <div>
                                <input key={"instructionsName" + instructionIndex}
                                       name={"name"}
                                       type={"text"}
                                       placeholder={"instructionsName"}
                                       onChange={event => handleInstructionsFormChange(event, instructionIndex)}
                                       value={instructionsInput.name}/>
                                {instructionsInput
                                    .steps
                                    .map((instructionsStepInput, stepIndex) => {
                                    return (
                                        <div>
                                            <input key={"stepNumber" + stepIndex}
                                                   name={"number"}
                                                   type={"number"}
                                                   placeholder={"stepNumber"}
                                                   onChange={event => handleInstructionStepFormChange(event, instructionIndex, stepIndex)}
                                                   value={instructionsStepInput.number}/>
                                            <input key={"stepDescription" + stepIndex}
                                                   name={"step"} type={"text"}
                                                   placeholder={"stepDescription"}
                                                   onChange={event => handleInstructionStepFormChange(event, instructionIndex, stepIndex)}
                                                   value={instructionsStepInput.step}/>
                                        </div>
                                    )
                                })}
                                <button type={"button"}
                                        onClick={() => addInstructionStepFields(instructionIndex)}>
                                    Add More InstructionStepFields..</button>
                            </div>)
                    })}

                    <button type={"button"}
                            onClick={addInstructionsFields}>
                        Add More InstructionFields..</button>
                    </div>
                <input type={"submit"}
                       value={"Add item"}/>
            </form>
            <button onClick={onClickToggleAndGoBack}>Back</button>
            <p id={"url-warning"}>*Image Source bitte als Website-Link "https://..." angeben!</p>
        </div>
    )
}
