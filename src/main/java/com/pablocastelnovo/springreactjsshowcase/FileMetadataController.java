package com.pablocastelnovo.springreactjsshowcase;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileMetadataController {

    private final FileMetadataService fileMetadataService;

    @Autowired
    public FileMetadataController(FileMetadataService fileMetadataService) {
        this.fileMetadataService = fileMetadataService;
    }

    @GetMapping
    public ResponseEntity<Page<FileMetadataDTO>> findAll(@PageableDefault Pageable pageable) {
        return ResponseEntity.ok(fileMetadataService.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<FileMetadataDTO> save(@ModelAttribute FileMetadataDTO fileMetadataDTO) {
        try {
            final FileMetadata fileMetadata = fileMetadataService.save(loadAndSync(fileMetadataDTO),
                    fileMetadataDTO.getFile());
            return ResponseEntity.ok(FileMetadataDTO.of(fileMetadata));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    private FileMetadata loadAndSync(FileMetadataDTO fileMetadataDTO) {
        if (fileMetadataDTO == null)
            return new FileMetadata();

        final FileMetadata fileMetadata = loadEntity(fileMetadataDTO.getId());

        fileMetadataDTO.syncTo(fileMetadata);

        return fileMetadata;
    }

    private FileMetadata loadEntity(final Long id) {
        if (id == null)
            return new FileMetadata();

        return fileMetadataService.findById(id).orElse(new FileMetadata());
    }
}
