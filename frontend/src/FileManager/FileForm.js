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
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

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
                const fieldValue = valueOf(event);

                this.setState((prevState, props) => {
                    const record = prevState.currentRecord;

                    record[fieldName] = fieldValue;

                    return { currentRecord: record };
                })
            };
        };

        const updateTitle = updateRecord('title');
        const updateDescription = updateRecord('description');
        const updateFile = updateRecord('file', event => event.target.files[0]);
        const updateCreatedAt = updateRecord('createdAt', createdAt => createdAt);
        const { title, description, createdAt } = this.state.currentRecord;

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

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        <ControlLabel>Creation date</ControlLabel>
                    </Col>
                    <Col sm={10} className="text-left">
                        <DatePicker
                            onChange={updateCreatedAt}
                            selected={createdAt}
                            className="form-control" />
                    </Col>
                </FormGroup>

                <Col className="text-right">
                    <Button type="submit" onClick={onSubmit} bsStyle="primary">Save</Button>
                </Col>
            </Form>
        );
    }
}

export default FileForm;
