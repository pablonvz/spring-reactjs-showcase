package com.pablocastelnovo.springreactjsshowcase;

import java.io.Serializable;
import java.time.Instant;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class FileMetadataDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String description;
    private MultipartFile file;
    private String createdAt;

    public static FileMetadataDTO of(FileMetadata entity) {
        final FileMetadataDTO dto = new FileMetadataDTO();

        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setCreatedAt(entity.getCreatedAt().toString());

        return dto;
    }

    public void syncTo(FileMetadata fileMetadata) {
        fileMetadata.setTitle(getTitle());
        fileMetadata.setDescription(getDescription());

        if (getCreatedAt() != null)
            fileMetadata.setCreatedAt(Instant.parse(getCreatedAt()));
    }
}
