package com.pablocastelnovo.springreactjsshowcase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/files")
public class FileMetadataController {

	private final FileMetadataService fileMetadataService;

	@Autowired
	public FileMetadataController(FileMetadataService fileMetadataService) {
		this.fileMetadataService = fileMetadataService;
	}

	@GetMapping
	public ResponseEntity<FileMetadataPage> findAll() {
		return ResponseEntity.ok(new FileMetadataPage(fileMetadataService.findAll()));
	}
}
