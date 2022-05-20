package de.neuefische.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    public WebClient getWebClient() {
        return WebClient.create("https://api.spoonacular.com/recipes");
    }
}
