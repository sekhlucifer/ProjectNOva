package com.testnova.ai;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class AutoHealService {

    private final WebClient webClient;

    public AutoHealService() {
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:11434")
                .build();
    }

    public Mono<String> healLocatorFailure(String failedLocator, String htmlContext) {
        String prompt = String.format(
            "The following CSS/XPath locator failed: '%s'. " +
            "Analyze the provided HTML context and suggest a new working CSS selector. " +
            "Return ONLY the selector string. \n\nHTML Context:\n%s",
            failedLocator, htmlContext
        );

        return webClient.post()
                .uri("/api/generate")
                .bodyValue(Map.of(
                    "model", "llama3", // or mistral based on user preference
                    "prompt", prompt,
                    "stream", false
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> (String) response.get("response"));
    }

}
