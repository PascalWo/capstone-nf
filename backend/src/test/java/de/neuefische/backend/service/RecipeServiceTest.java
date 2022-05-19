package de.neuefische.backend.service;

import de.neuefische.backend.dto.CreateRecipeDto;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.repository.RecipeRepo;
import org.junit.jupiter.api.Test;

import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class RecipeServiceTest {

    private final RecipeRepo recipeRepo = mock(RecipeRepo.class);
    private final RecipeService recipeService = new RecipeService(recipeRepo);

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
}