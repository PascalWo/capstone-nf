package de.neuefische.backend.service;

import de.neuefische.backend.dto.CreateRecipeDto;
import de.neuefische.backend.model.*;
import de.neuefische.backend.repository.RecipeRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class RecipeServiceTest {

    private final RecipeRepo recipeRepo = mock(RecipeRepo.class);
    private final RecipeService recipeService = new RecipeService(recipeRepo);

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

    Instruction instructionWithUri = Instruction.builder()
            .name("Main dish")
            .steps(List.of(instructionWithUriStep1,instructionWithUriStep2))
            .build();

    @Test
    void getRecipes() {
        //GIVEN
        Recipe recipe1 = Recipe
                .builder()
                .id("1")
                .title("Pasta")
                .build();
        Recipe recipe2 = Recipe
                .builder()
                .id("2")
                .title("Pizza")
                .build();
        when(recipeRepo.findAll()).thenReturn(List.of(recipe1, recipe2));
        //WHEN
        List<Recipe> actual = recipeService.getRecipes();
        //THEN
        List<Recipe> expected = List.of(recipe1, recipe2);
        verify(recipeRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addNewRecipe() {
        //GIVEN
        Recipe recipeToAdd = Recipe
                .builder()
                .title("Pasta")
                .build();
        when(recipeRepo.insert(recipeToAdd)).thenReturn(Recipe
                .builder()
                .id("123-test")
                .title("Pasta")
                .build());
        //WHEN
        CreateRecipeDto newRecipe = CreateRecipeDto
                .builder()
                .title("Pasta")
                .build();
        Recipe actual = recipeService.addNewRecipe(newRecipe);
        //THEN
        Recipe expected = Recipe
                .builder()
                .id("123-test")
                .title("Pasta")
                .build();
        verify(recipeRepo).insert(recipeToAdd);
        assertEquals(expected, actual);
    }
    @Test
    void addNewRecipe_whenTitleEqualsNull_shouldThrowException() {
        //WHEN
        CreateRecipeDto newRecipe = CreateRecipeDto
                .builder()
                .title(null)
                .build();

        //THEN
        assertThrows(IllegalArgumentException.class, () -> recipeService.addNewRecipe(newRecipe));
    }

    @Test
    void deleteRecipe() {
        //GIVEN WHEN
        recipeService.deleteRecipe("1");
        //THEN
        verify(recipeRepo).deleteById("1");
    }

    @Test
    void getRecipeById_whenIdIsValid() {
        //GIVEN
        when(recipeRepo.findById("1")).thenReturn(
                Optional.of(Recipe.builder()
                        .id("1")
                        .title("Soup")
                        .image("testImage")
                        .vegetarian(true)
                        .glutenFree(true)
                        .readyInMinutes(25)
                        .servings(4)
                        .summary("Some Summary")
                        .vegan(true)
                        .build()));

        //WHEN
        Recipe actual = recipeService.getRecipeDetails("1");

        //THEN
        Recipe expected = Recipe.builder()
                .id("1")
                .title("Soup")
                .image("testImage")
                .vegetarian(true)
                .glutenFree(true)
                .readyInMinutes(25)
                .servings(4)
                .summary("Some Summary")
                .vegan(true)
                .build();

        verify(recipeRepo).findById("1");
        assertEquals(expected,actual);
    }

    @Test
    void getRecipeById_ifIdIsNotValid_shouldThrowException() {
        //GIVEN
        when(recipeRepo.findById("1")).thenReturn(Optional.empty());
        //WHEN //THEN
        assertThrows(NoSuchElementException.class, () -> recipeService.getRecipeDetails("1"));
        verify(recipeRepo).findById("1");
    }

    @Test
    void updateRecipeByID_whenIdExists_shouldReturnRecipe() {
        //GIVEN
        String updateRecipeId = "123";

        CreateRecipeDto updatedRecipe =CreateRecipeDto.builder()
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

        Recipe saveRecipe =Recipe.builder()
                .id("123")
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

        when(recipeRepo.existsById(updateRecipeId)).thenReturn(true);
        when(recipeRepo.save(saveRecipe)).thenReturn(saveRecipe);

        //WHEN

        Recipe actual = recipeService.updateRecipeByID(updateRecipeId, updatedRecipe);
        //THEN
        verify(recipeRepo).save(saveRecipe);
        assertEquals(saveRecipe, actual);
    }

    @Test
    void updateRecipeByID_whenIdNotExists_shouldReturnException(){
        //GIVEN
        String updateRecipeId = "123";

        CreateRecipeDto updatedRecipe =CreateRecipeDto.builder()
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

        //WHEN //THEN
        assertThrows(NoSuchElementException.class, () -> recipeService.updateRecipeByID(updateRecipeId, updatedRecipe));
    }

    @Test
    void createRecipeFromDto() {
        //GIVEN
        CreateRecipeDto recipeDto = CreateRecipeDto.builder()
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

        //WHEN
        Recipe actual = recipeService.createRecipeFromDto(recipeDto);
        //THEN
        Recipe expected = Recipe.builder()
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

        assertEquals(expected, actual);
    }
}
