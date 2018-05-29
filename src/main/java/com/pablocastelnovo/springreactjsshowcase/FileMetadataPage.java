package com.pablocastelnovo.springreactjsshowcase;

import java.util.List;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class FileMetadataPage extends PageImpl<FileMetadataDTO> {
	private static final long serialVersionUID = 1L;

	public FileMetadataPage(List<FileMetadataDTO> content, Pageable pageable, long total) {
		super(content, pageable, total);
	}

	public FileMetadataPage(List<FileMetadataDTO> content) {
		super(content);
	}
}
