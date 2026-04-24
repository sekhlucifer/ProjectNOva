package com.testnova.ai;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class BDDAssistantService {

    private final WebClient webClient;

    public BDDAssistantService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:11434").build();
    }

    public Mono<String> generateGherkin(String userStory) {
        String prompt = String.format(
            "You are a Senior Business Analyst and QA Expert. " +
            "Convert the following User Story into a professionally structured Gherkin BDD Feature file. " +
            "Use clear 'Given', 'When', 'Then' steps. " +
            "Target Audience: Non-technical users. Make it readable. " +
            "User Story: %s " +
            "Output only the Gherkin syntax.",
            userStory
        );

        Map<String, Object> request = Map.of(
            "model", "llama3",
            "prompt", prompt,
            "stream", false
        );

        return webClient.post()
                .uri("/api/generate")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> (String) response.get("response"));
    }
}
