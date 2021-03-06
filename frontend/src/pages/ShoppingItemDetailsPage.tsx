import {ShoppingItem} from "../model/ShoppingItem";
import {useParams} from "react-router-dom";
import useShoppingItems from "../hooks/useShoppingItems";
import {useEffect, useState} from "react";
import EditShoppingItemDetails from "../components/EditShoppingItemDetails";
import useDetailedShoppingItem from "../hooks/useDetailedShoppingItem";
import ShowShoppingItemDetails from "../components/ShowShoppingitemDetails";

export default function ShoppingItemDetailsPage() {
    const {id} = useParams()
    const {saveShoppingItem, deleteShoppingItem} = useShoppingItems()
    const {detailedShoppingItem, getShoppingItemById, setDetailedShoppingItem} = useDetailedShoppingItem()
    const [editingEnabled, setEditingEnabled] = useState(false)

    useEffect(() => {
        if (id) {
            getShoppingItemById(id)
        }
        // eslint-disable-next-line
    }, [id])

    const onClickToggleEditing = () => {
        setEditingEnabled(!editingEnabled)
    }

    const updateDetailedShoppingItem = (updatedShoppingItem: ShoppingItem) => {
        saveShoppingItem(updatedShoppingItem.id, updatedShoppingItem)
            .then(() => setDetailedShoppingItem(updatedShoppingItem))
            .then(() => onClickToggleEditing())
    }

    return (
        <div className={"shopping-item-details"}>
            {detailedShoppingItem &&
                <div>
                    {editingEnabled
                        ? <EditShoppingItemDetails
                            item={detailedShoppingItem}
                            updateShoppingItem={updateDetailedShoppingItem}
                            toggleComponent={onClickToggleEditing}/>
                        : <ShowShoppingItemDetails
                            item={detailedShoppingItem}
                            toggleEditing={onClickToggleEditing}
                        deleteShoppingItem={deleteShoppingItem}/>}
                </div>}
        </div>
    )
}
