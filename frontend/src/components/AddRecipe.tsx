import {FormEvent, useState} from "react";
import {Recipe} from "../model/Recipe";
import "./AddRecipe.css"

type AddRecipeProps = {
    addRecipeItem: (newRecipe: Omit<Recipe, "id">) => void
    toggleAdding?: () => void
}

export default function AddRecipe({addRecipeItem, toggleAdding}: AddRecipeProps){
    const [title, setTitle] = useState<string>("")
    const [image, setImage] = useState<string>("")

    const onAdd = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title) {
            console.error("Title is required");
            return
        }
        const newRecipe : Omit<Recipe, "id"> = {
            title : title,
            image: image,
        }
        addRecipeItem(newRecipe);
        console.log(newRecipe)
        setTitle('')
        if (toggleAdding) {
            toggleAdding();
        }
    }

    const onClickToggleAndGoBack = () => {
        if (toggleAdding) {
            toggleAdding();
        }
    }


    return(
        <div>
            <h1>Hier können Sie ein neues Rezept hinzufügen:</h1>
            <form onSubmit={onAdd}>
                <input type={"text"} placeholder="Title" value={title} onChange={event => setTitle(event.target.value)}/>
                <input type={"url"} placeholder="Image Source" value={image} onChange={event => setImage(event.target.value)} />
                <input type={"submit"} value={"Add item"} />
            </form>
            <button onClick={onClickToggleAndGoBack}>Back</button>
            <p id={"url-warning"}>*Image Source bitte als Website-Link "https://..." angeben!</p>
        </div>
    )
}