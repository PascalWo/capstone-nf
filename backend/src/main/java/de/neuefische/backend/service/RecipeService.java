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
        if(recipe.getTitle() == null || recipe.getTitle().equals("")){
            throw new IllegalArgumentException("Title of the new Recipe was not given");
        }
        Recipe newRecipe = createRecipeFromDto(recipe);

        return recipeRepo.insert(newRecipe);
    }

    public void deleteRecipe(String id) {
        recipeRepo.deleteById(id);
    }

    public Recipe getRecipeDetails(String id){
        return recipeRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Recipe not found with id: " + id));
    }

    public Recipe updateRecipeByID(String id, CreateRecipeDto updatedRecipe) {
        if(!recipeRepo.existsById(id)){
            throw new NoSuchElementException("Recipe with ID: " + id + "does not exist!");
        }
        if (updatedRecipe.getTitle() == null || updatedRecipe.getTitle().equals("")){
            throw new IllegalArgumentException("Recipe Title does not be empty!");
        }

        Recipe saveRecipe = createRecipeFromDto(updatedRecipe);
        saveRecipe.setId(id);

        return recipeRepo.save(saveRecipe);
    }

    public Recipe createRecipeFromDto(CreateRecipeDto recipeDto){
        Recipe recipe = new Recipe();

        recipe.setTitle(recipeDto.getTitle());
        recipe.setImage(recipeDto.getImage());
        recipe.setVegetarian(recipeDto.isVegetarian());
        recipe.setVegan(recipeDto.isVegan());
        recipe.setGlutenFree(recipeDto.isGlutenFree());
        recipe.setReadyInMinutes(recipeDto.getReadyInMinutes());
        recipe.setServings(recipeDto.getServings());
        recipe.setSummary(recipeDto.getSummary());
        recipe.setExtendedIngredients(recipeDto.getExtendedIngredients());
        recipe.setAnalyzedInstructions(recipeDto.getAnalyzedInstructions());
        recipe.setEquipment(recipeDto.getEquipment());

        return recipe;
    }
}
