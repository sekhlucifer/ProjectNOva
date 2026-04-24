package com.testnova.service;

import com.testnova.engine.PlaywrightWrapper;
import com.microsoft.playwright.Page;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
public class ExecutionService {

    private final PlaywrightWrapper engine;

    public ExecutionService(PlaywrightWrapper engine) {
        this.engine = engine;
    }

    public CompletableFuture<String> orchestrateExecution(String targetUrl) {
        return CompletableFuture.supplyAsync(() -> {
            String sessionId = UUID.randomUUID().toString();
            try {
                System.out.println("[SERVICE] Starting execution for session: " + sessionId);
                Page page = engine.createOptimizedPage(sessionId);
                
                // Simulate test steps
                page.navigate(targetUrl);
                String title = page.title();
                
                System.out.println("[SERVICE] Navigation Success -> Title: " + title);
                return "SUCCESS - Title: " + title;
            } catch (Exception e) {
                System.err.println("[SERVICE] Execution Failed: " + e.getMessage());
                return "FAILED - " + e.getMessage();
            } finally {
                engine.closeContext(sessionId);
            }
        });
    }

}
