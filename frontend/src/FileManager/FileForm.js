import React from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Col,
    Button
} from 'react-bootstrap';

import FileRecord from '../FileRecord';

const FileFormGroup = ({label, formControl, help, ...props}) => (
    <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
            <ControlLabel>{label}</ControlLabel>
        </Col>
        <Col sm={10}>
            {formControl || <FormControl {...props} />}
            {help && <HelpBlock>{help}</HelpBlock>}
        </Col>
    </FormGroup>
);

class FileForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRecord: new FileRecord()
        }
    }

    render() {
        const onSubmit = ev => {
            ev.preventDefault();

            this.props.onSubmit(this.state.currentRecord);
        };

        const updateRecord = (fieldName, valueOf = event => event.target.value) => {
            return event => {
                const oldValues = this.state.currentRecord;
                const fieldValue = valueOf(event);

                this.setState({
                    currentRecord: {...oldValues, [fieldName]: fieldValue }
                });
            };
        };

        const updateTitle = updateRecord('title');
        const updateDescription = updateRecord('description');
        const updateFile = updateRecord('file', event => event.target.files[0]);
        const { title, description } = this.state.currentRecord;

        return (
            <Form horizontal>
                <FileFormGroup label="Title"
                    value={title}
                    onChange={updateTitle} />

                <FileFormGroup label="Description"
                    value={description}
                    onChange={updateDescription}
                    type="text" />

                <FileFormGroup label="File"
                    onChange={updateFile}
                    type="file" />

                <Col className="text-center">
                    <Button type="submit" onClick={onSubmit} bsStyle="success">Create</Button>
                </Col>
            </Form>
        );
    }
}

FileForm.defaultProps = {
    onSubmit: ev => {
        ev.preventDefault();
        console.error("default implementation of FileForm.onSubmit");
    }
}

export default FileForm;
