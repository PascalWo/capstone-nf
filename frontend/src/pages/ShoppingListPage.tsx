import useShoppingItems from "../hooks/useShoppingItems";
import ShoppingItemsOverview from "../components/ShoppingItemsOverview";
import {useState} from "react";
import ShoppingItemForm from "../components/ShoppingItemForm";

export default function ShoppingListPage(){
    const {shoppingItems, addShoppingItems} = useShoppingItems()
    const [toggleAdding, setToggleAdding] = useState(false  )
    
    const onClickToggleAdding = () => {
        setToggleAdding(!toggleAdding)
    }

    return (
        <div>
            <p>Hier stehen Ihre ShoppingItems</p>
            {!toggleAdding &&
                <div>
                <button onClick={onClickToggleAdding}>Add ShoppingItem</button>
                <ShoppingItemsOverview shoppingItems={shoppingItems}/>
                </div>}
            {toggleAdding &&
            <ShoppingItemForm addShoppingItems={addShoppingItems} toggleComponent={onClickToggleAdding}/>}
        </div>
    )
}
