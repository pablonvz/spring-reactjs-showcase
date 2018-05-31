import React from 'react';
import { Grid, Navbar } from 'react-bootstrap';

import './FileManager.css'
import FileTable from './FileTable';
import FileForm from './FileForm';

export default class FileManager extends React.Component {
    render() {
        return (
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

                <FileForm />
                <FileTable />
            </div>
        );
    }
}
