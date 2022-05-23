package de.neuefische.backend.controller;

import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.repository.RecipeRepo;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
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
}