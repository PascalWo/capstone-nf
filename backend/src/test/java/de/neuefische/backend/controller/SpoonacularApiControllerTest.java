package de.neuefische.backend.controller;

import com.github.tomakehurst.wiremock.junit5.WireMockTest;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.math.BigDecimal;
import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@WireMockTest(httpPort = 8484)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SpoonacularApiControllerTest {

    private String jwtToken;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private WebTestClient testClient;

    @BeforeEach
    public void cleanUp(){
        appUserRepository.deleteAll();
        jwtToken = generateJWTToken();
    }

    @Test
    void getAllRecipes_whenSearchIsPasta_returnPastaRecipes() {
        //GIVEN
        String search = "pasta";
        String RECIPES_TO_SHOW = "50";
        String filePath = "getAllRecipesPastaTest.json";
        stubFor(get("/complexSearch?query=" + search + "&number=" + RECIPES_TO_SHOW + "&addRecipeInformation=true").willReturn(aResponse().withStatus(200).withBodyFile(filePath).withHeader("Content-Type",MediaType.APPLICATION_JSON_VALUE )));


        //WHEN
        List<Recipe> actual =  testClient
                .get()
                .uri("/api/spoonacular/recipes/" + search)
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(Recipe.class)
                .returnResult()
                .getResponseBody();

        //THEN
        List<Recipe> expected = List.of(Recipe
                        .builder()
                        .id("654959")
                        .title("Pasta With Tuna")
                        .image("https://spoonacular.com/recipeImages/654959-312x231.jpg")
                        .build(),
                Recipe
                        .builder()
                        .id("511728")
                        .title("Pasta Margherita")
                        .image("https://spoonacular.com/recipeImages/511728-312x231.jpg")
                        .build()
        );
        assertEquals(expected, actual);
    }

    @Test
    void getAllRecipes_whenApiNotFound_return500Error(){
        //GIVEN
        String search = "pasta";
        stubFor(get("/complexSearch?query=" + search).willReturn(serverError()));

        //WHEN /Then
        testClient
                .get()
                .uri("/api/spoonacular/recipes/" +search)
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is5xxServerError();
    }

    @Test
    void getAllRecipes_whenEmptyResponse_returnException(){
        //GIVEN
        String search = "pasta";
        stubFor(get("/complexSearch?query=" + search).willReturn(status(200)));

        //WHEN /Then
        testClient
                .get()
                .uri("/api/spoonacular/recipes/pasta")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is5xxServerError();
    }

    @Test
    void getRecipeDetails_whenIdIsValid_thenReturnDetailsObjectWithJson() {
        //GIVEN
        int id = 716429;
        String filePath = "getRecpieByIdTest.json";
        stubFor(get("/" + id + "/information").willReturn(aResponse().withStatus(200).withBodyFile(filePath).withHeader("Content-Type",MediaType.APPLICATION_JSON_VALUE )));

        //WHEN
        Recipe actual =  testClient
                .get()
                .uri("/api/spoonacular/recipes/information/" + id)
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(Recipe.class)
                .returnResult()
                .getResponseBody();

        //THEN
        Recipe expected = Recipe
                .builder()
                .id("716429")
                .title("Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs")
                .image("https://spoonacular.com/recipeImages/716429-556x370.jpg")
                .vegetarian(false)
                .vegan(false)
                .glutenFree(false)
                .pricePerServing(BigDecimal.valueOf(163.15))
                .readyInMinutes(45)
                .servings(2)
                .summary("Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for.")
                .build();

        assertEquals(expected, actual);
    }

    @Test
    void getRecipeDetails_whenIdIsNotValid_thenReturnServerError() {
        //GIVEN
        int id = 716429;
        String wrongId = "123";
        stubFor(get("/" + id + "/information").willReturn(serverError()));

        //WHEN /Then
        testClient
                .get()
                .uri("/api/spoonacular/recipes/information/" + wrongId)
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is5xxServerError();
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

