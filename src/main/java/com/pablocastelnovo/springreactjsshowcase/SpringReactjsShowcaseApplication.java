package com.pablocastelnovo.springreactjsshowcase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
    FileSystemContentRepositoryProperties.class
})
public class SpringReactjsShowcaseApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringReactjsShowcaseApplication.class, args);
    }
}
