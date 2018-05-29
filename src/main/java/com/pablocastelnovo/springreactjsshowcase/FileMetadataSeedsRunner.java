package com.pablocastelnovo.springreactjsshowcase;

import java.util.Arrays;

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
		fileMetadataRepository.saveAll(Arrays.asList(new FileMetadata("Title1", "desc1", null)));
	}
}
