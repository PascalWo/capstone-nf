package de.neuefische.backend.api;

import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.model.RecipeInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class SpoonacularApiService {

    private final WebClient webClient;

    public SpoonacularApiService(WebClient webClient) {
        this.webClient = webClient;
    }

    @Value("${spoonacular.lapamealfactory.api.key}")
    private String API_KEY;


    public List<Recipe> retrieveRecipes(String search){

            RecipeInfo recipeInfo = webClient.get()
                    .uri("/complexSearch?query=" + search)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .header("x-api-key", API_KEY)
                    .retrieve()
                    .toEntity(RecipeInfo.class)
                    .block()
                    .getBody();

            return recipeInfo.getResults();

    }
}
