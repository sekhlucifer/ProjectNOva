package com.testnova.storage;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.nio.file.Path;

@Service
public class ArtifactStorageService {

    private final S3Client s3Client;
    private final String bucketName = "testnova-artifacts";

    public ArtifactStorageService() {
        this.s3Client = S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
    }

    public void uploadTraceFile(String sessionId, Path filePath) {
        String key = String.format("traces/%s/%s", sessionId, filePath.getFileName().toString());
        
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromFile(filePath));
        System.out.println("[STORAGE] Uploaded trace file to S3: " + key);
    }
}
