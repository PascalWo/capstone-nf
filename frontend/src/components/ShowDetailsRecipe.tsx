import {Recipe} from "../model/Recipe";
import "./ShowDetailsRecipe.css"
import ShowIngredients from "./ShowIngredients";
import ShowRecipeGeneralInfo from "./ShowRecipeGeneralInfo";
import ShowInstructions from "./ShowInstructions";
import ShowEquipment from "./ShowEquipment";
import {useState} from "react";
import AddRecipe from "./AddRecipe";
import ShoppingItemForm from "./ShoppingItemForm";
import useShoppingItems from "../hooks/useShoppingItems";
import * as AiIcons from "react-icons/ai";

type ShowDetailsRecipeProps = {
    recipe: Recipe;
    openedFromSpoonaApi: boolean;
    addRecipeItem?: (newRecipe: Omit<Recipe, "id">) => void
    updateRecipe?: (id: string, updateRecipe: Recipe) => void
}

export default function ShowDetailsRecipe({
                                              recipe,
                                              openedFromSpoonaApi,
                                              addRecipeItem,
                                              updateRecipe
                                          }: ShowDetailsRecipeProps) {
    const {addShoppingItems, addShoppingItemList} = useShoppingItems()
    const [savingEnabled, setSavingEnabled] = useState<boolean>(false);
    const [editingEnabled, setEditingEnabled] = useState<boolean>(false);
    const [cartEnabled, setCartEnabled] = useState(false)


    const toggleSaving = () => {
        setSavingEnabled(!savingEnabled);
    }

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    }

    const toggleCart = () => {
        setCartEnabled(!cartEnabled);
    }

    const deepCloneRecipe = () => {
        return JSON.parse(JSON.stringify(recipe))
    }

    return (
        <div className={"recipe-details"}>
            {!savingEnabled && !editingEnabled && !cartEnabled &&
                <div>
                    <ShowRecipeGeneralInfo recipe={recipe}/>
                    <div id={"recipe-details-buttons"}>
                        {openedFromSpoonaApi &&
                            <AiIcons.AiOutlinePlus
                                onClick={toggleSaving}
                                id={"details-button-symbol"}/>}
                        {!openedFromSpoonaApi &&
                            <AiIcons.AiFillEdit
                                onClick={toggleEditing}
                                id={"details-button-symbol"}/>}
                        <AiIcons.AiFillHeart
                            id={"details-button-symbol"}/>
                        <AiIcons.AiFillShopping
                            onClick={toggleCart}
                            id={"details-button-symbol"}/>
                    </div>
                    <ShowIngredients recipe={recipe}/>
                    <ShowInstructions recipe={recipe}/>
                    <ShowEquipment recipe={recipe}/>
                </div>}
            {savingEnabled &&
                <AddRecipe toggleComponent={toggleSaving} recipe={deepCloneRecipe()} addRecipeItem={addRecipeItem}/>}
            {editingEnabled &&
                <AddRecipe toggleComponent={toggleEditing} recipe={deepCloneRecipe()} updateRecipe={updateRecipe}/>}
            {cartEnabled &&
                <ShoppingItemForm addShoppingItems={addShoppingItems} toggleComponent={toggleCart}
                                  recipe={deepCloneRecipe()} addShoppingItemList={addShoppingItemList}/>}
        </div>
    )
}
