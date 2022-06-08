package de.neuefische.backend.service;

import de.neuefische.backend.api.SpoonacularApiService;
import de.neuefische.backend.model.*;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SpoonacularServiceTest {

    private final SpoonacularApiService apiService = mock(SpoonacularApiService.class);
    private final SpoonacularService spoonacularService = new SpoonacularService(apiService);

    Ingredient ingredient1 = Ingredient.builder()
            .name("Pasta")
            .amount(500)
            .unit("pound")
            .build();
    Ingredient ingredient2 = Ingredient.builder()
            .name("Tomato")
            .amount(3)
            .unit("Stk.")
            .build();

    Equipment equipment1 = Equipment.builder()
            .id(1)
            .name("oven")
            .image("oven-image")
            .build();
    Equipment equipment2 = Equipment.builder()
            .id(2)
            .name("bowl")
            .image("bowl-image")
            .build();

    InstructionStep instructionStep1 = InstructionStep.builder()
            .number(1)
            .step("clean Ingredients")
            .equipment(List.of(equipment1))
            .build();
    InstructionStep instructionStep2 = InstructionStep.builder()
            .number(2)
            .step("cook Ingredients")
            .equipment(List.of(equipment2))
            .build();

    Instruction instruction = Instruction.builder()
            .name("Main dish")
            .steps(List.of(instructionStep1,instructionStep2))
            .build();

    Equipment equipmentWithUri1 = Equipment.builder()
            .id(1)
            .name("oven")
            .image("https://spoonacular.com/cdn/equipment_100x100/oven-image")
            .build();
    Equipment equipmentWithUri2 = Equipment.builder()
            .id(2)
            .name("bowl")
            .image("https://spoonacular.com/cdn/equipment_100x100/bowl-image")
            .build();

    InstructionStep instructionWithUriStep1 = InstructionStep.builder()
            .number(1)
            .step("clean Ingredients")
            .equipment(List.of(equipmentWithUri1))
            .build();
    InstructionStep instructionWithUriStep2 = InstructionStep.builder()
            .number(2)
            .step("cook Ingredients")
            .equipment(List.of(equipmentWithUri2))
            .build();
    InstructionStep instructionWithUriStep3 = InstructionStep.builder()
            .number(2)
            .step("cook Ingredients")
            .equipment(List.of(equipmentWithUri1))
            .build();

    Instruction instructionWithUri = Instruction.builder()
            .name("Main dish")
            .steps(List.of(instructionWithUriStep1,instructionWithUriStep2))
            .build();

    Instruction instructionWithDuplicatedEquipment = Instruction.builder()
            .name("Main dish")
            .steps(List.of(instructionWithUriStep1,instructionWithUriStep2, instructionWithUriStep3))
            .build();

    @Test
    void getAllRecipes() {
        //GIVEN
        when(apiService.retrieveRecipes("pasta")).thenReturn(List.of(Recipe.builder()
                .id("123-456")
                .title("Pasta Special")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instruction))
                .build()));
        //WHEN
        List<Recipe> actual = spoonacularService.getAllRecipes("pasta");
        //THEN
        List<Recipe> expected = List.of(Recipe.builder()
                .id("123-456")
                .title("Pasta Special")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instruction))
                .build());

        verify(apiService).retrieveRecipes("pasta");
        assertEquals(expected,actual);
    }

    @Test
    void getRecipeDetails() {
        //GIVEN
        when(apiService.retrieveRecipeDetails(123)).thenReturn(Recipe.builder()
                .id("123-456")
                .title("Pasta Special")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instruction))
                .build());
        //WHEN
        Recipe actual = spoonacularService.getRecipeDetails(123);
        //THEN
        Recipe expected = Recipe.builder()
                .id("123-456")
                .title("Pasta Special")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instructionWithUri))
                .equipment(List.of(equipmentWithUri1, equipmentWithUri2))
                .build();

        verify(apiService).retrieveRecipeDetails(123);
        assertEquals(expected, actual);
    }

    @Test
    void setNewImageUrl() {
        //GIVEN
        Recipe oldRecipe = Recipe.builder()
                .id("123-456")
                .title("Pasta Special")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instruction))
                .build();

        //WHEN
        Recipe actual = spoonacularService.setNewImageUrl(oldRecipe);

        //THEN
        Recipe expected = Recipe.builder()
                .id("123-456")
                .title("Pasta Special")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instructionWithUri))
                .build();

        assertEquals(expected, actual);
    }

    @Test
    void setEquipmentProperty() {
        //GIVEN
        Recipe recipeWithImageUri = Recipe.builder()
                .id("123-456")
                .title("Pasta Special")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instructionWithUri))
                .build();
        //WHEN
        List<Equipment> actual = spoonacularService.setEquipmentProperty(recipeWithImageUri);
        //THEN
        List<Equipment> expected = List.of(equipmentWithUri1, equipmentWithUri2);
        assertEquals(expected, actual);
    }

    @Test
    void setEquipmentProperty_whenDuplicateEquipment_shouldReturnWithoutDuplicates() {
        //GIVEN
        Recipe recipeWithImageUri = Recipe.builder()
                .id("123-456")
                .title("Pasta Special")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instructionWithDuplicatedEquipment))
                .build();
        //WHEN
        List<Equipment> actual = spoonacularService.setEquipmentProperty(recipeWithImageUri);
        //THEN
        List<Equipment> expected = List.of(equipmentWithUri1, equipmentWithUri2);
        assertEquals(expected, actual);
    }
}
