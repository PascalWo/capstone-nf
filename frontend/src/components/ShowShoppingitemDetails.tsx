import {ShoppingItem} from "../model/ShoppingItem";
import * as AiIcons from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import "./ShowShoppingItemDetails.css";

type ShowShoppingItemDetailsProps = {
    item: ShoppingItem
    toggleEditing: () => void
    deleteShoppingItem : (id : string) => void
}

export default function ShowShoppingItemDetails({item, toggleEditing,deleteShoppingItem} : ShowShoppingItemDetailsProps){
    const navigate =useNavigate()

    const deleteAndGoBack = () => {
        deleteShoppingItem(item.id)
        navigate(-1)
    }

    return(
        <div className={"show-shopping-item-details"}>
            <div id={item.done? "done-item-details": "undone-item-details"}>
                <label id={"item-details-properties"}> Item
                <div id={"item-details-value"}>{item.name}</div>
                </label>
                <label id={"item-details-properties"}> Amount
                    <div id={"item-details-value"}>{item.amount}</div>
                </label>
                <label id={"item-details-properties"}> Unit
                    <div id={"item-details-value"}>{item.unit}</div>
                </label>
            </div>
           <div id={"shopping-details-button"}>
               <AiIcons.AiFillLeftCircle
                   id={"details-button-symbol"}
                   onClick={() => navigate(-1) }/>
               <AiIcons.AiFillEdit
                id={"details-button-symbol"}
                onClick={toggleEditing}/>
               <AiIcons.AiFillDelete
                   id={"details-button-symbol"}
                   onClick={deleteAndGoBack}/>
           </div>
        </div>
    )
}
