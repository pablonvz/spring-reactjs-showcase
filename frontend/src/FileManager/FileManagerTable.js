import React from 'react';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import staticSeeds from './staticSeeds';

const withTooltip = ({content, len}) => {
	if (!content) return;

	if (content.length <= len) return <span>{content}</span>;

	const tooltip = (<Tooltip id={content.substr(0, 15)}>{content}</Tooltip>);

	return (
		<OverlayTrigger placement="bottom" overlay={tooltip}>
			<span>{content.substr(0, len) + "..."}</span>
		</OverlayTrigger>
	);
}

const TableRow = ({
	title,
	description,
	createdAt
}) => (
	<tr>
		<td>{title}</td>
		<td>{withTooltip({content: description, len: 60})}</td>
		<td>{createdAt}</td>
	</tr>
);

const renderRows = files => Array.from(files).map((f, idx) => {
	return <TableRow key={idx} {...f} createdAt={new Date().toLocaleDateString()} />;
});

const FileManagerTable = ({files}) => (
	<div>
		<Table bordered>
			<thead>
				<tr>
					<th>Title</th>
					<th>Description</th>
					<th>Creation date</th>
				</tr>
			</thead>
			<tbody>{renderRows(files)}</tbody>
		</Table>
	</div>
);

FileManagerTable.defaultProps = {
	files: staticSeeds
};

export default FileManagerTable;
