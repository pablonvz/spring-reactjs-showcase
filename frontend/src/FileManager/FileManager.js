import React from 'react';
import FileManagerView from './FileManagerView';
import FileRecord from '../FileRecord';

export default class FileManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: []
        };
    }

    componentDidMount() {
        const updateState = page => {
            this.setState({
                files: page.content
            });
        };

        fetch('http://127.0.0.1:8080/api/files')
            .then(response => response.json())
            .then(updateState)
            .catch(console.err);
    }

    createFileMetadata = details => {
        const data = FileRecord.from(details).asDataForm();

        fetch('http://127.0.0.1:8080/api/files', {
            method: 'POST',
            body: data,
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
            }})
        .then(response => response.json())
        .then(console.log);
    }

    render() {
        return (<FileManagerView files={this.state.files} onCreate={this.createFileMetadata} />);
    }
}
