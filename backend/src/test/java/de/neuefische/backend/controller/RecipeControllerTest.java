package de.neuefische.backend.controller;

import de.neuefische.backend.dto.CreateRecipeDto;
import de.neuefische.backend.model.*;
import de.neuefische.backend.repository.RecipeRepo;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RecipeControllerTest {

    private String jwtToken;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private WebTestClient testClient;

    @Autowired
    private RecipeRepo recipeRepo;

    @BeforeEach
    public void cleanUP(){
        recipeRepo.deleteAll();
        appUserRepository.deleteAll();
        jwtToken = generateJWTToken();
    }

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

    Recipe testRecipe =Recipe.builder()
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
        recipeRepo.insert(recipe1);
        recipeRepo.insert(recipe2);
        //WHEN
        List<Recipe> actual = testClient.get()
                .uri("/api/recipes")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(Recipe.class)
                .returnResult()
                .getResponseBody();
        //THEN
        List<Recipe> expected = List.of(Recipe
                .builder()
                .id("1")
                .title("Pasta")
                .build(),
                Recipe
                .builder()
                .id("2")
                .title("Pizza")
                .build()
                );
        assertEquals(expected, actual);
    }

    @Test
    void addNewRecipe() {
        //GIVEN
        Recipe recipeToAdd = Recipe
                .builder()
                .title("Pasta")
                .build();
        //WHEN
        Recipe actual = testClient.post()
                .uri("/api/recipes")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(recipeToAdd)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(Recipe.class)
                .returnResult()
                .getResponseBody();
        //THEN
        assertNotNull(actual);
        assertNotNull(actual.getId());
        Recipe expected = Recipe
                .builder()
                .id(actual.getId())
                .title("Pasta")
                .build();
        assertEquals(24, actual.getId().length());
        assertEquals(expected, actual);
    }

    @Test
    void addNewRecipe_whenIdIsGiven_thenShouldOverwriteId() {
        //GIVEN
        Recipe recipeToAdd = Recipe
                .builder()
                .id("1")
                .title("Pasta")
                .build();
        //WHEN
        Recipe actual = testClient.post()
                .uri("/api/recipes")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(recipeToAdd)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(Recipe.class)
                .returnResult()
                .getResponseBody();
        //THEN
        assertNotNull(actual);
        assertNotNull(actual.getId());
        Recipe expected = Recipe
                .builder()
                .id(actual.getId())
                .title("Pasta")
                .build();
        assertNotEquals("1", actual.getId());
        assertEquals(24, actual.getId().length());
        assertEquals(expected, actual);
    }

    @Test
    void deleteRecipe() {
        //GIVEN
        Recipe recipeToAdd = Recipe
                .builder()
                .title("Pasta")
                .build();
        Recipe addedRecipe = testClient.post()
                .uri("/api/recipes")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(recipeToAdd)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(Recipe.class)
                .returnResult()
                .getResponseBody();

        //WHEN
        assertNotNull(addedRecipe);
        testClient.delete()
                .uri("/api/recipes/" + addedRecipe.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                //THEN
                .expectStatus().is2xxSuccessful();
    }
    private String generateJWTToken() {
        String hashedPassword = passwordEncoder.encode("passwort");
        AppUser testUser = AppUser.builder()
                .username("testuser")
                .id("123")
                .password(hashedPassword)
                .build();
        appUserRepository.save(testUser);

        return testClient.post()
                .uri("/auth/login")
                .bodyValue(AppUser.builder()
                        .username("testuser")
                        .id("123")
                        .password("passwort")
                        .build())
                .exchange()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();
    }

    @Test
    void getRecipeById_whenIdIsValid() {
        //GIVEN
        Recipe recipe = Recipe.builder()
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

        Recipe addRecipe = testClient.post()
                .uri("/api/recipes/")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(recipe)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(Recipe.class)
                .returnResult()
                .getResponseBody();

        //WHEN
        assertNotNull(addRecipe);
        Recipe actual = testClient.get()
                .uri("/api/recipes/information/" + addRecipe.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectBody(Recipe.class)
                .returnResult()
                .getResponseBody();
        //THEN
        assertNotNull(actual);
        Recipe expected = Recipe.builder()
                .id(actual.getId())
                .title("Soup")
                .image("testImage")
                .vegetarian(true)
                .glutenFree(true)
                .readyInMinutes(25)
                .servings(4)
                .summary("Some Summary")
                .vegan(true)
                .build();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getItemById_whenIdIsNotValid_shouldThrowException() {
        //GIVEN
        Recipe recipe = Recipe.builder()
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

        testClient.post()
                .uri("/api/recipes/")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(recipe)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(Recipe.class)
                .returnResult()
                .getResponseBody();

        //WHEN
        testClient.get()
                .uri("/api/recipes/information/" + "5")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                //THEN
                .expectStatus().is5xxServerError();
    }

    @Test
    void updateRecipeById_whenIdIsValid() {
        //GIVEN
        recipeRepo.insert(testRecipe);

        CreateRecipeDto updatedRecipe =CreateRecipeDto.builder()
                .title("Pasta Special Updated")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever 2.0")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instructionWithUri))
                .equipment(List.of(equipmentWithUri1, equipmentWithUri2))
                .build();

        //WHEN
        Recipe actual = testClient.put()
                .uri("/api/recipes/" + testRecipe.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(updatedRecipe)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(Recipe.class)
                .returnResult()
                .getResponseBody();

        //THEN
        Recipe expected = Recipe.builder()
                .id(testRecipe.getId())
                .title("Pasta Special Updated")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever 2.0")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instructionWithUri))
                .equipment(List.of(equipmentWithUri1, equipmentWithUri2))
                .build();

        assertNotNull(actual);
        assertEquals(expected, actual);

    }

    @Test
    void updateRecipeById_whenIdIsNotValid_shouldReturnError(){
        //GIVEN
        recipeRepo.insert(testRecipe);
        String notValidId = "999";

        CreateRecipeDto updatedRecipe =CreateRecipeDto.builder()
                .title("Pasta Special Updated")
                .image("Image")
                .vegetarian(true)
                .vegan(true)
                .glutenFree(true)
                .readyInMinutes(30)
                .servings(2)
                .summary("Best Recipe ever 2.0")
                .extendedIngredients(List.of(ingredient1, ingredient2))
                .analyzedInstructions(List.of(instructionWithUri))
                .equipment(List.of(equipmentWithUri1, equipmentWithUri2))
                .build();

        //WHEN //THEN
        testClient.put()
                .uri("/api/recipes/" + notValidId)
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(updatedRecipe)
                .exchange()
                .expectStatus().is5xxServerError();
    }
}
