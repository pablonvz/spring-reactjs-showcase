package com.pablocastelnovo.springreactjsshowcase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class FileMetadataSeedsRunner implements CommandLineRunner {

    private final FileMetadataRepository fileMetadataRepository;

    @Autowired
    public FileMetadataSeedsRunner(FileMetadataRepository fileMetadataRepository) {
        this.fileMetadataRepository = fileMetadataRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        for (int i = 0; i < 100; i++)
            fileMetadataRepository.save(FileMetadata.builder()
                    .title("Title" + String.valueOf(i))
                    .description("description " + String.valueOf(i)).build());
    }
}
