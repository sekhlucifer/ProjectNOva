package com.testnova.engine;

import com.microsoft.playwright.*;
import org.springframework.stereotype.Component;

import jakarta.annotation.PreDestroy;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class PlaywrightWrapper {

    private Playwright playwright;
    private Browser browser;
    private final Map<String, BrowserContext> activeContexts = new ConcurrentHashMap<>();

    public PlaywrightWrapper() {
        // Initialize the browser driver eagerly on app startup
        this.playwright = Playwright.create();
        this.browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true));
        System.out.println("[ENGINE] Chromium Browser Initialized");
    }

    public Page createOptimizedPage(String sessionId) {
        BrowserContext context = browser.newContext();
        
        // Route Blocking: Block images/media for faster execution
        context.route("**/*.{png,jpg,jpeg,mp4,svg,css}", route -> route.abort());
        
        activeContexts.put(sessionId, context);
        return context.newPage();
    }
    
    public void closeContext(String sessionId) {
        BrowserContext context = activeContexts.remove(sessionId);
        if (context != null) {
            context.close();
        }
    }

    @PreDestroy
    public void shutdown() {
        if (browser != null) browser.close();
        if (playwright != null) playwright.close();
    }
}
