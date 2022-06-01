import {Recipe} from "../model/Recipe";
import "./ShowInstructions.css"

type ShowInstructionsProps = {
    recipe: Recipe;
}

export default function ShowInstructions({recipe}: ShowInstructionsProps){
    return (
        <div className={"instructions"}>
            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions
                .map(instructions => (
                    <div key={instructions.name}>Instructions Name: {instructions.name}</div>))}
            </div>
            <div className={"steps-total"}>
                <div
                    className={"step-numbers"}>{recipe.analyzedInstructions && recipe.analyzedInstructions
                    .map(instructions => (
                        <div>{instructions.steps
                            .map(steps => (<div>Step Number: {steps.number}</div>))}
                        </div>))}
                </div>
                <div
                    className={"steps"}>{recipe.analyzedInstructions && recipe.analyzedInstructions
                    .map(instructions => (
                        <div>{instructions.steps
                            .map(steps => (<div>Step: {steps.step}</div>))}
                        </div>))}
                </div>
            </div>
        </div>
    )
}