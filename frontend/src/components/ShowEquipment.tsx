import {Recipe} from "../model/Recipe";
import {SyntheticEvent} from "react";
import recipeDefaultImg from "./recipeimage.jpeg";
import "./ShowEquipment.css"

type ShowEquipmentProps = {
    recipe: Recipe;
}

export default function ShowEquipment({recipe}: ShowEquipmentProps) {
    return (
        <div className={"equipment"}>
            {recipe.analyzedInstructions && recipe.analyzedInstructions
                .map(instructions => (
                    <div>{instructions.steps && instructions.steps
                        .map(steps => (
                            <div id={"equipment-total"}>{steps.equipment && steps.equipment
                                .map(equipment => (
                                    <div id={"equipment-details"}>
                                        <div id={"equipment-name"}>{equipment.name}</div>
                                        {equipment.image
                                            ? <img id={"equipment-image"}
                                                   src={equipment.image}
                                                   onError={(event: SyntheticEvent<HTMLImageElement>) => event.currentTarget.src = recipeDefaultImg}
                                                   alt={"Equipment"}/>
                                            : <img id={"recipe-image"}
                                                   src={recipeDefaultImg}
                                                   alt={"Equipment Default"}/>}
                                    </div>))}
                            </div>))}
                    </div>))}
        </div>
    )
}
