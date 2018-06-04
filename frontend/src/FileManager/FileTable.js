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
    id,
    title,
    description,
    createdAt,
    contentUri
}) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{withTooltip({content: description, len: 60})}</td>
            <td>{createdAt}</td>
            <td>{contentUri && (<a target="_blank" href={contentUri}>download</a>)}</td>
        </tr>
    )
};

const renderRows = files => Array.from(files).map((f, idx) => {
    return <TableRow key={idx} {...f} createdAt={new Date(f.createdAt).toLocaleDateString()} />;
});

const FileTable = ({files}) => (
    <div>
        <Table bordered>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Creation date</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>{renderRows(files)}</tbody>
        </Table>
    </div>
);

FileTable.defaultProps = {
    files: staticSeeds
};

export default FileTable;
