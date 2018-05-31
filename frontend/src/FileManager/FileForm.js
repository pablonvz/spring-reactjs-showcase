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


const formGroup = ({label, formControl, help, ...props}) => (
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
    render() {
        const { onSubmit } = this.props;
        return (
            <Form horizontal>
                {formGroup({ label: "Title" })}
                {formGroup({ label: "Description", componentClass: "textarea" })}
                {formGroup({ label: "File", type: "file" })}
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
