import React from 'react';
import {
    Grid,
    Navbar,
    Panel
} from 'react-bootstrap';
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

        <h2>Existing files <small>seed data don't have a real file linked</small></h2>
        <FileTable files={files} />
        <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange} />

        <div class="row">
            <div class="col-sm-10 col-sm-offset-1">
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Upload a new file</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body><FileForm onSubmit={create} /></Panel.Body>
                </Panel>
            </div>
        </div>
    </div>
);

export default FileManagerView;
