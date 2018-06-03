package com.pablocastelnovo.springreactjsshowcase;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "contents.file-system")
final class FileSystemContentRepositoryProperties {

    private String basePath;

}
