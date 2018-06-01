import React from 'react';
import { Grid, Navbar } from 'react-bootstrap';

import './FileManager.css'
import FileTable from './FileTable';
import FileForm from './FileForm';

const FileManagerView = ({files, onCreate: create}) => (
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
    </div>
);

export default FileManagerView;
