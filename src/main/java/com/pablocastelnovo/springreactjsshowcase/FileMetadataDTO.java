package com.pablocastelnovo.springreactjsshowcase;

import java.io.Serializable;

import lombok.Data;

@Data
public class FileMetadataDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String title;
	private String description;

	public static FileMetadataDTO of(FileMetadata entity) {
		final FileMetadataDTO dto = new FileMetadataDTO();

		dto.setId(entity.getId());
		dto.setTitle(entity.getTitle());
		dto.setDescription(entity.getDescription());

		return dto;
	}
}
