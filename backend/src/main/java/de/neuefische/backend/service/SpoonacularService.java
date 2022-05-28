package de.neuefische.backend.service;

import de.neuefische.backend.api.SpoonacularApiService;
import de.neuefische.backend.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpoonacularService {

    private final SpoonacularApiService spoonacularApiService;

    @Autowired
    public SpoonacularService(SpoonacularApiService spoonacularApiService) {
        this.spoonacularApiService = spoonacularApiService;
    }

    public List<Recipe> getAllRecipes(String search){
        return spoonacularApiService.retrieveRecipes(search);
    }

    public Recipe getRecipeDetails(int id){
        return spoonacularApiService.retrieveRecipeDetails(id);
    }
}
