import useShoppingItems from "../hooks/useShoppingItems";
import ShoppingItemsOverview from "../components/ShoppingItemsOverview";

export default function ShoppingListPage(){
    const {shoppingItems} = useShoppingItems()

    return (
        <div>
        <p>Hier stehen Ihre ShoppingItems</p>
        <ShoppingItemsOverview shoppingItems={shoppingItems}/>
        </div>
    )
}
