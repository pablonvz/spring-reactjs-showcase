import React from 'react';
import {
    Grid,
    Navbar,
    Panel,
    Alert
} from 'react-bootstrap';
import PaginationBar from '../common/components/Pagination';

import './FileManager.css'
import FileTable from './FileTable';
import FileForm from './FileForm';

const createFileSuccessAlert = () => (<Alert bsStyle="success">The file has been uploaded!</Alert>);
const createFileFailedAlert = () => (<Alert bsStyle="danger">There was an error uploading the file!</Alert>);
const fetchFilesFailedAlert = () => (<Alert bsStyle="danger">There was an error loading the files from the server!</Alert>);
const showAlert = alertName => {
    if (!alertName)
        return;

    const alertByName = {
        createFileSuccess: createFileSuccessAlert,
        createFileFailed: createFileFailedAlert,
        fetchFilesFailed: fetchFilesFailedAlert
    };

    const alertFactory = alertByName[alertName];

    if (alertFactory)
        return alertFactory();
}

const FileManagerView = ({
    files,
    onCreate: create,
    // PaginationBar's props
    currentPage,
    totalPages,
    onPageChange,
    alertName
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
        {showAlert(alertName)}
        <FileTable files={files} />
        <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange} />

        <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
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
