import {ChangeEvent, FormEvent, useState} from "react";
import {Recipe} from "../model/Recipe";
import "./AddRecipe.css"
import {InstructionStep} from "../model/InstructionStep";
import {Ingredient} from "../model/Ingredient";
import {Instruction} from "../model/Instruction";
import * as AiIcons from "react-icons/ai";

type AddRecipeProps = {
    addRecipeItem?: (newRecipe: Omit<Recipe, "id">) => void
    toggleComponent?: () => void
    recipe?: Recipe
    updateRecipe?: (id: string, updateRecipe: Recipe) => void
}

export default function AddRecipe({addRecipeItem, updateRecipe, toggleComponent, recipe}: AddRecipeProps) {
    const [title, setTitle] = useState<string>(recipe ? recipe.title : "");
    const [image, setImage] = useState<string>(recipe && recipe.image ? recipe.image : "");
    const [vegan, setVegan] = useState<boolean>(recipe ? recipe.vegan : false);
    const [vegetarian, setVegetarian] = useState<boolean>(recipe ? recipe.vegetarian : false);
    const [glutenFree, setGlutenFree] = useState<boolean>(recipe ? recipe.glutenFree : false);
    const [readyInMinutes, setReadyInMinutes] = useState<number>(recipe ? recipe.readyInMinutes : 0);
    const [servings, setServings] = useState<number>(recipe ? recipe.servings : 0);
    const [summary, setSummary] = useState<string>(recipe ? recipe.summary : "");
    const [ingredients, setIngredients] = useState<Ingredient[]>(recipe ? recipe.extendedIngredients : [
        {name: "", amount: 0, unit: ""}
    ]);
    const [instructions, setInstructions] = useState<Instruction[]>(recipe ? recipe.analyzedInstructions : [
        {name: "", steps: []}
    ]);

    const handleIngredientFormChange = (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>, index: number) => {
        let data: Ingredient[] = [...ingredients];

        // @ts-ignore
        data[index][event.target.name] = event.target.value;
        console.log(data);
        setIngredients(data);
    }

    const handleInstructionsFormChange = (event: ChangeEvent<HTMLInputElement>, instructionsIndex: number) => {
        let data: Instruction[] = [...instructions];

        // @ts-ignore
        data[instructionsIndex][event.target.name] = event.target.value;
        setInstructions(data);
    }

    const handleInstructionStepFormChange = (event: ChangeEvent<HTMLInputElement>, instructionIndex: number, stepIndex: number) => {
        let data: Instruction[] = [...instructions];

        // @ts-ignore
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
            number: 1,
            step: "",
        }
        setInstructions(instructions.map((instruction, i) => {
            if (i === index) {
                return {
                    name: instruction.name,
                    steps: [...instruction.steps, instructionStep]
                }
            } else {
                return instruction
            }
        }))
    }

    const removeIngredientField = (index: number) => {
        let data: Ingredient[] = [...ingredients];
        data.splice(index, 1)
        setIngredients(data)
    }

    const removeInstructionStepField = (instructionIndex: number, stepIndex: number) => {
        let data: Instruction[] = [...instructions];
        data[instructionIndex].steps.splice(stepIndex, 1)
        setInstructions(data)
    }

    const removeInstructionField = (instructionIndex: number) => {
        let data: Instruction[] = [...instructions];
        data.splice(instructionIndex, 1)
        setInstructions(data)
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
            equipment: recipe && recipe.equipment
        }
        addRecipeItem &&
        addRecipeItem(newRecipe);
        setTitle("")
        setImage("");
        setVegetarian(false);
        setVegan(false);
        setGlutenFree(false);
        setReadyInMinutes(0);
        setServings(0);
        setSummary("");
        setIngredients([{name: "", amount: 0, unit: ""}]);
        setInstructions([{name: "", steps: []}]);
        toggleComponent && toggleComponent();

        const updatedRecipe: Recipe = {
            id: recipe ? recipe.id : "",
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
            equipment: recipe && recipe.equipment
        }
        updateRecipe &&
        updateRecipe(updatedRecipe.id, updatedRecipe)
    }

    const onClickToggleAndGoBack = () => {
        toggleComponent && toggleComponent();
    }

    return (
        <div className={"save-recipe-form"}>
            <h1 id={"recipe-form-title"}>Save Recipe</h1>
            <form id={"recipe-form"} onSubmit={onAdd}>
                <label>
                    Title
                    <input id={"recipe-form-text"}
                           type={"text"}
                           placeholder="Title"
                           value={title}
                           onChange={event => setTitle(event.target.value)}/>
                </label>
                <label>
                    Image
                    <input id={"recipe-form-text"}
                           type={"url"}
                           placeholder="Image Source"
                           value={image}
                           onChange={event => setImage(event.target.value)}/>
                </label>
                <div id={"recipe-label-checkbox"}>
                    <div>Vegetarian</div>
                    <input id={"recipe-form-box"}
                           type={"checkbox"}
                           checked={vegetarian}
                           onChange={event => setVegetarian(event.target.checked)}
                           style={{
                               backgroundColor: "#00e676"
                           }}/>
                </div>
                <div id={"recipe-label-checkbox"}>
                    <div>Vegan</div>
                    <input type={"checkbox"}
                           checked={vegan}
                           onChange={event => setVegan(event.target.checked)}/>
                </div>
                <div id={"recipe-label-checkbox"}>
                    <div>GlutenFree</div>
                    <input type={"checkbox"}
                           checked={glutenFree}
                           onChange={event => setGlutenFree(event.target.checked)}/>
                </div>
                <label>
                    Ready in Minutes
                    <select id={"recipe-form-number"}
                            name={"readyInMinutes"}
                            value={readyInMinutes}
                            onChange={event => setReadyInMinutes(Number(event.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={30}>30</option>
                        <option value={35}>35</option>
                        <option value={45}>45</option>
                        <option value={50}>50</option>
                        <option value={55}>55</option>
                        <option value={60}>60</option>
                        <option value={90}>90</option>
                    </select>
                </label>
                <label>
                    Servings
                    <select id={"recipe-form-number"}
                            name={"servings"}
                            value={servings}
                            onChange={event => setServings(Number(event.target.value))}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </label>
                <label>
                    Summary
                    <textarea id={"recipe-form-text"}
                              key={"summary"}
                              placeholder="Summary"
                              value={summary}
                              onChange={event => setSummary(event.target.value)}/>
                </label>
                <label>
                    Ingredients
                    <div>
                        {ingredients
                            .map((ingredientsInput: Ingredient, index: number) => {
                                return (
                                    <div id={"recipe-form-ingredients"}>
                                        <div id={"recipe-form-ingredients-without-button"}>
                                            <input id={"recipe-form-text"}
                                                   key={"name" + index}
                                                   name={"name"}
                                                   type={"text"}
                                                   placeholder={"name"}
                                                   onChange={event => handleIngredientFormChange(event, index)}
                                                   value={ingredientsInput.name}/>
                                            <div id={"recipe-form-amount-unit"}>
                                                <input id={"recipe-form-number"}
                                                       key={"amount" + index}
                                                       name={"amount"}
                                                       type={"number"}
                                                       placeholder={"amount"}
                                                       onChange={event => handleIngredientFormChange(event, index)}
                                                       value={ingredientsInput.amount}
                                                />
                                                <select id={"recipe-form-unit"}
                                                        key={"unit" + index}
                                                        name={"unit"}
                                                        value={ingredientsInput.unit}
                                                        onChange={event => handleIngredientFormChange(event, index)}>
                                                    <option value={"stk"}>stk</option>
                                                    <option value={"g"}>g</option>
                                                    <option value={"kg"}>kg</option>
                                                    <option value={"ml"}>ml</option>
                                                    <option value={"l"}>l</option>
                                                    <option value={"tl"}>tl</option>
                                                    <option value={"el"}>el</option>
                                                    <option value={"pr"}>pr</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type={"button"}
                                                id={"form-delete-input-button"}
                                                key={"remove" + index}
                                                onClick={() => removeIngredientField(index)}>
                                            <AiIcons.AiFillDelete/>
                                        </button>
                                    </div>
                                )
                            })}
                        <div
                            id={"button-icon-box"}>
                            <button type={"button"}
                                    id={"form-add-input-button"}
                                    key={"add-ingredient"}
                                    onClick={addIngredientFields}>
                                <AiIcons.AiFillPlusCircle/>
                            </button>
                        </div>
                    </div>
                </label>
                <label>
                    Instructions
                    <div>
                        {instructions
                            .map((instructionsInput: Instruction, instructionIndex: number) => {
                                return (
                                    <div id={"instructions-form"}>
                                        <input id={"instruction-form-text"}
                                               key={"instructionsName" + instructionIndex}
                                               name={"name"}
                                               type={"text"}
                                               placeholder={"instructionsName"}
                                               onChange={event => handleInstructionsFormChange(event, instructionIndex)}
                                               value={instructionsInput.name}/>
                                        {instructionsInput
                                            .steps
                                            .map((instructionsStepInput, stepIndex) => {
                                                return (
                                                    <div id={"instruction-step-form"}
                                                         key={"step" + stepIndex}>
                                                        <div id={"instruction-step-form-without-button"}>
                                                            <input id={"instruction-step-form-number"}
                                                                   key={"stepNumber" + stepIndex}
                                                                   name={"number"}
                                                                   type={"number"}
                                                                   placeholder={"stepNumber"}
                                                                   onChange={event => handleInstructionStepFormChange(event, instructionIndex, stepIndex)}
                                                                   value={instructionsStepInput.number}/>
                                                            <input id={"instruction-step-form-text"}
                                                                   key={"stepDescription" + stepIndex}
                                                                   name={"step"}
                                                                   type={"text"}
                                                                   placeholder={"stepDescription"}
                                                                   onChange={event => handleInstructionStepFormChange(event, instructionIndex, stepIndex)}
                                                                   value={instructionsStepInput.step}/>
                                                        </div>
                                                        <button key={"removeButton" + stepIndex}
                                                                type={"button"}
                                                                id={"form-delete-input-button"}
                                                                onClick={() => removeInstructionStepField(instructionIndex, stepIndex)}>
                                                            <AiIcons.AiFillDelete/>
                                                        </button>

                                                    </div>
                                                )
                                            })}
                                        <div id={"instruction-step-button-container"}>
                                            <button id={"form-add-input-button"}
                                                    type={"button"}
                                                    key={"add-step-field" + instructionIndex}
                                                    onClick={() => addInstructionStepFields(instructionIndex)}>
                                                <AiIcons.AiFillPlusCircle/>
                                            </button>
                                            <button key={"removeButton" + instructionIndex}
                                                    type={"button"}
                                                    id={"form-delete-input-button"}
                                                    onClick={() => removeInstructionField(instructionIndex)}>
                                                <AiIcons.AiFillDelete/>
                                            </button>
                                        </div>
                                    </div>)
                            })}
                        <div id={"instruction-step-button-container"}>
                            <button id={"recipe-form-add-instruction-button"}
                                    type={"button"}
                                    key={"add-instruction"}
                                    onClick={addInstructionsFields}>
                                New Instruction
                            </button>
                        </div>
                    </div>
                </label>
                <div id={"submit-button-container"}>
                    {addRecipeItem &&
                        <button id={"recipe-form-submit-button"}
                                type={"submit"}>
                            ADD RECIPE
                        </button>}
                    {updateRecipe &&
                        <button id={"recipe-form-submit-button"}
                                type={"submit"}>
                            EDIT RECIPE
                        </button>}
                    <AiIcons.AiFillLeftCircle
                        id={"details-button-symbol"}
                        onClick={onClickToggleAndGoBack}/>
                </div>
            </form>
        </div>
    )
}
