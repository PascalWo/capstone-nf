package de.neuefische.backend.controller;

import de.neuefische.backend.TestWebClientConfig;
import de.neuefische.backend.WebClientConfig;
import de.neuefische.backend.model.Recipe;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SpoonacularApiControllerTest {

    @Autowired
    private TestWebClientConfig testWebClientConfig;

    @Autowired
    private WebTestClient testClient;

    @MockBean
    private WebClientConfig webClientConfig;

    @Test
    void getAllRecipes() {
        //GIVEN
        when(testWebClientConfig.getExchangeFunction().exchange(any()))
                .thenReturn(Mono.just(ClientResponse.create(HttpStatus.OK).header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).body("""
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
                         """).build()));


        //WHEN
        List<Recipe> actual = testClient.get()
                .uri("/api/spoonacular/recipes/pasta")
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





//    @Autowired
//    private WebTestClient testClient;
//
//    private SpoonacularApiService spoonacularApiService;
//    private final ExchangeFunction exchangeFunction = mock(ExchangeFunction.class);
//
//    @BeforeEach
//    void init() {
//        WebClient webClient = WebClient.builder()
//                .exchangeFunction(exchangeFunction)
//                .build();
//
//        spoonacularApiService = new SpoonacularApiService(webClient);
//    }
//
//    @Test
//    void getAllRecipes() {
//        //GIVEN
//        Recipe recipe1 = Recipe
//                .builder()
//                .id("1")
//                .title("Pasta")
//                .build();
//        Recipe recipe2 = Recipe
//                .builder()
//                .id("2")
//                .title("Pizza")
//                .build();
//        List<Recipe> recipes = List.of(recipe1, recipe2);
//
//        when(exchangeFunction.exchange(any(ClientRequest.class)))
//                .thenReturn(Mono.just(ClientResponse
//                        .create(HttpStatus.OK)
//                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//                        .body(objectMapper.writeValueAsString(isbnBook))
//                        //.body("{\"id\": \"123\", \"title\": \"my-book\", \"author\": \"me\"}")
//                        .build()));
//
//        //WHEN
//
//
//        List<Recipe> actual = testClient.get()
//                .uri("/api/spoonacular/recipes")
//                .exchange()
//                .expectStatus().is2xxSuccessful()
//                .expectBodyList(Recipe.class)
//                .returnResult()
//                .getResponseBody();
//        //THEN
//        List<Recipe> expected = List.of(Recipe
//                        .builder()
//                        .id("1")
//                        .title("Pasta")
//                        .build(),
//                Recipe
//                        .builder()
//                        .id("2")
//                        .title("Pizza")
//                        .build()
//        );
//        assertEquals(expected, actual);
//
//    }
}