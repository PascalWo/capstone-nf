package de.neuefische.backend.service;

import de.neuefische.backend.dto.CreateRecipeDto;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.repository.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class RecipeService {

    private final RecipeRepo recipeRepo;

    @Autowired
    public RecipeService(RecipeRepo recipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    public List<Recipe> getRecipes(){
        return recipeRepo.findAll();
    }

    public Recipe addNewRecipe(CreateRecipeDto recipe){
        Recipe newRecipe = new Recipe();
        if(recipe.getTitle() == null){
            throw new IllegalArgumentException("Title of the new Recipe was not given");
        }
        newRecipe.setTitle(recipe.getTitle());
        newRecipe.setImage(recipe.getImage());
        newRecipe.setVegetarian(recipe.isVegetarian());
        newRecipe.setVegan(recipe.isVegan());
        newRecipe.setGlutenFree(recipe.isGlutenFree());
        newRecipe.setReadyInMinutes(recipe.getReadyInMinutes());
        newRecipe.setServings(recipe.getServings());
        newRecipe.setSummary(recipe.getSummary());

        return recipeRepo.insert(newRecipe);
    }

    public void deleteRecipe(String id) {
        recipeRepo.deleteById(id);
    }

    public Recipe getRecipeDetails(String id){
        return recipeRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Recipe not found with id: " + id));
    }
}
