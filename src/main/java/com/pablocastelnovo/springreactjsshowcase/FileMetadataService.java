package com.pablocastelnovo.springreactjsshowcase;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
        final Page<FileMetadata> entitiesPage = fileMetadataRepository.findAll(pageable);
        final List<FileMetadataDTO> dtos = entitiesPage.getContent().stream()
                .map(FileMetadataDTO::of)
                .collect(Collectors.toList());

        return new PageImpl<FileMetadataDTO>(dtos, pageable, entitiesPage.getTotalElements());
    }

    public void save(FileMetadataDTO fileMetadataDTO, MultipartFile file) throws IOException {
        final FileMetadata fileMetadata = loadAndSync(fileMetadataDTO);

        final String contentId = contentRepository.saveContent(file.getInputStream());
        fileMetadata.setOriginalContentFilename(file.getOriginalFilename());
        fileMetadata.setContentId(contentId);

        fileMetadataRepository.save(fileMetadata);
    }

    private FileMetadata loadAndSync(FileMetadataDTO fileMetadataDTO) {
        final FileMetadata fileMetadata = load(fileMetadataDTO);

        fileMetadataDTO.syncTo(fileMetadata);

        return fileMetadata;
    }

    private FileMetadata load(FileMetadataDTO fileMetadataDTO) {
        if (fileMetadataDTO.isNew()) {
            return new FileMetadata();
        } else {
            return fileMetadataRepository.findById(fileMetadataDTO.getId()).orElse(new FileMetadata());
        }
    }
}
