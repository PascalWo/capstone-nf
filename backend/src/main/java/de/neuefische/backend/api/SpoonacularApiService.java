package de.neuefische.backend.api;

import de.neuefische.backend.errorhandling.ApiNotRespondException;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.model.RecipeInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @Value("${spoona.api.baseurl}")
    private String baseUrl;

    private static final String RECIPES_TO_SHOW = "50";

    public List<Recipe> retrieveRecipes(String search) {

            ResponseEntity<RecipeInfo> responseEntity = webClient
                    .get()
                    .uri(baseUrl + "/complexSearch?query=" + search + "&number=" + RECIPES_TO_SHOW + "&addRecipeInformation=true")
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .header("x-api-key", API_KEY)
                    .retrieve()
                    .toEntity(RecipeInfo.class)
                    .block();

            if (responseEntity == null){
                throw new ApiNotRespondException("API not available");
            }
            RecipeInfo recipeInfo = responseEntity.getBody();

            if (recipeInfo == null){
                throw new ApiNotRespondException("Response is Null");
            }

            return recipeInfo.getResults();
    }

    public Recipe retrieveRecipeDetails(String id) {

        ResponseEntity<Recipe> responseEntity = webClient
                .get()
                .uri(baseUrl + "/" + id + "/information")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header("x-api-key", API_KEY)
                .retrieve()
                .toEntity(Recipe.class)
                .block();

        if (responseEntity == null){
            throw new ApiNotRespondException("API not available");
        }
        Recipe recipeDetails = responseEntity.getBody();

        if (recipeDetails == null){
            throw new ApiNotRespondException("Response is Null");
        }

        return recipeDetails;
    }
}
