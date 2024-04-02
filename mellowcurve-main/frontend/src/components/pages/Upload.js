import {React, Component} from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import DragDrop from '../elements/DragDrop/DragDrop'

import 'bootstrap/scss/bootstrap.scss'
import './Upload.scss'

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sampleName: '',
            selectedFile: null,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ sampleName: event.target.value });
    }
    
    handleFileChange(fileOrFiles) {
        this.setState({ selectedFile: fileOrFiles[0] });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', this.state.sampleName);
        formData.append('file', this.state.selectedFile);

        // Create audio element to get duration
        const audio = document.createElement('audio');
        audio.src = URL.createObjectURL(this.state.selectedFile);
        const audioDurationLimit = 30;

        try {
          const response = await fetch('http://localhost:8000/add-sample/', {
            method: 'POST',
            credentials: 'include',
            body: formData,
          });
          const data = await response.json(); 
          if (audio.duration > audioDurationLimit) {
            throw new Error('Audio file must be 30 seconds or less');
          }
          if (response.ok && data.success) {
            console.log('sample uploaded successfully:', data.sample);
            window.location.href = "/home";
          } else {
            throw new Error('Network response was not ok.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert(error.message);
        }
    }

    componentDidMount () {      
     }

    render() {
        return (
      <Container className='upload-container'>
        <Row className='justify-content-center'>
          <Col md={6} className='form-container'>
            <h3 className='text-center mb-4'>Upload Sample</h3>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId='sampleName'>
                <Form.Control
                  type='text'
                  placeholder='Enter sample name'
                  value={this.state.sampleName}
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <br></br>
              <Form.Group controlId='fileUpload'>
                <DragDrop onFileChange={this.handleFileChange} />
              </Form.Group>
              <br></br>
              <Button variant='primary' type='submit'>
                Upload Sample
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
    }

}

export default Upload;
