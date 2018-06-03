package com.pablocastelnovo.springreactjsshowcase;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileMetadataService {

    private final FileMetadataRepository fileMetadataRepository;
    private final ContentRepository contentRepository;

    @Autowired
    public FileMetadataService(FileMetadataRepository fileMetadataRepo, ContentRepository fileContentStore) {
        this.fileMetadataRepository = fileMetadataRepo;
        this.contentRepository = fileContentStore;
    }

    public Page<FileMetadataDTO> findAll(Pageable pageable) {
        pageable = configureDefaults(pageable);

        final Page<FileMetadata> entitiesPage = fileMetadataRepository.findAll(pageable);
        final List<FileMetadataDTO> dtos = entitiesPage.getContent().stream()
                .map(FileMetadataDTO::of)
                .collect(Collectors.toList());

        return new PageImpl<FileMetadataDTO>(dtos, pageable, entitiesPage.getTotalElements());
    }

    public Optional<FileMetadata> findById(Long id) {
        return fileMetadataRepository.findById(id);
    }

    public FileMetadata save(FileMetadata fileMetadata, MultipartFile multipartFile) throws IOException {
        fileMetadata = fileMetadataRepository.save(fileMetadata);

        if (multipartFile == null) {
            fileMetadata.unlinkContent();
        } else {
            final String namespace = fileMetadata.contentNamespace();
            final String filename = multipartFile.getOriginalFilename();
            final InputStream fileInputStream = multipartFile.getInputStream();

            final String contentId = contentRepository.saveContent(namespace, filename, fileInputStream);

            fileMetadata.linkFile(contentId);
        }

        return fileMetadataRepository.save(fileMetadata);
    }

    public Optional<Resource> contentAsResource(FileMetadata fileMetadata) {
        Validate.notNull(fileMetadata);

        try {
            return contentRepository.loadAsResource(fileMetadata.contentNamespace(), fileMetadata.getContentId());
        } catch (IOException e) {
            e.printStackTrace();

            return Optional.empty();
        }
    }

    private Pageable configureDefaults(Pageable pageable) {
        if (pageable.getSort().isUnsorted()) {
            Sort defaultSort = Sort.by(Order.desc(FileMetadata_.createdAt.getName()));
            return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), defaultSort);
        }

        return pageable;
    }
}
