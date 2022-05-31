import {Recipe} from "../model/Recipe";
import "./ShowInstructions.css"

type ShowInstructionsProps = {
    recipe: Recipe;
}

export default function ShowInstructions({recipe}: ShowInstructionsProps){
    return  (
        <div className={"instructions"}>
            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                <div key={instructions.name}>Instructions Name: {instructions.name}</div>))}</div>

            <div className={"steps-total"}>
                <div
                    className={"step-numbers"}>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                    <div>{instructions.steps.map(steps => (<div>Step Number: {steps.number}</div>))}</div>))}</div>
                <div
                    className={"steps"}>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                    <div>{instructions.steps.map(steps => (<div>Step: {steps.step}</div>))}</div>))}</div>

            </div>

            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                <div>Ingredient Id:{instructions.steps.map(steps => (<div>{steps.ingredients.map(ingredients => (<div>{ingredients.id}</div>))}</div>))}</div>))}</div>
            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                <div>Ingredient Name: {instructions.steps.map(steps => (<div>{steps.ingredients.map(ingredients => (<div>{ingredients.name}</div>))}</div>))}</div>))}</div>
            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                <div>Ingredient Image:{instructions.steps.map(steps => (<div>{steps.ingredients.map(ingredients => (<div>{ingredients.image}</div>))}</div>))}</div>))}</div>

            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                <div>Equipment Id:{instructions.steps.map(steps => (<div>{steps.equipment.map(equipment => (<div>{equipment.id}</div>))}</div>))}</div>))}</div>
            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                <div>Equipment name:{instructions.steps.map(steps => (<div>{steps.equipment.map(equipment => (<div>{equipment.name}</div>))}</div>))}</div>))}</div>
            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                <div>Equipment Image:{instructions.steps.map(steps => (<div>{steps.equipment.map(equipment => (<div>{equipment.image}</div>))}</div>))}</div>))}</div>

            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                <div>Temperature Number:{instructions.steps.map(steps => (<div>{steps.equipment.map(equipment => (<div>{equipment.temperature && equipment.temperature.number}</div>))}</div>))}</div>))}</div>
            <div>{recipe.analyzedInstructions && recipe.analyzedInstructions.map(instructions => (
                <div>Temperature Unit:{instructions.steps.map(steps => (<div>{steps.equipment.map(equipment => (<div>{equipment.temperature && equipment.temperature.unit}</div>))}</div>))}</div>))}</div>


        </div>
    )
}