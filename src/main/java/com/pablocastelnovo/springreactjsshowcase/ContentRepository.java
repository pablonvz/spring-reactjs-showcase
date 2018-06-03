package com.pablocastelnovo.springreactjsshowcase;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import org.springframework.core.io.Resource;

public interface ContentRepository {
    public String saveContent(String namespace, String contentId, InputStream content) throws IOException;

    public void deleteContent(String namespace, String contentId) throws IOException;

    public Optional<Resource> loadAsResource(String namespace, String contentId) throws IOException;
}
