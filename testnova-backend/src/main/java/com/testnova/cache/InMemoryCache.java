package com.testnova.cache;

import org.springframework.stereotype.Component;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class InMemoryCache {

    private final ConcurrentHashMap<String, Object> testState = new ConcurrentHashMap<>();

    // Quick in-memory key-value data storage
}
