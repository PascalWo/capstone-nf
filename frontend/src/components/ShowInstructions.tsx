import {Recipe} from "../model/Recipe";
import "./ShowInstructions.css"

type ShowInstructionsProps = {
    recipe: Recipe;
}
export default function ShowInstructions({recipe}: ShowInstructionsProps) {
    return (
        <div className={"instructions"}>
            <div id={"placeholder"}></div>
            {recipe.analyzedInstructions && recipe.analyzedInstructions
                .map((instructions, index) => (
                    <div
                        key={"instruction-details" + index}
                        id={"instruction-details"}>
                        <h2
                            key={"name" + index}
                            id={"instruction-name"}>
                            Instruction: {instructions.name && <h6>{instructions.name}</h6>}
                        </h2>
                        <div
                            key={"steps-all" + index}
                            id={"steps-all"}>
                            {instructions.steps && instructions.steps
                                .map((steps,stepIndex) => (
                                    <div
                                        key={"step-details" + stepIndex}
                                        id={"step-details"}>
                                        <div
                                            key={"step-number" + stepIndex}
                                            id={"step-number"}>{steps.number}
                                        </div>
                                        <div
                                            key={"step-step" + stepIndex}
                                            id={"step-step"}>
                                            {steps.step}
                                        </div>
                                    </div>))}
                        </div>
                    </div>
                ))}
        </div>
    )
}
