import {FormEvent, useState} from "react";
import {Recipe} from "../model/Recipe";
import "./AddRecipe.css"
import {Ingredients} from "../model/Ingredients";
import {Instructions} from "../model/Instructions";
import {InstructionStep} from "../model/InstructionStep";

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
    const [ingredients, setIngredients] = useState<Ingredients[]>([
        {name: "",amount: 0, unit: ""}
    ]);
    const [instructionsName, setInstructionsName] = useState<string>("");
    const [instructionSteps, setInstructionSteps] = useState<InstructionStep[]>([
        {number: 0, step: ""}
    ])
    const [instructions, setInstructions] = useState<Instructions[]>([
        {name: "",steps: []}
    ]);

    const handleIngredientFormChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let data: any = [...ingredients];

        data[index][event.target.name] = event.target.value;
        console.log(data);
        setIngredients(data);
    }
    const handleInstructionsFormChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let data: any = [...instructions];

        data[index][event.target.name] = event.target.value;
        console.log(data);
        setInstructions(data);
    }

    const handleInstructionStepFormChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let data: any = [...instructionSteps];

        data[index][event.target.name] = event.target.value;
        console.log(data);
        setInstructionSteps(data);
    }

    const addIngredientFields = () => {
        let ingredient: Ingredients = {
            name: "",
            amount: 0,
            unit: "",
        }
        setIngredients([...ingredients, ingredient])
    }

    const addInstructionsFields = () => {
        let instruction: Instructions = {
            name: "",
            steps: [],
        }
        setInstructions([...instructions, instruction])
    }

    // const addInstructionsFields = () => {
    //     let instructionStep: InstructionStep = {
    //         number: 0,
    //         step: "",
    //     }
    //     let instructionName: String = "";
    //     let instruction: Instructions = {
    //         name: "",
    //         steps: [],
    //     }
    //
    //     setInstructionsName("")
    //     setInstructions([...instructions,instruction])
    //     // setInstructionSteps([...instructionSteps, instructionStep])
    // }

    const addInstructionStepFields = () => {
        let instructionStep: InstructionStep = {
            number: 0,
            step: "",
        }
        setInstructionSteps([...instructionSteps, instructionStep])
    }

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title) {
            console.error("Title is required");
            return
        }

        const newInstructions: Instructions = {
            name: instructionsName,
            steps: instructionSteps,
        }
        console.log(newInstructions)
        // setInstructions([newInstructions])

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
            analyzedInstructions: [newInstructions],



        }
        console.log(newRecipe);
        addRecipeItem(newRecipe);
        console.log(newRecipe)
        setTitle('')
        setIngredients([{name: "",amount: 0, unit: ""}])
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
                <input type={"text"} placeholder="Title" value={title}
                       onChange={event => setTitle(event.target.value)}/>
                <input type={"url"} placeholder="Image Source" value={image}
                       onChange={event => setImage(event.target.value)}/>
                Vegetarian:
                <input type={"checkbox"} checked={vegetarian}
                       onChange={event => setVegetarian(event.target.checked)}/>
                Vegan:
                <input type={"checkbox"} checked={vegan}
                       onChange={event => setVegan(event.target.checked)}/>
                GlutenFree:
                <input type={"checkbox"} checked={glutenFree}
                       onChange={event => setGlutenFree(event.target.checked)}/>
                Ready in Minutes:
                <input type={"number"} placeholder="ReadyInMinutes" value={readyInMinutes}
                       onChange={event => setReadyInMinutes(event.target.valueAsNumber)}/>
                Servings:
                <input type={"number"} placeholder="Servings" value={servings}
                       onChange={event => setServings(event.target.valueAsNumber)}/>
                <input type={"text"} placeholder="Summary" value={summary}
                       onChange={event => setSummary(event.target.value)}/>


                Ingredients:
                <div>
                    {ingredients.map((ingredientsInput:Ingredients, index: number) => {
                        return (
                            <div>
                                <input key={"name" + index} name={"name"} type={"text"} placeholder={"name"}
                                       onChange={event => handleIngredientFormChange(event, index)} value={ingredientsInput.name}/>
                                <input key={"amount" + index} name={"amount"} type={"number"} placeholder={"amount"}
                                       onChange={event => handleIngredientFormChange(event, index)} value={ingredientsInput.amount}/>
                                <input key={"unit" + index} name={"unit"} type={"text"} placeholder={"unit"}
                                       onChange={event => handleIngredientFormChange(event, index)} value={ingredientsInput.unit}/>
                            </div>
                        )
                    })}
                    <button type={"button"} onClick={addIngredientFields}>Add More..</button>
                </div>

                Instructions:
                <div>
                    {instructions.map((instructionsInput:Instructions, index: number) => {
                        return (
                        <div>
                                <input key={"instructionsName2" + index} name={"instructionsName2"} type={"text"} placeholder="InstructionsName2" value={instructionsName}
                                       onChange={event => setInstructionsName(event.target.value)}/>
                                <div>
                                    <input key={"instructionsName3" + index} name={"instructionsName3"} type={"text"} placeholder="InstructionsName3" value={instructionsName}
                                           onChange={event => setInstructionsName(event.target.value)}/>
                                    {instructionSteps.map((instructionStepInput:InstructionStep, stepIndex:number) => {
                                        return (
                                            <div>
                                                <input key={"number" + stepIndex} name={"number"} type={"number"} placeholder={"number"}
                                                       onChange={event => handleInstructionStepFormChange(event, stepIndex)} value={instructionStepInput.number} />
                                                <input key={"step" + stepIndex} name={"step"} type={"text"} placeholder={"step"}
                                                       onChange={event => handleInstructionStepFormChange(event, stepIndex)} value={instructionStepInput.step}/>
                                            </div>
                                        )
                                    })}
                                    <button type={"button"} onClick={addInstructionStepFields}>Add More InstructionSteps..</button>
                                </div>

                            </div>
                        )
                    })}

                    <button type={"button"} onClick={addInstructionsFields}>Add More InstructionFields..</button>
                </div>













                {/*Instructions:*/}
                {/*<div>*/}
                {/*    {instructions.map((instructionsInput:Instructions, index: number) => {*/}
                {/*        return (*/}
                {/*            <div>*/}
                {/*                <input key={"name" + index} name={"name"} type={"text"} placeholder={"name"}*/}
                {/*                       onChange={event => handleInstructionsFormChange(event, index)} value={instructionsInput.name}/>*/}
                {/*                <input key={"steps" + index} name={"steps"} type={"text"} placeholder={"steps"}*/}
                {/*                       onChange={event => handleInstructionsFormChange(event, index)} value={instructionsInput.steps}/>*/}
                {/*                <div>*/}
                {/*                    {instructionSteps.map((instructionStepInput:InstructionStep, index:number) => {*/}
                {/*                        return (*/}
                {/*                            <div>*/}
                {/*                                <input key={"number" + index} name={"number"} type={"number"} placeholder={"number"}*/}
                {/*                                       onChange={event => handleInstructionStepFormChange(event, index)} value={instructionStepInput.number} />*/}
                {/*                                <input key={"step" + index} name={"step"} type={"text"} placeholder={"step"}*/}
                {/*                                       onChange={event => handleInstructionStepFormChange(event, index)} value={instructionStepInput.step}/>*/}
                {/*                            </div>*/}
                {/*                        )*/}
                {/*                    })}*/}
                {/*                    <button type={"button"} onClick={addInstructionStepFields}>Add More..</button>*/}
                {/*                </div>*/}

                {/*            </div>*/}
                {/*        )*/}
                {/*    })}*/}
                {/*    <button type={"button"} onClick={addInstructionsFields}>Add More..</button>*/}
                {/*</div>*/}



                <input type={"submit"} value={"Add item"}/>
            </form>
            <button onClick={onClickToggleAndGoBack}>Back</button>
            <p id={"url-warning"}>*Image Source bitte als Website-Link "https://..." angeben!</p>
        </div>
    )
}
