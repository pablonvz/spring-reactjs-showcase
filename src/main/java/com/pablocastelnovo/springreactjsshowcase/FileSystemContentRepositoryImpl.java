package com.pablocastelnovo.springreactjsshowcase;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Repository;

@Repository
class FileSystemContentRepositoryImpl implements ContentRepository {

    @Override
    public String saveContent(InputStream content) throws IOException {
        final UUID contentId = UUID.randomUUID();

        final File file = new File(contentId.toString());
        final FileOutputStream outputStream = new FileOutputStream(file);

        IOUtils.copy(content, outputStream);

        return contentId.toString();
    }

    @Override
    public InputStream loadContent(String contentId) throws IOException {
        if (contentId == null)
            return null;

        return new FileInputStream(contentId);
    }

    @Override
    public void deleteContent(String contentId) throws IOException {
        if (contentId == null)
            return;

        final Path filePath = FileSystems.getDefault().getPath(contentId);

        Files.deleteIfExists(filePath);
    }
}
