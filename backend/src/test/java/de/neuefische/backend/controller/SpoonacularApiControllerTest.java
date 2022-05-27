package de.neuefische.backend.controller;

import com.github.tomakehurst.wiremock.junit5.WireMockTest;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

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
    void getAllRecipes_whenSearchIsPasta() {
        //GIVEN
        String search = "pasta";
        String RECIPES_TO_SHOW = "50";
        stubFor(get("/complexSearch?query=" + search + "&number=" + RECIPES_TO_SHOW + "&addRecipeInformation=true").willReturn(okJson("""
                                        {
                                            "results": [
                                                {
                                                    "id": 654959,
                                                    "title": "Pasta With Tuna",
                                                    "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
                                                    "imageType": "jpg"
                                                },
                                                {
                                                    "id": 511728,
                                                    "title": "Pasta Margherita",
                                                    "image": "https://spoonacular.com/recipeImages/511728-312x231.jpg",
                                                    "imageType": "jpg"
                                                }
                                            ],
                                            "offset": 0,
                                            "number": 2,
                                            "totalResults": 223
                                        }
                                         """)));

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
    void getRecipeDetails_whenIdIsValid_thenReturnDetailsObject() {
        //GIVEN
        String id = "716429";
        stubFor(get("/" + id + "/information").willReturn(okJson("""
                {
                     "vegetarian": false,
                     "vegan": false,
                     "glutenFree": false,
                     "dairyFree": false,
                     "veryHealthy": false,
                     "cheap": false,
                     "veryPopular": false,
                     "sustainable": false,
                     "lowFodmap": false,
                     "weightWatcherSmartPoints": 17,
                     "gaps": "no",
                     "preparationMinutes": -1,
                     "cookingMinutes": -1,
                     "aggregateLikes": 209,
                     "healthScore": 18,
                     "creditsText": "Full Belly Sisters",
                     "license": "CC BY-SA 3.0",
                     "sourceName": "Full Belly Sisters",
                     "pricePerServing": 163.15,
                     "extendedIngredients": [
                         {
                             "id": 1001,
                             "aisle": "Milk, Eggs, Other Dairy",
                             "image": "butter-sliced.jpg",
                             "consistency": "SOLID",
                             "name": "butter",
                             "nameClean": "butter",
                             "original": "1 tbsp butter",
                             "originalName": "butter",
                             "amount": 1.0,
                             "unit": "tbsp",
                             "meta": [],
                             "measures": {
                                 "us": {
                                     "amount": 1.0,
                                     "unitShort": "Tbsp",
                                     "unitLong": "Tbsp"
                                 },
                                 "metric": {
                                     "amount": 1.0,
                                     "unitShort": "Tbsp",
                                     "unitLong": "Tbsp"
                                 }
                             }
                         },
                         {
                             "id": 10011135,
                             "aisle": "Produce",
                             "image": "cauliflower.jpg",
                             "consistency": "SOLID",
                             "name": "cauliflower florets",
                             "nameClean": "cauliflower florets",
                             "original": "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
                             "originalName": "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
                             "amount": 2.0,
                             "unit": "cups",
                             "meta": [
                                 "frozen",
                                 "thawed",
                                 "cut into bite-sized pieces"
                             ],
                             "measures": {
                                 "us": {
                                     "amount": 2.0,
                                     "unitShort": "cups",
                                     "unitLong": "cups"
                                 },
                                 "metric": {
                                     "amount": 473.176,
                                     "unitShort": "ml",
                                     "unitLong": "milliliters"
                                 }
                             }
                         }
                     ],
                     "id": 716429,
                     "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
                     "readyInMinutes": 45,
                     "servings": 2,
                     "sourceUrl": "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
                     "openLicense": -1,
                     "image": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
                     "imageType": "jpg",
                     "summary": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for.",
                     "cuisines": [],
                     "dishTypes": [
                         "lunch",
                         "main course",
                         "main dish",
                         "dinner"
                     ],
                     "diets": [],
                     "occasions": [],
                     "winePairing": {
                         "pairedWines": [],
                         "pairingText": "No one wine will suit every pasta dish. Pasta in a tomato-based sauce will usually work well with a medium-bodied red, such as a montepulciano or chianti. Pasta with seafood or pesto will fare better with a light-bodied white, such as a pinot grigio. Cheese-heavy pasta can pair well with red or white - you might try a sangiovese wine for hard cheeses and a chardonnay for soft cheeses. We may be able to make a better recommendation if you ask again with a specific pasta dish.",
                         "productMatches": []
                     },
                     "instructions": "",
                     "analyzedInstructions": [],
                     "originalId": null,
                     "spoonacularSourceUrl": "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429"
                 }
                """)));

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
                .pricePerServing(163.15f)
                .readyInMinutes(45)
                .servings(2)
                .summary("Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for.")
                .build();

        assertEquals(expected, actual);
    }

    @Test
    void getRecipeDetails_whenIdIsNotValid_thenReturnServerError() {
        //GIVEN
        String id = "716429";
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

