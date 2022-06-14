import useShoppingItems from "../hooks/useShoppingItems";
import ShoppingItemsOverview from "../components/ShoppingItemsOverview";
import {useState} from "react";
import ShoppingItemForm from "../components/ShoppingItemForm";

export default function ShoppingListPage(){
    const {shoppingItems, addShoppingItems, addShoppingItemList, saveShoppingItem, deleteShoppingItem} = useShoppingItems()
    const [toggleAdding, setToggleAdding] = useState(false  )

    const onClickToggleAdding = () => {
        setToggleAdding(!toggleAdding)
    }

    return (
        <div>
            {!toggleAdding &&
                <ShoppingItemsOverview
                    shoppingItems={shoppingItems}
                    saveShoppingItem={saveShoppingItem}
                    deleteShoppingItem={deleteShoppingItem}
                    toggleAdding={onClickToggleAdding}/>}
            {toggleAdding &&
            <ShoppingItemForm
                addShoppingItems={addShoppingItems}
                toggleComponent={onClickToggleAdding}
                addShoppingItemList={addShoppingItemList}/>}
        </div>
    )
}
