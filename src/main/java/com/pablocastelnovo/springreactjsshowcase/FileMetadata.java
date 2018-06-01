package com.pablocastelnovo.springreactjsshowcase;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
@Builder
@AllArgsConstructor
public class FileMetadata implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter(value = AccessLevel.NONE)
    private String originalFilename;

    @Setter(value = AccessLevel.NONE)
    private String contentId;

    private String title;
    private String description;

    @Builder.Default
    private Instant createdAt = Instant.now();

    public FileMetadata() {
        createdAt = Instant.now();
    }

    public void linkFile(final String fileContentId, final String origFilename) {
        contentId = fileContentId;
        originalFilename = origFilename;
    }

    public void unlinkContent() {
        contentId = null;
        originalFilename = null;
    }

    public boolean hasContent() {
        return contentId != null;
    }
}
