import React from 'react';
import FileManagerView from './FileManagerView';

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

    render() {
        return (<FileManagerView files={this.state.files} />);
    }
}
