import React from 'react';
import FileManagerView from './FileManagerView';
import FileRecord from '../FileRecord';

const throwIfResponseIsNotOK = response => {
    if (response.ok)
        return response;

    throw Error(response);
};

class FileManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: [],
            currentPage: 0,
            totalPages: 1,
            alertName: undefined
        };
    }

    onCreateSuccess = () => this.setState({
        alertName: 'createFileSuccess'
    });

    onCreateError = () => this.setState({
       alertName: 'createFileFailed'
    });

    fetchCurrentPage = () => {
        return this.fetchFiles(this.state.currentPage);
    };

    onFetchFilesError = ex => {
        console.error(ex);

        this.setState({
            alertName: 'fetchFilesFailed'
        });
    }

    fetchFiles = (pageNumber = 0) => {
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

        const { onFetchFilesError } = this;

        const url = new URL(this.props.basePath);
        url.searchParams.append('page', pageNumber);

        return fetch(url)
            .then(throwIfResponseIsNotOK)
            .then(response => response.json())
            .then(updateState)
            .catch(onFetchFilesError);
    }

    createFileMetadata = details => {
        const data = FileRecord.from(details).asDataForm();

        const {
            onCreateSuccess,
            fetchCurrentPage,
            onCreateError
        } = this;

        fetch(this.props.basePath, {
            method: 'POST',
            body: data,
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
            }})
        .then(throwIfResponseIsNotOK)
        .then(response => response.json())
        .then(onCreateSuccess)
        .then(fetchCurrentPage)
        .catch(onCreateError);
    }

    componentDidMount() {
        this.fetchFiles(this.state.currentPage);
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

export default FileManager;
