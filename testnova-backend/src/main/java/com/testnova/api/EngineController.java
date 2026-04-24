package com.testnova.api;

import com.testnova.service.ExecutionService;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/engine")
public class EngineController {

    private final ExecutionService executionService;

    public EngineController(ExecutionService executionService) {
        this.executionService = executionService;
    }

    @GetMapping("/status")
    public String getStatus() {
        return "TestNova Engine is online and ready for execution.";
    }

    @GetMapping("/run")
    public CompletableFuture<String> runTest(@RequestParam(defaultValue = "https://example.com") String target) {
        return executionService.orchestrateExecution(target);
    }

    @PostMapping("/sequence")
    public String saveSequence(@RequestBody Object sequence) {
        // Logic to persist the sequence (e.g. to DB or Cache)
        System.out.println("[API] Saved new test sequence from Visual Builder");
        return "Sequence saved successfully";
    }

}
