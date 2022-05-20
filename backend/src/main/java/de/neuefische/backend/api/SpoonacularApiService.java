package de.neuefische.backend.api;

import de.neuefische.backend.WebClientConfig;
import de.neuefische.backend.errorhandling.ApiNotRespondException;
import de.neuefische.backend.model.Recipe;
import de.neuefische.backend.model.RecipeInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpoonacularApiService {

    private final WebClientConfig webClientConfig;

    public SpoonacularApiService(WebClientConfig webClientConfig) {
        this.webClientConfig = webClientConfig;
    }

    @Value("${spoonacular.lapamealfactory.api.key}")
    private String API_KEY;

    public List<Recipe> retrieveRecipes(String search) {

            ResponseEntity<RecipeInfo> responseEntity = webClientConfig
                    .getWebClient()
                    .get()
                    .uri("/complexSearch?query=" + search)
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
                throw new ApiNotRespondException("API not available");
            }

            return recipeInfo.getResults();
    }
}
