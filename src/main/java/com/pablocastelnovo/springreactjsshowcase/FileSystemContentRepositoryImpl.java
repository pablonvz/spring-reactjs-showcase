package com.pablocastelnovo.springreactjsshowcase;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Repository;

@Repository
class FileSystemContentRepositoryImpl implements ContentRepository {

    private final FileSystemContentRepositoryProperties repositoryProperties;

    @Autowired
    public FileSystemContentRepositoryImpl(FileSystemContentRepositoryProperties contentRepositoryProperties) {
        repositoryProperties = contentRepositoryProperties;

        Paths.get(repositoryProperties.getBasePath()).toFile().mkdirs();
    }

    @Override
    public String saveContent(final String namespace, final String contentId, InputStream content) throws IOException {
        final Path filePath = filePathOf(namespace, contentId);

        if (filePath == null)
            return null;

        final FileOutputStream outputStream = new FileOutputStream(filePath.toFile());

        IOUtils.copy(content, outputStream);

        return contentId.toString();
    }

    @Override
    public void deleteContent(String namespace, String contentId) throws IOException {
        final Path filePath = filePathOf(namespace, contentId);

        if (filePath != null)
            Files.deleteIfExists(filePath);
    }

    @Override
    public Optional<Resource> loadAsResource(String namespace, String contentId) throws IOException {
        final Path filePath = filePathOf(namespace, contentId);

        if (filePath != null)
            return Optional.of(new UrlResource(filePath.toUri()));

        return Optional.empty();
    }

    private Path filePathOf(String namespace, String contentId) {
        if (namespace == null || contentId == null)
            return null;

        // create the folders if missing
        Paths.get(repositoryProperties.getBasePath(), namespace).toFile().mkdirs();

        return Paths.get(repositoryProperties.getBasePath(), namespace, contentId);
    }
}
