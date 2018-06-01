import React from 'react';
import { Grid, Navbar } from 'react-bootstrap';
import PaginationBar from '../common/components/Pagination';

import './FileManager.css'
import FileTable from './FileTable';
import FileForm from './FileForm';

const FileManagerView = ({
    files,
    onCreate: create,
    // PaginationBar's props
    currentPage,
    totalPages,
    onPageChange
}) => (
    <div className="FileManager">
        <Navbar>
            <Grid>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="/">File Manager</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
            </Grid>
        </Navbar>

        <FileForm onSubmit={create} />
        <br />
        <FileTable files={files} />
        <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange} />
    </div>
);

export default FileManagerView;
