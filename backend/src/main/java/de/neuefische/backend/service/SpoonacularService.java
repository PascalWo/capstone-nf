package de.neuefische.backend.service;

import de.neuefische.backend.api.SpoonacularApiService;
import de.neuefische.backend.model.Equipment;
import de.neuefische.backend.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        Recipe recipe = spoonacularApiService.retrieveRecipeDetails(id);
        recipe.getAnalyzedInstructions()
                .forEach(instruction -> instruction
                        .getSteps()
                        .forEach(instructionStep -> instructionStep
                                .getEquipment()
                                .forEach(equipment -> equipment
                                        .setImage("https://spoonacular.com/cdn/equipment_100x100/" + equipment
                                                .getImage()))));

        ArrayList<Equipment> equipmentList = new ArrayList<>();
        recipe.getAnalyzedInstructions()
                .forEach(instruction -> instruction
                        .getSteps()
                        .forEach(instructionStep -> instructionStep
                                .getEquipment()
                                .forEach(equipment -> equipmentList.add(equipment))));

        System.out.println(equipmentList);

         ArrayList<Equipment> newList = new ArrayList<>();
        for (Equipment equipment: equipmentList) {
            if (!newList.contains(equipment)){
                newList.add(equipment);
            }
        }
        System.out.println(newList);
        recipe.setEquipment(newList);

        System.out.println(recipe);

        return recipe;
    }
}
