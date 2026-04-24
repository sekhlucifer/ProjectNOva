package com.testnova.api;

import com.testnova.ai.BDDAssistantService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/ai/chat")
public class ChatController {

    private final BDDAssistantService aiService;

    public ChatController(BDDAssistantService aiService) {
        this.aiService = aiService;
    }

    @PostMapping
    public Mono<String> chat(@RequestBody String message) {
        // We reuse the service but with a general assistance prompt
        String helpPrompt = String.format(
            "You are Nova, the friendly AI assistant for TestNova, an automation testing platform. " +
            "Your goal is to help users use the tool confidently. " +
            "TestNova has: Dashboard, Visual Builder, Configuration, Test Data, Trace Viewer, BDD Magic. " +
            "Encourage the user and be helpful. Keep responses concise. " +
            "User says: %s",
            message
        );

        return aiService.generateGherkin(helpPrompt); // Reusing the generation logic for chat
    }
}
