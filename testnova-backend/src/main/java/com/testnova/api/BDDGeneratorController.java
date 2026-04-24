package com.testnova.api;

import com.testnova.ai.BDDAssistantService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/ai/bdd")
public class BDDGeneratorController {

    private final BDDAssistantService bddAssistantService;

    public BDDGeneratorController(BDDAssistantService bddAssistantService) {
        this.bddAssistantService = bddAssistantService;
    }

    @PostMapping("/generate")
    public Mono<String> generate(@RequestBody String userStory) {
        return bddAssistantService.generateGherkin(userStory);
    }
}
