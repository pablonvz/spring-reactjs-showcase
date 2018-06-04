import React from 'react';
import FileManagerView from './FileManagerView';
import FileRecord from '../FileRecord';

export default class FileManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: [],
            currentPage: 0,
            totalPages: 1
        };
    }

    fetchFiles(pageNumber = 0) {
        const addContentUri = fileRecord => {
            fileRecord.contentUri = this.props.basePath + fileRecord.id + '/download';

            return fileRecord;
        };

        const updateState = page => {
            this.setState({
                files: Array.from(page.content).map(addContentUri),
                currentPage: page.number,
                totalPages: page.totalPages
            });
        };

        const url = new URL(this.props.basePath);
        url.searchParams.append('page', pageNumber);

        return fetch(url)
            .then(response => response.json())
            .then(updateState)
            .catch(console.err);
    }

    componentDidMount() {
        this.fetchFiles(this.state.currentPage);
    }

    createFileMetadata = details => {
        const data = FileRecord.from(details).asDataForm();

        fetch(this.props.basePath, {
            method: 'POST',
            body: data,
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
            }})
        .then(response => response.json())
        .then(() => this.fetchFiles(this.state.currentPage));
    }

    render() {
        return (
            <FileManagerView
                onCreate={this.createFileMetadata}
                onPageChange={pageNumber => this.fetchFiles(pageNumber - 1)}
                {...this.state}
                currentPage={this.state.currentPage + 1} />); // the child components start counting the pages with 1
    }
}
