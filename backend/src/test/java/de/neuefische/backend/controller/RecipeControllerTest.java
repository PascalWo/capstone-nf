package de.neuefische.backend.controller;

import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.repository.RecipeRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RecipeControllerTest {

    @Autowired
    private WebTestClient testClient;

    @Autowired
    private RecipeRepo recipeRepo;

    @BeforeEach
    public void cleanUP(){
        recipeRepo.deleteAll();
    }

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
                .exchange()
                //THEN
                .expectStatus().is2xxSuccessful();
    }
}