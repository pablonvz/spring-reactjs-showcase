package com.pablocastelnovo.springreactjsshowcase;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class FileMetadata implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String title;

	private String description;

	private String pathname;

	public FileMetadata(final Long id, final String title, final String description, final String pathname) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.pathname = pathname;
	}

	public FileMetadata(final String title, final String description, final String pathname) {
		this.title = title;
		this.description = description;
		this.pathname = pathname;
	}
}