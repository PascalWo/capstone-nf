import {ShoppingItem} from "../model/ShoppingItem";
import * as AiIcons from "react-icons/ai";
import {useNavigate} from "react-router-dom";

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
            <p className={item.done? "done-item": "undone-item"}>
                {"Item: " + item.name + "Amount: " + item.amount + "Unit: " + item.unit}</p>
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
