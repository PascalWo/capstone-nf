import {FormEvent, useState} from "react";
import {Recipe} from "../model/Recipe";

type AddRecipeProps = {
    addRecipeItem: (newRecipe: Omit<Recipe, "id">) => void
}

export default function AddRecipe({addRecipeItem}: AddRecipeProps){
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
    }


    return(
        <div>
            Hier können Sie Rezepte hinzufügen!
            <form onSubmit={onAdd}>
                <input type={"text"} placeholder="Title" value={title} onChange={event => setTitle(event.target.value)}/>
                <input type={"url"} placeholder="Image Source" value={image} onChange={event => setImage(event.target.value)} />
                <input type={"submit"} value={"Add item"} />
            </form>
        </div>
    )
}