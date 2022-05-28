package de.neuefische.backend.controller;

import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.service.SpoonacularService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/spoonacular/recipes")
public class SpoonacularApiController {

    private final SpoonacularService service;

    @Autowired
    public SpoonacularApiController(SpoonacularService spoonacularService) {
        this.service = spoonacularService;
    }

    @GetMapping("{search}")
    public List<Recipe> getAllRecipes(@PathVariable String search) {
        return service.getAllRecipes(search);
    }

    @GetMapping("/information/{id}")
    public Recipe getRecipeDetails(@PathVariable int id) {
        return service.getRecipeDetails(id);
    }
}
