package de.neuefische.backend;

import lombok.Getter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.reactive.function.client.ExchangeFunction;
import org.springframework.web.reactive.function.client.WebClient;

import static org.mockito.Mockito.mock;

@Configuration
@Primary
public class TestWebClientConfig {

    @Getter
    private final ExchangeFunction exchangeFunction = mock(ExchangeFunction.class);


    @Bean
    @Primary
    public WebClient getWebClient(){
        return WebClient.builder()
                .exchangeFunction(exchangeFunction)
                .build();
    }
}
