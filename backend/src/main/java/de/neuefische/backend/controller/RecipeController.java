package de.neuefische.backend.controller;

import de.neuefische.backend.dto.CreateRecipeDto;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<Recipe> getRecipes(){
        return recipeService.getRecipes();
    }

    @PostMapping
    public Recipe addNewRecipe(@RequestBody CreateRecipeDto recipe){
        return recipeService.addNewRecipe(recipe);
    }

    @DeleteMapping("{id}")
    public void deleteRecipe(@PathVariable String id){
        recipeService.deleteRecipe(id);
    }
}
