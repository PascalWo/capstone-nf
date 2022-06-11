import {ShoppingItem} from "../model/ShoppingItem";
import "./ShoppingItemCard.css";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import RequireAuth from "../routing/RequireAuth";
import ShoppingItemDetailsPage from "./ShoppingItemDetailsPage";
import {stringify} from "querystring";

type ShoppingItemCardProps = {
    shoppingItem: ShoppingItem
}

export default function ShoppingItemCard({shoppingItem}:ShoppingItemCardProps){
    const {id} = useParams()
    const navigate = useNavigate()

    return (
        <div className={"shopping-item-card"}>
            <div id={"item-container"} onClick={() => navigate(`/shoppingitem/${shoppingItem.id}`,{state: ({shoppingItem: shoppingItem })})}>
                <div id={"name-bulletpoint"}>
                    <div id={"bulletpoint"} ></div>
                    <div id={shoppingItem.done? "done-item": "undone-item"}>{shoppingItem.name}</div>
                </div>
                <div id={shoppingItem.done? "done-item": "undone-item"}>
                    {shoppingItem.amount + "" + shoppingItem.unit}
                </div>
            </div>
            {/*<Routes>*/}
            {/*        <Route path={'/shoppingitem/:id'}*/}
            {/*               element={<ShoppingItemDetailsPage shoppingItem={shoppingItem}/>}/>*/}
            {/*</Routes>*/}
        </div>
    )
}
