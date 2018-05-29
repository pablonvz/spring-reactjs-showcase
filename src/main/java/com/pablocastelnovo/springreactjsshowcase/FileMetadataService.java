package com.pablocastelnovo.springreactjsshowcase;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileMetadataService {

	private final FileMetadataRepository fileMetadataRepository;

	@Autowired
	public FileMetadataService(FileMetadataRepository fileMetadataRepo) {
		this.fileMetadataRepository = fileMetadataRepo;
	}

	public List<FileMetadataDTO> findAll() {
		final List<FileMetadataDTO> files = new ArrayList<>();

		fileMetadataRepository.findAll().forEach(entity -> {
			files.add(FileMetadataDTO.of(entity));
		});

		return files;
	}
}
