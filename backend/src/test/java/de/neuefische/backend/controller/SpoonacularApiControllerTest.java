package de.neuefische.backend.controller;

import de.neuefische.backend.WebClientConfig;
import de.neuefische.backend.model.Recipe;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SpoonacularApiControllerTest {

    @MockBean
    private WebClientConfig testWebClientConfig;

    @Autowired
    private WebTestClient testClient;

    @Mock
    private ExchangeFunction exchangeFunction;

    @BeforeEach
    void setUp() {
        when(testWebClientConfig.getWebClient()).thenReturn(WebClient
                .builder()
                .exchangeFunction(exchangeFunction)
                .build());
    }

    @Test
    void getAllRecipes() {
        //GIVEN
        when(exchangeFunction.exchange(any()))
                .thenReturn
                        (Mono.just(ClientResponse.create(HttpStatus.OK)
                                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                                .body("""
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

    @Test
    void getAllRecipes_whenApiNotFound_returnException() {
        //GIVEN
        when(exchangeFunction.exchange(any()))
                .thenReturn
                        (Mono.just(ClientResponse.create(HttpStatus.INTERNAL_SERVER_ERROR)
                                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                                .build()));
        //WHEN /THEN
        testClient.get()
                .uri("/api/spoonacular/recipes/pasta")
                .exchange()
                .expectStatus().is5xxServerError();
    }
}

