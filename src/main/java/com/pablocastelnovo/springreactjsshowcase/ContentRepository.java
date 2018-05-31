package com.pablocastelnovo.springreactjsshowcase;

import java.io.IOException;
import java.io.InputStream;

public interface ContentRepository {
    public String saveContent(InputStream content) throws IOException;

    public InputStream loadContent(String contentId) throws IOException;

    public void deleteContent(String contentId) throws IOException;
}
