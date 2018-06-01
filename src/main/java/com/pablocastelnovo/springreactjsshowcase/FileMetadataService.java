package com.pablocastelnovo.springreactjsshowcase;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
        if (multipartFile == null) {
            fileMetadata.unlinkContent();
        } else {
            final String contentId = contentRepository.saveContent(multipartFile.getInputStream());

            fileMetadata.linkFile(contentId, multipartFile.getOriginalFilename());
        }

        return fileMetadataRepository.save(fileMetadata);
    }

    public Pageable configureDefaults(Pageable pageable) {
        if (pageable.getSort().isUnsorted()) {
            Sort defaultSort = Sort.by(Order.desc(FileMetadata_.createdAt.getName()));
            return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), defaultSort);
        }

        return pageable;
    }
}
