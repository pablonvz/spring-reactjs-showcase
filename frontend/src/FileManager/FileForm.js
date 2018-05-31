import React from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Col
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
        return (
            <Form horizontal>
                {formGroup({ label: "testing" })}
                {formGroup({ label: "Description", componentClass: "textarea" })}
                {formGroup({ label: "File", type: "file" })}
            </Form>
        );
    }
}

export default FileForm;
