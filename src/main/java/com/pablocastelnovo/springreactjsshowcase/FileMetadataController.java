package com.pablocastelnovo.springreactjsshowcase;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/files")
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
    public ResponseEntity<FileMetadataDTO> save(@RequestPart("file") MultipartFile multipartFile,
            @RequestPart("metadata") FileMetadataDTO fileMetadataDTO) throws UnsupportedEncodingException, IOException {

        fileMetadataService.save(fileMetadataDTO, multipartFile);

        fileMetadataDTO.setDescription(new String(multipartFile.getBytes(), "UTF-8"));

        return ResponseEntity.ok(fileMetadataDTO);
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<FileMetadataDTO> findById(@PathVariable("id") Long id)
    // {
    // return ResponseEntity.ok(fileMetadataService.findById(id));
    // }
}
