package de.neuefische.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${spoona.api.baseurl}")
    private String baseUrl;

    public WebClient getWebClient() {
        return WebClient.create(baseUrl);
    }
}
