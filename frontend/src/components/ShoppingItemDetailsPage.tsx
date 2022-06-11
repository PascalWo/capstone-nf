import {ShoppingItem} from "../model/ShoppingItem";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {stringify} from "querystring";
import ShoppingItemForm from "./ShoppingItemForm";
import useShoppingItems from "../hooks/useShoppingItems";
import {useEffect, useState} from "react";
import EditShoppingitemDetails from "./EditShoppingItemDetails";

type ShoppingItemDetailsPageProps = {
    shoppingItem2?: ShoppingItem;
    name2?: string;
}

export default function ShoppingItemDetailsPage({shoppingItem2, name2}: ShoppingItemDetailsPageProps){
    const navigate = useNavigate()
    const {id} = useParams()
    const {addShoppingItems, addShoppingItemList, saveShoppingItem, getAllShoppingItem} = useShoppingItems()

    const [toggleAdding, setToggleAdding] = useState(false  )

    const onClickToggleAdding = () => {
        setToggleAdding(!toggleAdding)
    }

    const {state} = useLocation()
    // @ts-ignore
    const {shoppingItem} = state

    // useEffect(() => {
    //     {shoppingItem}
    //     // eslint-disable-next-line
    // },[])

    // useEffect(shoppingItem)

    useEffect(() => {
    }, [])


    return (
        <div>
            {/*<div>{name}</div>*/}
            {/*<div>{name}</div>*/}
            {!toggleAdding &&
                <div>
                    <button onClick={onClickToggleAdding}>Add ShoppingItem</button>
            Item Details:
                <div>{shoppingItem.name}</div>
                </div>}
            {toggleAdding &&
            // <ShoppingItemForm addShoppingItems={addShoppingItems} toggleComponent={onClickToggleAdding} addShoppingItemList={addShoppingItemList}/>}
                <EditShoppingitemDetails item={shoppingItem} updateShoppingItem={saveShoppingItem} toggleComponent={onClickToggleAdding}/>}
            <button onClick={() => navigate(-1)}>Back </button>
        </div>
    )

}