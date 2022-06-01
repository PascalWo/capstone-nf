import {Recipe} from "../model/Recipe";
import "./ShowInstructions.css"

type ShowInstructionsProps = {
    recipe: Recipe;
}
export default function ShowInstructions({recipe}: ShowInstructionsProps) {
    return (
        <div className={"instructions"}>
            {recipe.analyzedInstructions && recipe.analyzedInstructions
                .map(instructions => (
                    <div id={"instruction-details"}>
                        <div id={"instruction-name"}> Anleitung:{instructions.name}</div>
                        <div id={"steps-all"}>{instructions.steps.map(steps => (
                            <div id={"step-details"}>
                                <div id={"step-number"}>{steps.number}</div>
                                <div id={"step-step"}>{steps.step}</div>
                            </div>))}
                        </div>
                    </div>
                ))}
        </div>
    )
}