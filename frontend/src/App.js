import React from 'react';
import FileManager from './FileManager'

const basePath = 'http://127.0.0.1:8080/api/files/';

const App = () => (
    <div className="container">
        <FileManager basePath={basePath} />
    </div>
);

export default App;
